import React, { Component } from "react";
import "../css/UserDashboard.css";
import fire from '../Config/Firebase';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faSearch, faHeart, faCartPlus, faAlignLeft, faCut, faSlidersH, faChevronLeft, faInfoCircle, faComment, faStar } from '@fortawesome/fontawesome-free-solid';
import First from "../images/RestaurantImg/first.jpg";
import Second from "../images/RestaurantImg/second.jpg";
import Third from "../images/RestaurantImg/three.jpg";
import FirstFood from "../images/FoodImg/first.jpg";
import SecondFood from "../images/FoodImg/second.jpg";
import ThirdFood from "../images/FoodImg/three.jpg";
import ForthFood from "../images/FoodImg/forth.jpg";
import Login from "../component/Login";
import RestaurantList from "../component/Tabs/RestaurantList";
import MyOrder from "../component/Tabs/MyOrder";

class UserDashboard extends Component {

    constructor() {
        super();

        this.state = {
            user: true,
            showNav: false,
            loginBtn: true,
            Dashboard: true,
            Chat: false,
            ShowRestraurantList: false,
            ShowOrder: false,
            DetailedScreenShow: false,
            ShowOrderScreen: false,
            filter: false,
            FilterResult : false,
            ClickedDivUid: "",
            OrderDetail: {
                Item: "",
                Price: "",
                Img: "",
                ItemFrom: "",
            },
            isClicked: false,
        }
        this.logout = this.logout.bind(this);
        this.Design = this.Design.bind(this);
        this.PublishOrder = this.PublishOrder.bind(this);
    }

