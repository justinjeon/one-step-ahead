/*global chrome*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: null,
      website: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event);
    if (this.state.website === null) {
      alert("You must enter a website");
    } else if (this.state.timestamp === null) {
      alert("You must enter a time");
    }

    chrome.tabs.update({ url: "https://www." + this.state.website });
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  render() {
    return (
      <div>
        <div className="title">One Step Ahead</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="form-title">Website</div>
            <input
              autoFocus
              name="website"
              value={this.state.website}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <div className="form-title">Timestamp</div>
            <input
              name="timestamp"
              value={this.state.timestamp}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Window />, document.getElementById("root"));
