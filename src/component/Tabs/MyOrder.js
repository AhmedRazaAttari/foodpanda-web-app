import React, { Component } from "react";
import "../../css/Tabs.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faSearch, faHeart, faWallet, faCartPlus, faPlus, faFilter, faAlignLeft, faCut } from '@fortawesome/fontawesome-free-solid';
import fire from '../../Config/Firebase';
import $ from 'jquery';


class RestaurantList extends Component {

    constructor() {
        super();

        this.state = {
            showNav : false,
            showPending : true,
            ShowInProgress : false,
            ShowDelivered : false,
        }
    }

    

    navbar(){
        return <div className="Navbar">
            <br /><br />
            <h2>Foodpanda</h2>
            <br /><br /><br />
            <ul style={{float : "left"}}>
                <li><a href="#" onClick={() => this.setState({ showNav : false, ShowRestraurantList : true })}>Restaurant</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav : false, ShowOrder : true, })}>My Orders</a></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
            </div>
    }

    Menu(){
        return <div className="Mainmenu">
            <ul>
                <li><a href="#" onClick={() => this.setState({ showPending : true, ShowInProgress : false, ShowDelivered : false, })}>Pending</a></li>
                <li><a href="#" onClick={() => this.setState({ showPending : false, ShowInProgress : true, ShowDelivered : false, })}>In Progress</a></li>
                <li><a href="#" onClick={() => this.setState({ showPending : false, ShowInProgress : false, ShowDelivered : true, })}>Delivered</a></li>
            </ul>
        </div>
    }

    PendingDiv(){
        return <div id="PendingDiv" style={{padding : "15px"}}>
        <b className="OnlyForColor">Ordered Items</b><br />
        <div id="Pending" className="Top_restaurant">

        </div>
        <br />
    </div>
    }

    showPending(){
        var userId = fire.auth().currentUser.uid;
        fire.database().ref("users/" + userId).child("MyRequests" + "/" + "Pending").once("value").then(function (snapshot){
            console.log(snapshot.val())
            snapshot.forEach(function (childSnapshot){
                console.log(childSnapshot.val())
                console.log(childSnapshot.val().Itemname)

                var Pending = document.getElementById("Pending");
                var upperDiv = document.createElement("div");
                upperDiv.setAttribute("class", "upperDiv");
                upperDiv.style.margin = "10px";
                var img = document.createElement("img")
                img.src = childSnapshot.val().ItemImg;
                img.setAttribute("class", "imageStyle");
                var detailDiv = document.createElement("div");
                detailDiv.setAttribute("class", "detail");
                var detailFirstDiv = document.createElement("div");
                var b = document.createElement("b");
                b.setAttribute("class", "OnlyForColor")
                b.innerHTML = "Item Name :" + childSnapshot.val().Itemname + "\n";
                var p = document.createElement("p");
                p.setAttribute("class", "OnlyForColor")
                p.innerHTML = "Price :" + childSnapshot.val().Itemprice;

                Pending.appendChild(upperDiv);
                upperDiv.appendChild(img);
                upperDiv.appendChild(detailDiv);
                detailDiv.appendChild(detailFirstDiv);
                detailFirstDiv.appendChild(b);
                detailFirstDiv.appendChild(p);
            })
        })
    }


    render() {
        const {showNav, showPending} = this.state;
        return (
            <div>
                {showNav && this.navbar()}
                {!showNav && this.Menu()}
                {showPending && this.PendingDiv()}
                {showPending && this.showPending()}
            </div>
        )
    }

}
export default RestaurantList;