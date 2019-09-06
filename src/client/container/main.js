import React, { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.history.push("/home");
    window.open(
      "#/home",
      "ccp",
      "resizable=0,scrollbars=0,menubar=0,location=0,height=495px,width=335px"
    );
    this.props.history.push("/home");
  }

  render() {
    return (
      <div>
        <Link to="home">Click to open CCP</Link>
      </div>
    );
  }
}

export default Main;
