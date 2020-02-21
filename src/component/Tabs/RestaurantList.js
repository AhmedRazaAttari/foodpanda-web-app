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
            showNav: false,
        }
    }



    navbar() {
        return <div className="Navbar">
            <br /><br />
            <h2>Foodpanda</h2>
            <br /><br /><br />
            <ul style={{ float: "left" }}>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowRestraurantList: true })}>Restaurant</a></li>
                <li><a href="#" onClick={() => this.setState({ showNav: false, ShowOrder: true, })}>My Orders</a></li>
                <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
        </div>
    }

    Restaurant() {
        return <div>
            <br />
            <h3 align="center" className="OnlyForColor">Restaurant List</h3>
            <br />
            <div id="Restaurant_List">

            </div>
        </div>
    }

    content() {
        fire.database().ref("Restaurant").once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val())

                var Rest = document.getElementById("Restaurant_List");
                var upperDiv = document.createElement("div");
                upperDiv.setAttribute("class", "DivUpper");
                var img = document.createElement("img");
                img.src = childSnapshot.val().MainPic;
                img.setAttribute("class", "styleforImg")
                var detailDiv = document.createElement("div");
                var detailFirstDiv = document.createElement("div");
                var b = document.createElement("b");
                b.setAttribute("class", "OnlyForColor");
                b.innerHTML = childSnapshot.val().name + "\n";
                var br = document.createElement("br");
                var small = document.createElement("small");
                small.setAttribute("class", "OnlyForColor");
                small.innerHTML = childSnapshot.val().City + "," + childSnapshot.val().State;
                var iconDiv = document.createElement("div");


                Rest.appendChild(upperDiv);
                upperDiv.appendChild(img);
                upperDiv.appendChild(detailDiv);
                detailDiv.appendChild(detailFirstDiv);
                detailFirstDiv.appendChild(br);
                detailFirstDiv.appendChild(b);
                detailFirstDiv.appendChild(br);
                detailFirstDiv.appendChild(small);

            })
        })
    }



    render() {
        const { showNav } = this.state;
        return (
            <div>
                {showNav && this.navbar()}
                {this.content()}
                {!showNav && this.Restaurant()}
            </div>
        )
    }

}
export default RestaurantList;