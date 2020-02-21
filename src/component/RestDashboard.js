import React, { Component } from "react";
import "../css/RestDashboard.css";
import $ from 'jquery';
import Login from "../component/Login";
import fire from '../Config/Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faSearch, faHeart, faCartPlus, faAlignLeft, faCut, faSlidersH, faTrashAlt, faCheckCircle } from '@fortawesome/fontawesome-free-solid';
// import RestaurantList from "../component/Tabs/RestaurantList";
// import MyOrder from "../component/Tabs/MyOrder";

class RestDashboard extends Component {

    constructor() {
        super();

        this.state = {
            user: true,
            loginBtn: true,
            showNav: false,
            Dashboard: true,
            ShowPending: false,
            ShowProgress: false,
            ShowDelivered: false,
            EditProfile: false,
            AddItems: false,
            filter: false,
            OrderRejected : false,
            OrderAccepted : false,
            OrderBy : "",
        }
        this.logout = this.logout.bind(this);
        this.UpdateProfile = this.UpdateProfile.bind(this);
    }

    header() {
        return <div className="header">
            <a href="#"><FontAwesomeIcon icon={faAlignLeft} onClick={() => this.setState({ showNav: true, ShowDelivered: false, ShowPending: false, ShowProgress: false, EditProfile: false, AddItems: false, Dashboard: false, })} /></a>
            <b style={{ color: "white" }}>Foodpanda</b>
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faSlidersH} onClick={() => this.setState({ filter: true, showNav: false, AddItems: false, Dashboard: false, ShowDelivered: false, ShowPending: false, ShowProgress: false, EditProfile: false, })} />
        </div>
    }

    navbar() {
        return <div className="Navbar">
            <br /><br />
            <h2>Foodpanda</h2>
            <br /><br /><br />
            <ul style={{ float: "left" }}>
                <li><a href="#" onClick={() => this.setState({ showNav: false, Dashboard: true, AddItems: false, EditProfile: false, ShowDelivered: false, ShowPending: false, ShowProgress: false, })}>Dashboard</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowPending: true, Dashboard: false, AddItems: false, ShowDelivered: false, ShowProgress: false, EditProfile: false, })}>Pending</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowProgress: true, })}>Progress</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowDelivered: true, })}>Delivered</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, Dashboard: false, AddItems: false, ShowDelivered: false, ShowPending: false, ShowProgress: false, EditProfile: true, })}>Edit Profile</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, AddItems: true, Dashboard: false, ShowDelivered: false, ShowPending: false, ShowProgress: false, EditProfile: false, })}>Add Items & Category</a></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
        </div>
    }

    filter() {
        return <div style={{ padding: "15px" }}>
            <b className="OnlyForColor">Filter by Category</b><br /><br />
            <div id="FoodCategoryChkbox">
                <label>
                    <input name="FoodCategory" type="checkbox" value="Chinese" />
                    <span>Chinese</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Italian" />
                    <span>Italian</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Pizza" />
                    <span>Pizza</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="BBQ" />
                    <span>BBQ</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Salad" />
                    <span>Salad</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Drinks" />
                    <span>Drinks</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Sandwiches" />
                    <span>Sandwiches</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Fast Food" />
                    <span>Fast Food</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Biverages" />
                    <span>Biverages</span>
                </label>
            </div>
            <br /><br /><br />
            <button onClick={this.filterResult}>Filter</button>
        </div>
    }

    filterResult() {
        var allVals = [];
        var checkboxObj = {}
        $('#FoodCategoryChkbox :checked').each(function () {
            allVals.push($(this).val());
            checkboxObj = { ...allVals }
        });

        fire.database().ref("Restaurant").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                // // console.log(childSnapshot.val())
                // childSnapshot.child("FoodCategory").forEach(function(AnotherSnapshot){
                //     // console.log(AnotherSnapshot.val())
                for (var a = 0; a < childSnapshot.val().length; a++) {

                    for (var j = 0; j < allVals.length; j++) {
                        // console.log(i);
                        // console.log(j);
                        // if(i === j){
                        //     // console.log(childSnapshot.key)
                        //     var filterarr = [];
                        //     filterarr = allVals.filter(element => AnotherSnapshot.val().includes(element))
                        //     console.log(filterarr)
                        //     // console.log(AnotherSnapshot.val());
                        // console.log(allVals[i]);
                        // }
                        // else{
                        //     console.log("no")
                        // }
                        console.log(childSnapshot.val())
                    }
                }
            })
            // })
        })

    }

    Dashboard() {
        return <div id="Restaurant_Info">
            <h3 align="center" className="OnlyForColor">Your Restaurant Info</h3>
            <br /><br /><br />
            <b className="OnlyForColor">Your Restaurant Name</b>: <br /> <input id="RestName" className="OnlyForColor" disabled="disabled" /><br /><br />
            <b className="OnlyForColor">Your Restaurant Email</b>: <br /> <input id="RestEmail" className="OnlyForColor" disabled="disabled" />
            <br /><br />
            <p className="OnlyForColor">Restaurant Pics</p>
            <div id="RestImages">
            </div>
            <br /><br />
            <b className="OnlyForColor">Food Categories</b><div id="FoodCategory"></div>
            <br /><br />
            <b className="OnlyForColor">Food Items</b><div id="FoodItems" className="Top_restaurant"></div>
            <br /><br /><br />
            </div>
    }

    DynamicDataOnDashboard() {
        var userId = fire.auth().currentUser.uid;
        console.log(userId)

        // For Restaurant Name and Email dynamically
        fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {
            console.log(snapshot.val())

            document.getElementById("RestName").value = snapshot.val().name;
            document.getElementById("RestEmail").value = snapshot.val().email;
        })

        // For Restaurant Images Add Dynamically
        fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {
            console.log(snapshot.val())
            var RestImagesDiv = document.getElementById("RestImages");
            var img1 = document.createElement("img");
            img1.src = snapshot.val().Rest_Pic1;
            img1.style.width = "150px";
            img1.style.margin = "5px";
            img1.style.borderRadius = "10px";
            var img2 = document.createElement("img");
            img2.src = snapshot.val().Rest_Pic2;
            img2.style.width = "150px";
            img2.style.margin = "5px";
            img2.style.borderRadius = "10px";
            var img3 = document.createElement("img");
            img3.src = snapshot.val().Rest_Pic3;
            img3.style.width = "150px";
            img2.style.margin = "5px";
            img3.style.borderRadius = "10px";

            RestImagesDiv.appendChild(img1);
            RestImagesDiv.appendChild(img2);
            RestImagesDiv.appendChild(img3);

        })


        // For Food Category add dynamically
        fire.database().ref("Restaurant/" + userId).child("FoodCategory").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {

                    for (var i = 0; i < snapshot.val().FoodCategory.length; i++) {
                        var mainDiv = document.getElementById("FoodCategory");
                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.setAttribute("type", "checkbox");
                        var span = document.createElement("span");
                        input.setAttribute("disabled", "disabled")

                        span.innerHTML = snapshot.val().FoodCategory[i];
                        mainDiv.appendChild(label);
                        label.appendChild(input);
                        label.appendChild(span);
                    }

                })
            }
            else {
                var mainDiv = document.getElementById("FoodCategory");
                var p = document.createElement("p");
                p.innerHTML = "No Data Found";
                p.setAttribute("class", "OnlyForColor")

                mainDiv.appendChild(p)
            }
        })


        // For Food Item div add dynamically
        fire.database().ref("Restaurant/" + userId).child("FoodItem").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + userId).child("FoodItem").once("value").then(function (snapshot) {
                    console.log(snapshot.val())
                    snapshot.forEach(function (childSnapshot) {
                        console.log(childSnapshot.val())

                        var FoodItemsDiv = document.getElementById("FoodItems");
                        var upperDiv = document.createElement("div");
                        upperDiv.setAttribute("class", "upperDiv");
                        var img = document.createElement("img")
                        img.src = childSnapshot.val().ItemImg;
                        img.setAttribute("class", "imageStyle");
                        var detailDiv = document.createElement("div");
                        detailDiv.setAttribute("class", "detail");
                        var detailFirstDiv = document.createElement("div");
                        var b = document.createElement("b");
                        b.setAttribute("class", "OnlyForColor")
                        b.innerHTML = "Item Name :" + childSnapshot.val().FoodItemName + "\n";
                        var p = document.createElement("p");
                        p.setAttribute("class", "OnlyForColor")
                        p.innerHTML = "Price :" + childSnapshot.val().FoodItemPrice;


                        FoodItemsDiv.appendChild(upperDiv);
                        upperDiv.appendChild(img);
                        upperDiv.appendChild(detailDiv);
                        detailDiv.appendChild(detailFirstDiv);
                        detailFirstDiv.appendChild(b);
                        detailFirstDiv.appendChild(p);
                    })
                })
            }
            else {
                var FoodItemsDiv = document.getElementById("FoodItems");
                var p = document.createElement("p");
                p.innerHTML = "No Data Found";
                p.setAttribute("class", "OnlyForColor")

                FoodItemsDiv.appendChild(p)
            }
        })

    }


    EditProfile() {
        return <div id="Restaurant_Info">
            <h3 align="center" className="OnlyForColor">Edit Your Restaurant Profile</h3>
            <br /><br />
            <b className="OnlyForColor">Your Restaurant Name</b>: <br /> <input id="RestName" className="OnlyForColor" style={{borderBottom : "1px solid black", borderRadius : "1px"}}/><br />
            <br />
            <b className="OnlyForColor">Your Restaurant Email</b>: <br /> <input id="RestEmail" className="OnlyForColor" style={{borderBottom : "1px solid black", borderRadius : "1px"}}/>
            <br /><br />
            <b className="OnlyForColor">Restaurant Pics</b>
            <br />
            <div id="RestImages"></div><br />
            <br />
            <p className="OnlyForColor">Change Pics</p>
            <input type="file" className="OnlyForColor" id="Rest_Pic1" />
            <input type="file" className="OnlyForColor" id="Rest_Pic2" />
            <input type="file" className="OnlyForColor" id="Rest_Pic3" />
            <br /><br />
            <b className="OnlyForColor">Your Food Categories</b><br />
            <div id="FoodCategory"></div>
            <br />
            <br />
            <b className="OnlyForColor">Your Food Items</b><br />
            <div id="FoodItems" className="Top_restaurant">
            <br />
            </div>
            <br />
            <button onClick={this.UpdateProfile} className="OnlyForColor" style={{width: '100%', height: '35px', border: 'none', borderRadius: '20px', background: '#f54747'}}>Save Changes</button>
            <br /><br /><br />
        </div>
    }


    DynamicDataOnEditProfile() {
        var userId = fire.auth().currentUser.uid;
        console.log(userId)

        // For Restaurant Name and Email dynamically
        fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {
            console.log(snapshot.val())

            document.getElementById("RestName").value = snapshot.val().name;
            document.getElementById("RestEmail").value = snapshot.val().email;
        })

        // For Restaurant Images Add Dynamically
        fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {
            console.log(snapshot.val())

            var RestImagesDiv = document.getElementById("RestImages");
            var img1 = document.createElement("img");
            img1.src = snapshot.val().Rest_Pic1;
            img1.style.width = "150px";
            var img2 = document.createElement("img");
            img2.src = snapshot.val().Rest_Pic2;
            img2.style.width = "150px";
            var img3 = document.createElement("img");
            img3.src = snapshot.val().Rest_Pic3;
            img3.style.width = "150px";

            RestImagesDiv.appendChild(img1)
            RestImagesDiv.appendChild(img2)
            RestImagesDiv.appendChild(img3)
        })


        // For Food Category add dynamically
        fire.database().ref("Restaurant/" + userId).child("FoodCategory").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {

                    for (var i = 0; i < snapshot.val().FoodCategory.length; i++) {
                        var mainDiv = document.getElementById("FoodCategory");
                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.setAttribute("type", "checkbox");
                        var span = document.createElement("span");
                        input.setAttribute("disabled", "disabled")

                        span.innerHTML = snapshot.val().FoodCategory[i];
                        mainDiv.appendChild(label);
                        label.appendChild(input);
                        label.appendChild(span);
                    }
                })
            }
            else {
                var mainDiv = document.getElementById("FoodCategory");
                var p = document.createElement("p");
                p.innerHTML = "No Data Found";
                p.setAttribute("class", "OnlyForColor")

                mainDiv.appendChild(p)
            }


        })

        // For Food Item div add dynamically
        fire.database().ref("Restaurant/" + userId).child("FoodItem").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + userId).child("FoodItem").once("value").then(function (snapshot) {
                    console.log(snapshot.val())
                    snapshot.forEach(function (childSnapshot) {
                        console.log(childSnapshot.val())

                        var FoodItemsDiv = document.getElementById("FoodItems");
                        var upperDiv = document.createElement("div");
                        upperDiv.setAttribute("class", "upperDiv");
                        var img = document.createElement("img")
                        img.src = childSnapshot.val().ItemImg;
                        img.setAttribute("class", "imageStyle");
                        var detailDiv = document.createElement("div");
                        detailDiv.setAttribute("class", "detail");
                        var detailFirstDiv = document.createElement("div");
                        var b = document.createElement("b");
                        b.setAttribute("class", "OnlyForColor")
                        b.innerHTML = "Item Name :" + childSnapshot.val().FoodItemName + "\n";
                        var p = document.createElement("p");
                        p.setAttribute("class", "OnlyForColor")
                        p.innerHTML = "Price :" + childSnapshot.val().FoodItemPrice;


                        FoodItemsDiv.appendChild(upperDiv);
                        upperDiv.appendChild(img);
                        upperDiv.appendChild(detailDiv);
                        detailDiv.appendChild(detailFirstDiv);
                        detailFirstDiv.appendChild(b);
                        detailFirstDiv.appendChild(p);
                    })
                })
            } else {
                var FoodItemsDiv = document.getElementById("FoodItems");
                var p = document.createElement("p");
                p.innerHTML = "No Data Found";
                p.setAttribute("class", "OnlyForColor")

                FoodItemsDiv.appendChild(p)
            }
        })
    }

    UpdateProfile() {
        var UpdatedName = document.getElementById("RestName").value;
        var UpdatedEmail = document.getElementById("RestEmail").value;
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        fire.database().ref("Restaurant").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var userId = fire.auth().currentUser.uid;
                if (UpdatedName === childSnapshot.val().name) {
                    alert("This name is already is in Use")
                    return false
                }
                else {

                }
                if (UpdatedEmail.toLowerCase() !== childSnapshot.val().email.toLowerCase()) {
                    if (reg.test(UpdatedEmail)) {

                    }
                    else {
                        return false
                    }
                }
                else {
                    return false
                }

                if(document.getElementById("Rest_Pic1").value){
                    var Rest_Pic1 = document.getElementById("Rest_Pic1")
                    var file = Rest_Pic1.files[0];
                    var storageRef = fire.storage().ref('images/');
                    var fileUpload = storageRef.child("RestaurantImages/" + "/" + file.name).put(file)
                    fire.storage().ref('images/').child("RestaurantImages/" + file.name).getDownloadURL().then(function (url) {
                        console.log(url);
                        fire.database().ref("Restaurant/" + userId).update({
                            name: UpdatedName,
                            email: UpdatedEmail,
                            Rest_Pic1: url,
                        })
                    }).catch(function (error) {
                        // Handle any errors
                    });
                }
                
                if(document.getElementById("Rest_Pic2").value){
                    var Rest_Pic2 = document.getElementById("Rest_Pic2")
                    var file = Rest_Pic2.files[0];
                    var storageRef = fire.storage().ref('images/');
                    var fileUpload = storageRef.child("RestaurantImages/" + "/" + file.name).put(file)
                    fire.storage().ref('images/').child("RestaurantImages/" + file.name).getDownloadURL().then(function (url) {
                        console.log(url);
                        fire.database().ref("Restaurant/" + userId).update({
                            name: UpdatedName,
                            email: UpdatedEmail,
                            Rest_Pic2: url,
                        })
                    }).catch(function (error) {
                        // Handle any errors
                    });
                }
                
                if(document.getElementById("Rest_Pic3").value){
                    var Rest_Pic3 = document.getElementById("Rest_Pic3")
                    var file = Rest_Pic3.files[0];
                    var storageRef = fire.storage().ref('images/');
                    var fileUpload = storageRef.child("RestaurantImages/" + "/" + file.name).put(file)
                    fire.storage().ref('images/').child("RestaurantImages/" + file.name).getDownloadURL().then(function (url) {
                        console.log(url);
                        fire.database().ref("Restaurant/" + userId).update({
                            name: UpdatedName,
                            email: UpdatedEmail,
                            Rest_Pic3: url,
                        })
                    }).catch(function (error) {
                        // Handle any errors
                    });
                }

                // else {
                //     fire.database().ref("Restaurant/" + userId).update({
                //         name: UpdatedName,
                //         email: UpdatedEmail,
                //     })
                // }

            })
        })

    }


    AddFoodItem() {
        return <div style={{ padding: "20px" }}>
            <h4 className="OnlyForColor">Add Food Categories</h4>
            <div id="FoodCategoryChkbox">
                <label>
                    <input name="FoodCategory" type="checkbox" value="Chinese" />
                    <span>Chinese</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Italian" />
                    <span>Italian</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Pizza" />
                    <span>Pizza</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="BBQ" />
                    <span>BBQ</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Salad" />
                    <span>Salad</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Drinks" />
                    <span>Drinks</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Sandwiches" />
                    <span>Sandwiches</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Fast Food" />
                    <span>Fast Food</span>
                </label>
                <label>
                    <input name="FoodCategory" type="checkbox" value="Biverages" />
                    <span>Biverages</span>
                </label>
            </div>
            <br />
            <button onClick={this.AddItem} className="OnlyForColor">Add Categories</button>
            <br /><br />
            <h2 className="OnlyForColor">Add Food Items</h2>
            <br />
            <b className="OnlyForColor">Food Item Image</b> < br />
            <input type="file" id="foodItemImg" className="OnlyForColor" /> <br /><br />
            <b className="OnlyForColor">Item Name</b> < br />
            <input placeholder="item name" id="ItemName" className="OnlyForColor" style={{borderBottom : "1px solid black", borderRadius : "1px"}}/><br /> <br />
            <b className="OnlyForColor">item Price</b> < br />
            <input type="number" placeholder="Item Price" id="ItemPrice" className="OnlyForColor" style={{borderBottom : "1px solid black", borderRadius : "1px"}}/>
            <br /><br />
            <b className="OnlyForColor">Select Category for item</b> < br />
            <div id="SelectCategory">

            </div>
            <br /><br />
            <button onClick={this.AddItem} className="OnlyForColor" style={{width: '100%', height: '35px', border: 'none', borderRadius: '20px', background: '#f54747'}}>Add Item</button>
            <br /><br /><br /><br />
        </div>
    }

    DynamicDataOnAddItem(){
        var userId = fire.auth().currentUser.uid;
        fire.database().ref("Restaurant/" + userId).child("FoodCategory").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + userId).once("value").then(function (snapshot) {

                    for (var i = 0; i < snapshot.val().FoodCategory.length; i++) {
                        var mainDiv = document.getElementById("SelectCategory");
                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.setAttribute("type", "checkbox");
                        var span = document.createElement("span");
                        span.innerHTML = snapshot.val().FoodCategory[i];
                        input.setAttribute("value",snapshot.val().FoodCategory[i])
                        mainDiv.appendChild(label);
                        label.appendChild(input);
                        label.appendChild(span);
                    }
                })
            }
            else {
                var mainDiv = document.getElementById("SelectCategory");
                var p = document.createElement("p");
                p.innerHTML = "Please First Add some Category";
                p.setAttribute("class", "OnlyForColor")

                mainDiv.appendChild(p)
            }
        })
    }

    AddItem() {
        var userId = fire.auth().currentUser.uid;
        // get All checkbox value and save in firebase database
        var allVals = [];
        var checkboxObj = {}
        $('#FoodCategoryChkbox :checked').each(function () {
            allVals.push($(this).val());
            checkboxObj = { ...allVals }
        });
        fire.database().ref("Restaurant/" + userId).child("FoodCategory").update(checkboxObj)


        // Get Food item image and name and price and selected category save in firebase database
        if (document.getElementById("foodItemImg").value !== "") {
            var FoodItemPic = document.getElementById("foodItemImg")
            var file = FoodItemPic.files[0];
            var storageRef = fire.storage().ref('images/');
            var fileUpload = storageRef.child("RestaurantImages" + "/" + file.name).put(file)
            fire.storage().ref('images/').child("RestaurantImages/" + file.name).getDownloadURL().then(function (url) {
                console.log(url);
                localStorage.setItem("FoodItemImg", url)
                fire.database().ref("Restaurant/" + userId).child("FoodItem" + "/" + newPostKey).update({
                    ItemImg: localStorage.getItem("FoodItemImg"),
                })
            }).catch(function (error) {
                console.log(error)
            });
        }
        else {
            alert("please attach item pic")
            return false
        }


        var UnderCategory = [];
        var CatCheckBox = {}
        $('#SelectCategory :checked').each(function () {
            UnderCategory.push($(this).val());
            CatCheckBox = { ...UnderCategory }
        });

        if (document.getElementById("ItemName").value !== "" && document.getElementById("ItemPrice").value !== "") {
            var FoodItemName = document.getElementById("ItemName").value;
            var FoodItemPrice = document.getElementById("ItemPrice").value;

            var newPostKey = fire.database().ref().push().key;
            localStorage.setItem("newPostKey", newPostKey)
            fire.database().ref("Restaurant/" + userId).child("FoodItem" + "/" + newPostKey).update({
                FoodItemName: FoodItemName,
                FoodItemPrice: FoodItemPrice,
                userId: userId,
            })
            fire.database().ref("Restaurant/" + userId).child("FoodItem" + "/" + newPostKey + "/" + "Category").update(CatCheckBox);
        }
        else {
            alert("please add item image, name and price")
            // return false
        }

    }
