import React, { Component } from "react";
import "../App.css";
import $ from 'jquery';
import Login from "./Login";
import fire from '../Config/Firebase';
import UserDashboard from "../component/UserDashboard";
import RestDashboard from "../component/RestDashboard";
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from "@fortawesome/fontawesome-free-solid";


class Signup extends Component {

    constructor() {
        super();

        this.state = {
            show: false,
            SelectedState: "",
            SelectedCity: "",
            loginBtn: false,
            HaveAcc: false,
            userForm: true,
            restaurantForm: false,
            signUpform: true,
            user: {
                fullname: "",
                email: "",
                State: "",
                gender: "",
                City: "",
                age: "",
                password: "",
                Conf_password: "",
            },
            restaurant: {
                Restname: "",
                RestEmail: "",
                State: "",
                City: "",
                CertificateURL: "",
                RestPassword: "",
                RestConf_password: "",
            },
            Succesfull: false,
        }
        this.signup = this.signup.bind(this);
        this.UserhandleChange = this.UserhandleChange.bind(this);
        this.ResthandleChange = this.ResthandleChange.bind(this);
        this.handleSelectState = this.handleSelectState.bind(this);
        this.handleSelectCity = this.handleSelectCity.bind(this);
    }


    UserSignup() {
        return <div className="formsDiv App">
            <div className="signupDiv">
                <ul>
                    <li className="firstNav"><a href="#" onClick={() => this.setState({ restaurantForm: false, userForm: true })}>User</a></li>
                    <li className="secondNav"><a href="#" onClick={() => this.setState({ restaurantForm: true, userForm: false })}>Restaurant</a></li>
                </ul>
                <br />
                <h3 align="center" style={{ fontFamily: "arial", color: "white" }}>Create a new account</h3>
                <br />
                <input type="name" placeholder="Full name" name="fullname" id="fullname" onChange={this.UserhandleChange} />
                <span className="inlineValidation" id="fullnameTxt" style={{ display: "none" }}>Please Write</span>
                <br />
                <input type="email" placeholder="Email" name="email" id="Useremail" onChange={this.UserhandleChange} />
                <span className="inlineValidation" id="emailTxt" style={{ display: "none" }}>Please Write</span>
                <br />
                <select id="State" value={this.state.SelectedState} onChange={this.handleSelectState}>
                    <option value="select">Select State</option>
                    <option value="Sindh" >Sindh</option>
                    <option value="Punjab" >Punjab</option>
                    <option value="Balochistan" >Balochistan</option>
                    <option value="Khyber-Pakhtun-Khwa" >Khyber-Pakhtun-Khwa</option>
                </select>

                {/* if Sindh is selected so show cities in sindh */}
                <select id="sindhCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Sukkar">Sukkar</option>
                </select>

                {/* if Punjab is selected so show cities in Punjab */}
                <select id="punjabCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Multan">Multan</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faislabad">Faislabad</option>
                    <option value="MirpurKhas">MirpurKhas</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                </select>

                {/* if Balochistan is selected so show cities in Balochistan */}
                <select id="balochistanCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Turbat">Turbat</option>
                    <option value="Hub">Hub</option>
                    <option value="Gwadar">Gwadar</option>
                </select>

                {/* if Khyber-Pakhtun-Khwa is selected so show cities in Khyber-Pakhtun-Khwa */}
                <select id="KhyberCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Mansehra">Mansehra</option>
                    <option value="Abbottabad">Abbottabad</option>
                </select>
                <br />
                &nbsp;&nbsp;&nbsp;<b style={{ fontSize: "14px", fontWeight: "lighter", float: "left" }}>Gender :</b> <br />
                <label>
                    <input name="gender" type="radio" value="Male" />
                    <span>Male</span>
                </label>
                <label>
                    <input name="gender" type="radio" value="Female" />
                    <span>Female</span>
                </label>
                <br />
                &nbsp;&nbsp;&nbsp;<b style={{ fontSize: "14px", fontWeight: "lighter", float: "left" }}>Age :</b> <br />
                <input type="date" placeholder="Age" name="age" onChange={this.UserhandleChange} /><br />
                <input type="password" placeholder="Password" name="password" onChange={this.UserhandleChange} />
                <span className="inlineValidation" id="password" style={{ display: "none" }}>Please Write</span>
                <br />
                <input type="password" placeholder="Confirm Password" name="Conf_password" onChange={this.UserhandleChange} />
                <span className="inlineValidation" id="Conf_password" style={{ display: "none" }}>Please Write</span>
                <br />
                <br />
                <input type="submit" value="Sign Up" style={{ height: "45px", background: "red", border: "none", fontSize: "18px", fontWeight: "bold", color: "white" }} onClick={this.signup} />
                <p><a onClick={() => this.setState({ HaveAcc : true, userForm: false, loginBtn: true })}>Already Have an account</a></p>
            </div>
        </div>
    }