    header() {
        return <div className="header">
            <a href="#"><FontAwesomeIcon icon={faAlignLeft} onClick={() => this.setState({ showNav: true, Dashboard: false, ShowOrder: false, Chat: false, ShowRestraurantList: false, DetailedScreenShow: false, })} /></a>
            <b style={{ color: "white" }}>Foodpanda</b>
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faSlidersH} onClick={() => this.setState({ filter: true, showNav: false, Dashboard: false, ShowOrder: false, Chat: false, ShowRestraurantList: false, DetailedScreenShow: false, })} />
        </div>
    }

    navbar() {
        return <div className="Navbar">
            <br /><br />
            <h2>Foodpanda</h2>
            <br /><br /><br />
            <ul style={{ float: "left" }}>
                <li><a href="#" onClick={() => this.setState({ showNav: false, Dashboard: true, ShowOrder: false, Chat: false, ShowRestraurantList: false, DetailedScreenShow: false, })}>Dashboard</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowRestraurantList: true, Dashboard: false, ShowOrder: false, Chat: false, DetailedScreenShow: false, })}>Restaurant</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowOrder: true, })}>My Requests</a></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
        </div>
    }

    filter() {
        return <div className="filter">
            <div className="head">
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => this.setState({ showNav: false, filter: false, Dashboard: true, ShowOrder: false, Chat: false, ShowRestraurantList: false, DetailedScreenShow: false, })} /> &nbsp;&nbsp;&nbsp;&nbsp; <b style={{ color: "white", fontSize: "20px" }}>Filter</b>
            </div>
            <div className="Body">
                <div className="mainDiv">
                    <h3 className="OnlyForColor">Price</h3>
                    <div class="range-container">
                        <input type="range" id="range" max="1000" min="250" onChange={this.DynamicDataOnFilter} />
                        <label className="OnlyForColor" id="counter">250</label>
                    </div>
                </div>
                <br />
                <div className="mainDiv">
                    <h3 className="OnlyForColor">Rating</h3><br />
                    <div style={{ display: "flex", flex: "1", flexDirection: "row", padding: "20px" }}>
                        <FontAwesomeIcon icon={faStar} style={{ margin: "5px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ margin: "5px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ margin: "5px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ margin: "5px" }} />
                        <FontAwesomeIcon icon={faStar} style={{ margin: "5px" }} />
                    </div>
                </div>
                <br />
                <div className="mainDiv">
                    <h3 className="OnlyForColor">Search By Categories</h3><br /><br />
                    <div id="CatList">
                        <div className="row">
                            <input type="checkbox" id="Chinese" value="Chinese" />
                            <label for="Chinese" className="OnlyForColor">Chinese</label>
                        </div>
                        <br />
                        <div className="row">
                            <input type="checkbox" id="Italian" value="Italian" />
                            <label for="Italian" className="OnlyForColor">Italian</label>
                        </div>
                        <br />
                        <div className="row">
                            <input type="checkbox" id="Pizza" value="Pizza" />
                            <label for="Pizza" className="OnlyForColor">Pizza</label>
                        </div>
                        <br />
                        <div className="row">
                            <input type="checkbox" id="Fast Food" value="Fast Food" />
                            <label for="Fast Food" className="OnlyForColor">Fast Food</label>
                        </div>
                        <br />
                        <div className="row">
                            <input type="checkbox" id="Biverages" value="Biverages" />
                            <label for="Biverages" className="OnlyForColor">Biverages</label>
                        </div>
                        <br />
                        <div className="row">
                            <input type="checkbox" id="Sandwiches" value="Sandwiches" />
                            <label for="Sandwiches" className="OnlyForColor">Sandwiches</label>
                        </div>
                        <br />
                    </div>
                </div>
                <br />
            </div>
            <br /><br />
            <button className="footer" onClick={() => this.setState({ filter: false, FilterResult: true, showNav: false, Dashboard: false, ShowOrder: false, Chat: false, ShowRestraurantList: false, DetailedScreenShow: false,  })}>Apply Filter</button>
        </div>
    }

    DynamicDataOnFilter(e) {

        const label = e.target.nextElementSibling;
        const value = +e.target.value;
        label.innerHTML = value;

    }

    filterResult(){
        var allVals = [];
        var checkboxObj = {}
        $('#CatList :checked').each(function () {
            allVals.push($(this).val());
            checkboxObj = { ...allVals }
        });

        fire.database().ref("Restaurant").once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
                console.log(childSnapshot.val())
                if(childSnapshot.child("FoodCategory").exists()){
                    for(var i = 0; i < childSnapshot.val().FoodCategory.length; i++){
                        var arr = [];
                        arr.push(childSnapshot.val().FoodCategory)
                        console.log(arr)
                        console.log(allVals);
                        const compare = [];
  
                        arr.forEach((e1)=>allVals.forEach((e2)=> {if(e1 === e2){
                                compare.push(e1);
                            }
                        }
                        ));
                        console.log(compare)
                    }
                }
                
            })
        })
    }

    restaurants() {
        return <div className="Rest_List">
            <b style={{ fontSize: "17px", color: "black", fontFamily: "arial, sansserif" }} id="Heading">Top Restaurants</b><br />
            <div className="Top_restaurant" id="Top_restaurant">
                <div className="upperDiv" id="upperDiv">
                    <div>
                        <img src={First} className="imageStyle" />
                    </div>
                    <div className="detail">
                        <div>
                            <b className="OnlyForColor" id="name">Pizza Point</b><br />
                            <small className="OnlyForColor">Garden, Karachi</small>
                        </div>
                    </div>
                </div>
                <div className="upperDiv">
                    <div>
                        <img src={Second} className="imageStyle" />
                    </div>
                    <div className="detail">
                        <div>
                            <b className="OnlyForColor" id="name">Espresso</b><br />
                            <small className="OnlyForColor">I.I Chundrigar, Karachi</small>
                        </div>

                    </div>
                </div>
                <div className="upperDiv">
                    <div>
                        <img src={Third} className="imageStyle" />
                    </div>
                    <div className="detail">
                        <div>
                            <b className="OnlyForColor" id="name">Subway</b><br />
                            <small className="OnlyForColor">I.I Chundrigar, Karachi</small>
                        </div>

                    </div>
                </div>
                <div className="upperDiv">
                    <div>
                        <img src={Second} className="imageStyle" />
                    </div>
                    <div className="detail">
                        <div>
                            <b className="OnlyForColor" id="name">Red Apple</b><br />
                            <small className="OnlyForColor">Tariq Road, Karachi</small>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    }


    // Add Restaurant Dynamically :)
    displayRestaurants() {
        fire.database().ref("Restaurant").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                console.log(childSnapshot.val())

                var TopRest = document.getElementById("Top_restaurant");
                var upperDiv = document.createElement("div");
                upperDiv.setAttribute("class", "upperDiv");
                upperDiv.style.margin = "10px";
                upperDiv.setAttribute("class", "Upper");
                var img = document.createElement("img");
                img.src = childSnapshot.val().MainPic;
                img.setAttribute("class", "imageStyle")
                var detailDiv = document.createElement("div");
                detailDiv.setAttribute("class", "detail");
                var detailFirstDiv = document.createElement("div");
                var b = document.createElement("b");
                b.setAttribute("class", "OnlyForColor");
                b.innerHTML = childSnapshot.val().name + "\n";
                var br = document.createElement("br");
                var small = document.createElement("small");
                small.setAttribute("class", "OnlyForColor");
                small.innerHTML = childSnapshot.val().City + "," + childSnapshot.val().State;
                var span = document.createElement("span");
                span.innerHTML = childSnapshot.key;
                span.style.display = "none"


                TopRest.appendChild(upperDiv);
                upperDiv.appendChild(img);
                upperDiv.appendChild(detailDiv);
                detailDiv.appendChild(detailFirstDiv);
                detailFirstDiv.appendChild(b);
                detailFirstDiv.appendChild(br);
                detailFirstDiv.appendChild(small);
                detailFirstDiv.appendChild(span)


            })
        })
    }

    Food() {
        return <div className="Choice_food" id="Choice_food">
            <b style={{ fontSize: "17px", color: "black", fontFamily: "arial, sansserif" }}>Choice food</b><br />
            <div className="Top_Food">
                <div className="ImgDiv">
                    <img src={FirstFood} className="foodImages" />
                    <b className="OnlyForColor">Fast Food</b>
                </div>
                <div className="ImgDiv">
                    <img src={SecondFood} className="foodImages" />
                    <b className="OnlyForColor">Chinese Food</b>
                </div>
                <div className="ImgDiv">
                    <img src={ThirdFood} className="foodImages" />
                    <b className="OnlyForColor">Snack Food</b>
                </div>
                <div className="ImgDiv">
                    <img src={ForthFood} className="foodImages" />
                    <b className="OnlyForColor">Italian Food</b>
                </div>
                <div className="ImgDiv">
                    <img src={SecondFood} className="foodImages" />
                    <b className="OnlyForColor">Chinese Food</b>
                </div>
            </div>
        </div>
    }

    FoodItems() {
        return <div id="foodItemDiv" >
            &nbsp;&nbsp;&nbsp;<b className="OnlyForColor">All Restaurant List</b><br />
            <div id="RestLIST" className="Restaurant_List">

            </div>
            <br /><br /><br />
        </div>
    }


    DetailScreen() {
        return <div id="DetailScreen" style={{ background: "#2b2626", width: "57vh", minHeight: "100vh" }}>
            <div className="head" id="head" style={{ display: "flex", flex: "1", flexDirection: "row", justifyContent: "space-between", lineHeight: "5vh", height: "20vh", alignItems: "center", fontSize: "22px" }}>
                <a href="#"><FontAwesomeIcon icon={faChevronLeft} onClick={this.Design} /></a>
                <b id="ClickRestName" style={{ fontSize: "26px" }}></b>
                <a href="#"><FontAwesomeIcon icon={faInfoCircle} /></a>
            </div>
            <br />
            <div id="FoodCategory" style={{ padding: "5px" }}>
                &nbsp;<b style={{ color: "white" }}>Food Category</b><br /><br />
            </div>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "rgb(165, 97, 236)", lineHeight: "48px", textAlign: "center", position: "fixed", right: "8%", top: "80%", fontSize: "26px" }}>
                <FontAwesomeIcon icon={faComment} />
            </div>
            <br /><br />
            &nbsp;&nbsp;&nbsp;<b style={{ color: "white" }}>Food Item</b><br />
            <div id="Items" className="Top_restaurant" style={{ padding: "5px" }}>
            </div>
        </div>

    }

    DynamicDataOnDetailScreen() {
        const { ClickedDivUid } = this.state
        fire.database().ref("Restaurant/" + ClickedDivUid).once("value").then(function (snapshot) {
            $('#head').css('background-image', 'url("' + snapshot.val().MainPic + '")');
            document.getElementById("head").style.backgroundRepeat = "no-repeat";
            document.getElementById("head").style.backgroundPosition = "center";
            document.getElementById("head").style.backgroundSize = "cover";
            document.getElementById("ClickRestName").innerHTML = snapshot.val().name;
            console.log(snapshot.val())
        })

        fire.database().ref("Restaurant/" + ClickedDivUid).child("FoodCategory").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + ClickedDivUid).once("value").then(function (snapshot) {

                    for (var i = 0; i < snapshot.val().FoodCategory.length; i++) {
                        var mainDiv = document.getElementById("FoodCategory");
                        var label = document.createElement("label");
                        var input = document.createElement("input");
                        input.setAttribute("type", "checkbox");
                        input.setAttribute("disabled", "disabled")
                        var span = document.createElement("span");
                        span.innerHTML = snapshot.val().FoodCategory[i];
                        span.style.border = "1px solid rgb(251, 255, 2)";
                        span.style.color = "rgb(236, 236, 236)";


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


        fire.database().ref("Restaurant/" + ClickedDivUid).child("FoodItem").once("value").then(function (firstSnapshot) {
            if (firstSnapshot.exists()) {
                fire.database().ref("Restaurant/" + ClickedDivUid).child("FoodItem").once("value").then(function (snapshot) {
                    console.log(snapshot.val())
                    snapshot.forEach(function (childSnapshot) {
                        console.log(childSnapshot.val())

                        var FoodItemsDiv = document.getElementById("Items");
                        var upperDiv = document.createElement("div");
                        upperDiv.setAttribute("class", "upperDiv UpperSecond");
                        var img = document.createElement("img")
                        img.src = childSnapshot.val().ItemImg;
                        img.setAttribute("class", "imageStyle");
                        var detailDiv = document.createElement("div");
                        detailDiv.setAttribute("class", "detail");
                        detailDiv.style.boxShadow = "none";
                        var detailFirstDiv = document.createElement("div");
                        var b = document.createElement("b");
                        b.setAttribute("class", "OnlyForColor")
                        b.innerHTML = childSnapshot.val().FoodItemName + "\n";
                        var p = document.createElement("p");
                        p.setAttribute("class", "OnlyForColor")
                        p.innerHTML = "Price :" + childSnapshot.val().FoodItemPrice;
                        var span = document.createElement("span");
                        span.innerHTML = childSnapshot.val().userId;
                        span.style.display = "none";


                        FoodItemsDiv.appendChild(upperDiv);
                        upperDiv.appendChild(img);
                        upperDiv.appendChild(detailDiv);
                        detailDiv.appendChild(detailFirstDiv);
                        detailFirstDiv.appendChild(b);
                        detailFirstDiv.appendChild(p);
                        detailFirstDiv.appendChild(span);
                    })
                })
            }
            else {
                var FoodItemsDiv = document.getElementById("Items");
                var p = document.createElement("p");
                p.innerHTML = "No Data Found";
                p.setAttribute("class", "OnlyForColor")

                FoodItemsDiv.appendChild(p)
            }
        })
    }


    DisplayFoodItems() {
        // For Food Item div add dynamically
        fire.database().ref("Restaurant").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val())

                var Rest = document.getElementById("RestLIST");
                var upperDiv = document.createElement("div");
                upperDiv.setAttribute("class", "DivUpper");
                var img = document.createElement("img");
                img.src = childSnapshot.val().MainPic;
                img.setAttribute("class", "styleforImg")
                var detailDiv = document.createElement("div");
                var detailFirstDiv = document.createElement("div");
                detailFirstDiv.style.padding = "5px";
                var b = document.createElement("b");
                b.setAttribute("class", "OnlyForColor");
                b.innerHTML = childSnapshot.val().name + " ";
                var br = document.createElement("br");
                // fire.database().ref("Restaurant").once("value").then(function (snapshot) {
                //     snapshot.forEach(function (childSnapshot) {
                //         if (childSnapshot.child("FoodCategory").exists()) {
                //             for (var i = 0; i < childSnapshot.val().FoodCategory.length; i++) {
                //                 var small1 = document.createElement("small");
                //                 small1.setAttribute("class", "OnlyForColor");
                //                 small1.innerHTML = childSnapshot.val().FoodCategory[i] + "," + " ";
                //                 detailFirstDiv.appendChild(small1);
                //             }
                //         }
                //         else {
                //             var small1 = document.createElement("small");
                //             small1.setAttribute("class", "OnlyForColor");
                //             small1.innerHTML = " ";
                //             detailFirstDiv.appendChild(small1);
                //         }
                //     })
                // })

                var small = document.createElement("small");
                small.setAttribute("class", "OnlyForColor");
                small.innerHTML = childSnapshot.val().City + "," + childSnapshot.val().State;


                Rest.appendChild(upperDiv);
                upperDiv.appendChild(img);
                upperDiv.appendChild(detailDiv);
                detailDiv.appendChild(detailFirstDiv);
                detailFirstDiv.appendChild(b);
                detailFirstDiv.appendChild(br);
                detailFirstDiv.appendChild(small);


            })
        })
    }

    Design() {
        var _ = this;
        _.setState({
            showNav: false,
            ShowRestraurantList: false,
            Dashboard: true,
            ShowOrder: false,
            Chat: false,
            DetailedScreenShow: false,
            ShowOrderScreen: false,
            filter: false,
            isClicked: false,
            ClickedDivUid: "",
        })
    }

    OrderScreen() {

        return <div id="OrderScreen" style={{ background: "#2b2626", width: "57vh", minHeight: "100vh" }}>
            <div className="head" id="head" style={{ display: "flex", flex: "1", flexDirection: "row", justifyContent: "space-between", lineHeight: "5vh", height: "20vh", alignItems: "center", fontSize: "22px" }}>
                <a href="#"><FontAwesomeIcon icon={faChevronLeft} onClick={this.Design} /></a>
                <b id="ClickRestName" style={{ fontSize: "26px", textAlign: "center" }}></b>
                <a href="#"><FontAwesomeIcon icon={faInfoCircle} /></a>
            </div>
            <br />
            <div style={{ padding: "10px" }}>
                <h2>Order Detail</h2>
                <br />
                <table style={{ width: "100%", padding: "10px" }}>
                    <tbody>
                        <tr>
                            <td>Item</td>
                            <td>Qty</td>
                            <td>Price</td>
                        </tr>
                        <tr>
                            <td>Zinger Burger</td>
                            <td>1</td>
                            <td>300</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <hr />
                <table style={{ width: "100%", padding: "10px" }}>
                    <tbody>
                        <tr>
                            <td>SubTotal</td>
                            <td></td>
                            <td>300</td>
                        </tr>
                        <tr>
                            <td>SalesTax</td>
                            <td></td>
                            <td>50</td>
                        </tr>
                        <tr>
                            <td>Delivery Fee</td>
                            <td></td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>450</td>
                        </tr>

                    </tbody>
                </table>
                <br />
                <hr />
                <div style={{ padding: "15px" }}>
                    <p>Payment Method</p>
                    <br />
                    <b>Cash</b>
                </div>
                <br /><br />
                <button style={{ width: "100%", height: "35px", border: "none", borderRadius: "20px", background: "red" }} onClick={this.PublishOrder}>Place Order</button>
            </div>


            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "rgb(165, 97, 236)", lineHeight: "48px", textAlign: "center", position: "fixed", right: "8%", top: "80%", fontSize: "26px" }}>
                <FontAwesomeIcon icon={faComment} />
            </div>

        </div>

    }

    DisplayDataOnOrderScreen() {
        const { ItemFrom, Img, Item, Price } = this.state.OrderDetail;
        fire.database().ref("Restaurant/" + ItemFrom).once("value").then(function (snapshot) {
            $('#head').css('background-image', 'url("' + Img + '")');
            document.getElementById("head").style.backgroundRepeat = "no-repeat";
            document.getElementById("head").style.backgroundPosition = "center";
            document.getElementById("head").style.backgroundSize = "cover";
            document.getElementById("ClickRestName").innerHTML = Item;
            console.log(snapshot.val())
        })

    }

    PublishOrder() {
        const { ItemFrom, Img, Item, Price } = this.state.OrderDetail;

        var userId = fire.auth().currentUser.uid;
        var newPostKey = fire.database().ref().push().key;
        fire.database().ref("users/" + userId).child("MyRequests" + "/" + "Pending" + "/" + newPostKey).set({
            ItemImg: Img,
            Itemprice: Price,
            Itemname: Item,
            ItemFrom : ItemFrom,
        })

        fire.database().ref("Restaurant/" + ItemFrom).child("Orders" + "/" + "Pending" + "/" + newPostKey).set({
            ItemImg: Img,
            Itemprice: Price,
            Itemname: Item,
            OrderBy : userId,
        })

        this.setState({
            showNav: false,
            ShowRestraurantList: false,
            Dashboard: false,
            ShowOrder: true,
            Chat: false,
            DetailedScreenShow: false,
            ShowOrderScreen: false,
            filter: false,
            isClicked: false,
            ClickedDivUid: "",
        })
        alert("your Order has been Successfully Placed");
    }

    footer() {
        return <div className="Footer">
            < ul >
                <li><a href="#"><FontAwesomeIcon icon={faHome} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faHeart} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faCartPlus} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faUser} /></a></li>
            </ul >
        </div >
    }

    componentDidMount() {
        var _ = this;
        $(document).on("click", ".Upper", function () {
            var text = $(this).find('span').text();
            console.log(text);
            _.setState({
                showNav: false,
                ShowRestraurantList: false,
                Dashboard: false,
                ShowOrder: false,
                Chat: false,
                DetailedScreenShow: true,
                filter: false,
                ClickedDivUid: text,
            })
        })

        var _ = this;
        $(document).on("click", ".UpperSecond", function () {
            var text = $(this).find('span').text();
            var imgSrc = $(this).find('img').attr('src');
            var Name = $(this).find('b').text();
            var Price = $(this).find('p').text();
            _.setState({
                showNav: false,
                ShowRestraurantList: false,
                Dashboard: false,
                ShowOrder: false,
                Chat: false,
                DetailedScreenShow: false,
                ShowOrderScreen: true,
                filter: false,
                OrderDetail: {
                    ..._.state.OrderDetail,
                    Item: Name,
                    Price: Price,
                    Img: imgSrc,
                    ItemFrom: text,
                }
            })
        })
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
        console.log(this.state)
        const { user, showNav, ShowRestraurantList, ShowOrder, DetailedScreenShow, ShowOrderScreen, Dashboard, filter, isClicked, FilterResult } = this.state;
        return (
            <div>

                {user && !showNav && !filter && !DetailedScreenShow && !ShowOrderScreen && this.header()}

                {user && Dashboard && this.restaurants()}
                {user && Dashboard && this.displayRestaurants()}
                {user && Dashboard && this.Food()}
                {user && Dashboard && this.FoodItems()}
                {user && Dashboard && this.DisplayFoodItems()}

                {user && !showNav && !filter && !DetailedScreenShow && !ShowOrderScreen && this.footer()}

                {user && DetailedScreenShow && this.DetailScreen()}
                {user && DetailedScreenShow && this.DynamicDataOnDetailScreen()}

                {user && ShowOrderScreen && this.OrderScreen()}
                {user && ShowOrderScreen && this.DisplayDataOnOrderScreen()}

                {user && filter && this.filter()}
                {user && FilterResult && this.filterResult()}
                {/* {user && filter && this.DynamicDataOnFilter()} */}

                {!user && <Login PropFromUserDash={this.state} />}
                {showNav && this.navbar()}
                {ShowRestraurantList && <RestaurantList />}
                {ShowOrder && <MyOrder />}

            </div>
        )
    }

}
export default UserDashboard;