// Now work Fast here 

    // Pending Screen
    Pending() {
        return <div>
            <div className="Restaurant_List" id="Restaurant_List" style={{padding : "15px"}}>
                <h3 className="OnlyForColor">Pending Orders</h3><br />
            </div>
            <br /><br /> <br />
        </div>
    }

    PendingFunc() {
        var userId = fire.auth().currentUser.uid;
        fire.database().ref("Restaurant/" + userId).child("Orders" + "/" + "Pending").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val())

                var Rest = document.getElementById("Restaurant_List");
                var upperDiv = document.createElement("div");
                upperDiv.setAttribute("class", "upperDiv");
                upperDiv.style.margin = "10px";
                var img = document.createElement("img")
                img.src = childSnapshot.val().ItemImg;
                img.setAttribute("class", "imageStyle");
                var detailDiv = document.createElement("div");
                detailDiv.setAttribute("class", "detail");
                var detailFirstDiv = document.createElement("div");
                detailFirstDiv.setAttribute("class","detailFirstDiv")
                var b = document.createElement("b");
                b.setAttribute("class", "OnlyForColor")
                b.innerHTML = "Item Name :" + childSnapshot.val().Itemname + "\n";
                var p = document.createElement("p");
                p.setAttribute("class", "OnlyForColor")
                p.innerHTML = "Price :" + childSnapshot.val().Itemprice;
                var span = document.createElement("span");
                span.innerHTML = childSnapshot.val().OrderBy;
                span.style.display = "none";
                span.setAttribute("class","span")
                var RemoveBtn = document.createElement("button");
                RemoveBtn.innerHTML = 'Cancel';
                RemoveBtn.style.width = '125px';
                RemoveBtn.style.height = '35px';
                RemoveBtn.style.border = 'none';
                RemoveBtn.style.borderBottomLeftRadius = '20px';
                RemoveBtn.style.background = '#f15656';
                RemoveBtn.style.outline = "none";
                RemoveBtn.setAttribute("class","RemoveOrder");
                var AccBtn = document.createElement("button");
                AccBtn.innerHTML = "Accept";
                AccBtn.style.width = '125px';
                AccBtn.style.height = '35px';
                AccBtn.style.border = 'none';
                AccBtn.style.borderBottomRightRadius = '20px';
                AccBtn.style.background = 'rgb(169, 127, 96)';
                AccBtn.style.outline = "none";
                AccBtn.setAttribute("id","AccOrder");

                Rest.appendChild(upperDiv);
                upperDiv.appendChild(img);
                upperDiv.appendChild(detailDiv);
                detailDiv.appendChild(detailFirstDiv);
                detailFirstDiv.appendChild(b);
                detailFirstDiv.appendChild(p);
                detailFirstDiv.appendChild(span);
                upperDiv.appendChild(RemoveBtn);
                upperDiv.appendChild(AccBtn);
            })
        })

    }


    OrderRejected(){
        // const {OrderRejected, OrderBy} = this.state;
        // var userId = fire.auth().currentUser.uid;
        // var reference = fire.database().ref("Restaurant/" + userId).child("Orders" + "/" + "Pending")
        // var other = reference.orderByChild("OrderBy").equalTo(OrderBy).once("value")
        // console.log(other)
        
        // .then(function(snapshot){
        //     console.log(snapshot.val())
        // })
    }

    componentDidMount(){
        var _ = this;
        $(document).on("click", "div .RemoveOrder", function () {
            var OrderBy = $(document).closest('.detailFirstDiv').children('.span').text();
            console.log(OrderBy)
            _.setState({
                OrderRejected : true,
                OrderBy : OrderBy,
            })
        })
        $(document).on("click", "#AccOrder" , function(){
            var OrderBy = $(this).find('span').text();
            // alert("You want to Accept Order Request");
            // _.setState({
            //     OrderAccepted : true,
            // })
        })
    }


    footer() {
        return <div className="Footer">
            <ul>
                <li><a href="#"><FontAwesomeIcon icon={faHome} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faHeart} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faCartPlus} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faUser} /></a></li>
            </ul>
        </div>
    }

    logout() {
        fire.auth().signOut().then(function () {
            localStorage.setItem("user", "no")
        })
            .catch(function (error) {
                // An error happened.
            });
        if (localStorage.getItem("user") === "no") {
            this.setState({
                user: false,
            })
        }
    }

    render() {
        const { user, showNav, Dashboard, ShowPending, EditProfile, AddItems, filter, OrderRejected } = this.state;
        return (
            <div>
                {user && !showNav && this.header()}

                {user && Dashboard && this.Dashboard()}
                {user && Dashboard && this.DynamicDataOnDashboard()}

                {user && EditProfile && this.EditProfile()}
                {user && EditProfile && this.DynamicDataOnEditProfile()}

                {user && AddItems && this.AddFoodItem()}
                {user && AddItems && this.DynamicDataOnAddItem()}

                {user && ShowPending && this.Pending()}
                {user && ShowPending && this.PendingFunc()}

                {user && OrderRejected && this.OrderRejected()}

                {filter && this.filter()}

                {showNav && user && this.navbar()}
                {user && !showNav && this.footer()}

                {!user && <Login jbDabao={this.state} />}

            </div>
        )
    }

}
export default RestDashboard;