    RestaurantSignup() {
        return <div className="formsDiv App">
            <div className="signupDiv">
                <ul>
                    <li className="firstNav"><a href="#" onClick={() => this.setState({ restaurantForm: false, userForm: true })}>User</a></li>
                    <li className="secondNav"><a href="#" onClick={() => this.setState({ restaurantForm: true, userForm: false })}>Restaurant</a></li>
                </ul>
                <br />
                <h3 align="center" style={{ fontFamily: "arial", color: "white" }}>Partner With us</h3>
                <br />
                <input type="name" placeholder="Restaurant Name" name="Restname" id="Restname" onChange={this.ResthandleChange} />
                <br />
                <input type="email" placeholder="Email" name="RestEmail" id="RestEmail" onChange={this.ResthandleChange} />
                <select id="State" value={this.state.SelectedState} onChange={this.handleSelectState}>
                    <option value="select">Select State</option>
                    <option value="Sindh">Sindh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Balochistan">Balochistan</option>
                    <option value="Khyber-Pakhtun-Khwa">Khyber-Pakhtun-Khwa</option>
                </select>

                {/* if Sindh is selected so show cities in sindh */}
                <select id="sindhCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Sukkar">Sukkar</option>
                </select>

                {/* if Punjab is selected so show cities in Punjab */}
                <select id="punjabCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Multan">Multan</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faislabad">Faislabad</option>
                    <option value="MirpurKhas">MirpurKhas</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                </select>

                {/* if Balochistan is selected so show cities in Balochistan */}
                <select id="balochistanCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Turbat">Turbat</option>
                    <option value="Hub">Hub</option>
                    <option value="Gwadar">Gwadar</option>
                </select>

                {/* if Khyber-Pakhtun-Khwa is selected so show cities in Khyber-Pakhtun-Khwa */}
                <select id="KhyberCity" value={this.state.SelectedCity} onChange={this.handleSelectCity} style={{ display: "none" }}>
                    <option value="select">Select City</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Mardan">Mardan</option>
                    <option value="Mansehra">Mansehra</option>
                    <option value="Abbottabad">Abbottabad</option>
                </select>
                
                <br />
                Attach Certificate<br />
                <input type="file" id="Certificate" /><br />

                Rest Image<br />
                <input type="file" id="Rest_Pic1" /><br />

                <input type="password" placeholder="Password" name="RestPassword" onChange={this.ResthandleChange} />
                <br />
                <input type="password" placeholder="Confirm Password" name="RestConf_password" onChange={this.ResthandleChange} /><br />

                <input type="submit" value="Sign Up" style={{ height: "45px", background: "red", border: "none", fontSize: "18px", fontWeight: "bold", color: "white" }} onClick={this.signup} />
                <p><a onClick={() => this.setState({ HaveAcc : true, restaurantForm: false, loginBtn: true })}>Already Have an account</a></p>
            </div>
        </div>
    }

