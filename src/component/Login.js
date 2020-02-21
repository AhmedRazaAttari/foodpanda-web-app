import React, { Component } from "react";
import "../App.css";
import Signup from "./Signup";
import UserDashboard from "./UserDashboard";
import RestDashboard from "./RestDashboard";
import fire from '../Config/Firebase';

class Login extends Component {

    constructor() {
        super();

        this.state = {
            loginBtn2: true,
            signUpBtn : false,
            user: false,
            restaurant: false,
            username: "",
            password: "",
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    loginDiv() {
        return <div className="formsDiv App">
            <div className="loginDiv">
                <h1 align="center">Welcome Back</h1>
                <br />
                <br />
                <h3 align="center" style={{ fontFamily: "arial", color: "white" }}>Login to your account</h3>
                <br />
                <br />
                <br />
                <input type="email" placeholder="username" name="username" onChange={this.handleChange} />
                <br />
                <input type="password" placeholder="password" name="password" onChange={this.handleChange} />
                <br />
                <span>&nbsp;&nbsp;Remember me</span><span style={{ float: "right" }}><a href="#" style={{ color: "red", textDecoration: "none" }}>Forgot password?</a>&nbsp;&nbsp;</span>
                <br />
                <br />
                <input type="submit" value="Log in" style={{ height: "45px", background: "red", border: "none", fontSize: "18px", fontWeight: "bold", color: "white" }} onClick={this.login} />
                <p align="center">New user? <a href="#" style={{ color: "red", textDecoration: "none" }} onClick={() => this.setState({ signUpBtn: true, loginBtn2: false })}>Sign up</a></p>
            </div>
        </div>
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login(e) {
        e.preventDefault();
        const { username, password } = this.state;
        fire.auth().signInWithEmailAndPassword(username, password)
            .then((u) => {
                console.log(u);
                var userId = fire.auth().currentUser.uid;
                console.log(userId)
                var userId = fire.auth().currentUser.uid;
                fire.database().ref("users/" + userId).once("value")
                    .then(function (snapshot) {
                        if (snapshot.exists()) {
                            console.log(snapshot.val())
                            console.log("this is user")
                            localStorage.setItem("role", "User")
                        }
                    });
                fire.database().ref("Restaurant/" + userId).once("value")
                .then(function (childSnapshot){
                    if(childSnapshot.exists()){
                        console.log("this is Restaurant");
                        localStorage.setItem("role", "Restaurant")
                    }
                })
                // Here editing PLz
                if (localStorage.getItem("role") === "User") {
                    this.setState({
                        redirect: true,
                        alreadyLogin: {
                            ...this.state.alreadyLogin,
                            isUser: true,
                        }
                    })
                }
                else if (localStorage.getItem("role") === "Restaurant") {
                    this.setState({
                        redirect: true,
                        alreadyLogin: {
                            ...this.state.alreadyLogin,
                            isRestaurant: true,
                        }
                    })
    
                }
            
    })
    .catch((error) => {
        console.log(error);
        alert("email & password Doesn't Match");
    });

    }

    render() {
        const { loginBtn } = this.props.jbDabao;
        const { loginBtn2, user, restaurant, signUpBtn } = this.state
        return (
            <div>
                {loginBtn2 && !user && loginBtn && this.loginDiv()}
                {signUpBtn && <Signup jbDabao={this.state}/>}
                {user && <UserDashboard />}
                {restaurant && <RestDashboard />}
            </div >
        )
    }


}
export default Login;