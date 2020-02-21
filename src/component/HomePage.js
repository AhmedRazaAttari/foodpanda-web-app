import React, { Component } from "react";
import "../App.css";
import Logo from "../images/logo2.png";
import Login from "./Login";
import Signup from "./Signup";
import fire from '../Config/Firebase';
import UserDashboard from "../component/UserDashboard"
import RestDashboard from "../component/RestDashboard"

class HomePage extends Component {

    constructor() {
        super();

        this.state = {
            loginBtn: false,
            signUpBtn: false,
            redirect: false,
            alreadyLogin: {
                isUser: false,
                isRestaurant: false,
            }
        }
    }

    mainpage() {
        return <div className="App">
            <div className="App-header">
                <div id="welcomeDiv" style={{ marginTop: "-70px" }}>
                    <img src={Logo} width="120px" />
                    <br /><br />
                    <h2 className="OnlyForColor">Welcome To Food Panda App</h2>
                    <p className="OnlyForColor">Here You can order online food & delivery with your nearest restaurant</p>
                    <br />
                    <button onClick={() => this.setState({ signUpBtn: true })}>Sign Up</button><br />
                    <button onClick={() => this.setState({ loginBtn: true })}>Log In</button>
                </div>
            </div>
        </div>
    }

    componentDidMount() {
        const { isUser, isRestaurant } = this.state.alreadyLogin;
        var user = fire.auth().currentUser;
        if (user) {
            var userId = fire.auth().currentUser.uid;
            fire.database().ref("users/" + userId).once("value")
                .then(function (snapshot) {
                    if (snapshot.val()) {
                        console.log(snapshot.val())
                        console.log("this is user")
                        localStorage.setItem("role", "User")
                    }
                    else {
                        console.log("this is Restaurant");
                        localStorage.setItem("role", "Restaurant")
                    }
            });
            if (localStorage.getItem("role") === "User") {
                console.log("User is Currently sign in")
                this.setState({
                    redirect: true,
                    alreadyLogin: {
                        ...this.state.alreadyLogin,
                        isUser: true,
                    }
                })
            }
            else if (localStorage.getItem("role") === "Restaurant") {
                console.log("Restaurant is Currently sign in")
                this.setState({
                    redirect: true,
                    alreadyLogin: {
                        ...this.state.alreadyLogin,
                        isRestaurant: true,
                    }
                })

            }
        }
    }


    render() {
        const { loginBtn, signUpBtn, redirect } = this.state
        const { isUser, isRestaurant } = this.state.alreadyLogin;


        return (
            <div>
                {!loginBtn && !signUpBtn && !redirect && this.mainpage()}
                {loginBtn && <Login jbDabao={this.state} />}
                {signUpBtn && <Signup jbDabao={this.state} />}
                {isUser && redirect && <UserDashboard />}
                {isRestaurant && redirect && <RestDashboard />}
            </div>
        )
    }


}
export default HomePage;