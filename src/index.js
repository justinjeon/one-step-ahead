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
  }

  handleSubmit(event) {
    alert(
      "You have submitted the website! " +
        this.state.website +
        " " +
        this.state.timestamp
    );
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
            Website
            <input
              name="website"
              value={this.state.website}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Timestamp
            <input
              name="timestamp"
              value={this.state.timestamp}
              onChange={this.handleInputChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Window />, document.getElementById("root"));
