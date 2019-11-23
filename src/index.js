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
    } else {
      let website = this.state.website;
      let timestamp = this.state.timestamp;

      //Add entry to chrome storage
      chrome.storage.sync.get(["queuedSites"], function(result) {
        result.queuedSites.push(website + " " + timestamp);
        chrome.storage.sync.set(
          { queuedSites: result.queuedSites },
          function() {}
        );
      });

      chrome.alarms.create(website + " " + timestamp, {
        when: Date.now() + timestamp * 1000
      });
      //Check if timestamp is before current time

      //Get the current array of websites
      //Append the
      //map an alarm to the array entry
      //chrome.alarm.create {certain time, }
      // chrome.windows.create({ url: "https://www." + this.state.website });
    }
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