    UserhandleChange(e) {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }
    ResthandleChange(e) {
        this.setState({
            restaurant: {
                ...this.state.restaurant,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSelectState(event) {
        this.setState({ SelectedState: event.target.value });
    }

    handleSelectCity(event) {
        this.setState({ SelectedCity: event.target.value });
    }


    trying() {
        const { SelectedState } = this.state;

        if (SelectedState === "Sindh") {
            console.log("you select sindh");
            document.getElementById("sindhCity").style.display = "";
            document.getElementById("punjabCity").style.display = "none";
            document.getElementById("balochistanCity").style.display = "none";
            document.getElementById("KhyberCity").style.display = "none";
        }
        else if (SelectedState === "Punjab") {
            console.log("you select punjab");
            document.getElementById("sindhCity").style.display = "none";
            document.getElementById("punjabCity").style.display = "";
            document.getElementById("balochistanCity").style.display = "none";
            document.getElementById("KhyberCity").style.display = "none";
        }
        else if (SelectedState === "Balochistan") {
            console.log("you select Balochistan");
            document.getElementById("sindhCity").style.display = "none";
            document.getElementById("punjabCity").style.display = "none";
            document.getElementById("balochistanCity").style.display = "";
            document.getElementById("KhyberCity").style.display = "none";
        }
        else if (SelectedState === "Khyber-Pakhtun-Khwa") {
            console.log("you select Khyber-Pakhtun-Khwa");
            document.getElementById("sindhCity").style.display = "none";
            document.getElementById("punjabCity").style.display = "none";
            document.getElementById("balochistanCity").style.display = "none";
            document.getElementById("KhyberCity").style.display = "";
        }

    }


    signup(e) {
        e.preventDefault();
        this.setState({ show: true })
        const { fullname, email, password, Conf_password, age } = this.state.user;
        const { Restname, RestEmail, RestPhone_Num, RestPassword, RestConf_password } = this.state.restaurant;
        const { userForm, restaurantForm, SelectedState, SelectedCity } = this.state;

        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (fullname !== "", email !== "", password !== "", Conf_password !== "" && age !== "" || Restname !== "" && RestEmail !== "" && document.getElementById("Certificate").value !== ""  && document.getElementById("Rest_Pic1").value !== "" && RestPassword !== "" && RestConf_password !== "") {
            if (restaurantForm) {
                fire.database().ref("Restaurant").once('value', function (snapshot) {
                    if (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            var childKey = childSnapshot.key;
                            var childData = childSnapshot.val();
                            console.log(childKey);

                            if (Restname.toLowerCase() === childData.name.toLowerCase()) {
                                alert("this name is already is in use");
                                return false
                            }
                            else {
                            }
                        })
                    }
                })
            }
            if (reg.test(email) || reg.test(RestEmail)) {
                if (password.length >= 8 || RestPassword.length >= 8) {
                    if (userForm) {
                        if (password === Conf_password) {

                        }
                        else {
                            alert("conf password should be match to password");
                            return false;

                        }
                    }
                    else if (restaurantForm) {
                        if (RestPassword === RestConf_password) {

                        }
                        else {
                            alert("conf password should be match to password");
                            return false;

                        }
                    }
                }
                else {
                    alert("Password Should be 8 characters Long");
                    return false;
                }
            }
            else {
                alert("please enter correct email");
                return false;
            }
        }
        else {
            alert("Please fill all field first");
            return false;
        }

        if (SelectedState !== "select") {
            this.setState({
                State: SelectedState,
            })
        }
        else {
            alert("please select Make")
            return false;
        }


        if (SelectedCity !== "select") {
            if (userForm) {
                this.setState({
                    user: {
                        ...this.state.user,
                        City: SelectedCity,
                    }
                });
            }
            else if (restaurantForm) {
                this.setState({
                    restaurant: {
                        ...this.state.restaurant,
                        City: SelectedCity,
                    }
                });
            }
        }
        else {
            alert("please select City")
            return false;
        }


        if (userForm) {
            var gendered = document.getElementsByName("gender");
            if (gendered[0].checked) {
                var genderType = "Male";
            }
            else if (gendered[1].checked) {
                var genderType = "Female";
            }
            if (genderType == undefined) {
                alert("please Select Gender")
                return false
            }
            else {
                this.setState({
                    user: {
                        ...this.state.user,
                        gender: genderType,
                    }
                });
            }
        }


        if (userForm) {
            fire.auth().createUserWithEmailAndPassword(email, password)
                .then((u) => {
                    console.log(u);
                    var userId = fire.auth().currentUser.uid;

                    fire.database().ref('users/' + userId).set({
                        name: fullname,
                        email: email,
                        State: SelectedState,
                        City: SelectedCity,
                        gender: genderType,
                        password: password,
                    })
                    this.setState({
                        signUpform: false,
                        Succesfull: true
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        else if (restaurantForm) {
            fire.auth().createUserWithEmailAndPassword(RestEmail, RestPassword)
                .then((u) => {
                    console.log(u);
                    var userId = fire.auth().currentUser.uid;

                    fire.database().ref('Restaurant/' + userId).set({
                        name: Restname,
                        email: RestEmail,
                        State: SelectedState,
                        City: SelectedCity,
                        password: RestPassword,
                    })
                    var Certificate = document.getElementById("Certificate")
                    var file = Certificate.files[0];
                    var storageRef = fire.storage().ref('images/');
                    var fileUpload = storageRef.child("RestaurantImages/" + file.name);
                    fileUpload.put(file)
                        .then(function (snapshot) {
                            console.log(snapshot)
                            console.log('Uploaded file!');
                        }).then(() => {
                            fileUpload.getDownloadURL().then(function (url) {
                                fire.database().ref('Restaurant/' + userId).update({
                                    Rest_Certificate : url,
                                })
                            })
                        })
                    
                        var Rest_Pic1 = document.getElementById("Rest_Pic1")
                        var file = Rest_Pic1.files[0];
                        var storageRef = fire.storage().ref('images/');
                        var fileUpload = storageRef.child("RestaurantImages/" + file.name);
                        fileUpload.put(file)
                            .then(function (snapshot) {
                                console.log(snapshot)
                                console.log('Uploaded file!');
                            }).then(() => {
                                fileUpload.getDownloadURL().then(function (url) {
                                    fire.database().ref('Restaurant/' + userId).update({
                                        MainPic : url,
                                    })
                                })
                        })

                    this.setState({
                        signUpform: false,
                        Succesfull: true
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    
        this.setState({ show: false })

    }



    render() {

        console.log(this.state)
        const { signUpBtn } = this.props.jbDabao;
        const { Succesfull, HaveAcc, userForm, restaurantForm, signUpform, SelectedState, show } = this.state;
        return (
            <div>
                {signUpBtn && userForm && signUpform && this.UserSignup()}
                {signUpBtn && restaurantForm && signUpform && this.RestaurantSignup()}
                {HaveAcc && <Login jbDabao={this.state} />}
                {Succesfull && userForm && <UserDashboard />}
                {Succesfull && restaurantForm && <RestDashboard />}
                {SelectedState && this.trying()}
                {show && <Loading show={true} color="red" />}
            </div>
        )
    }

}

export default Signup;