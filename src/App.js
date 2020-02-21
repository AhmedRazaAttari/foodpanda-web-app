import React, { Component } from "react";
import './App.css';
import HomePage from "./component/HomePage"
import Logo from "./images/logo.png";
import fire from './Config/Firebase';
import UserDashboard from "./component/UserDashboard";
import RestDashboard from "./component/RestDashboard";


class App extends Component {

  constructor() {
    super();

    this.state = {
      render: false,
      Succesfull: ""
    }
  }

  testing() {
    return <div className="App">
      <div className="firstDisplay">
        <img src={Logo} width="300px" />
      </div>
    </div>
  }

  componentDidMount() {
    setTimeout(function () {
      this.setState({ render: true })
    }.bind(this), 3000)
    
  }


  render() {
    const { render, isLogin } = this.state;
    return (
      <div>
        {!render && this.testing()}
        {render && <HomePage />}
      </div>
    );
  }
}

export default App;
