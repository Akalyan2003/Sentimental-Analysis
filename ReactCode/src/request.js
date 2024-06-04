import React, { Component } from "react";
import axios from "axios";
import "./Request.css";

class Request extends Component {
  constructor() {
    super();
    this.state = {
      string: "",
      prediction: "",
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ string: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { string } = this.state;
    axios
      .post("http://127.0.0.1:5000/predict", { review: string })
      .then((res) => {
        this.setState({ prediction: res.data.prediction, loading: false });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { string, prediction, loading } = this.state;

    return (
      <div className="container">
        <div className="login-form">
          <h1>Restaurant Review Sentiment Analysis</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-input-material">
              <label>Enter your review</label>
              <input
                type="text"
                value={string}
                onChange={this.handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={!string || loading}
            >
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </button>
          </form>
          {prediction && (
            <div
              className={`alert ${
                prediction === "POSITIVE" ? "success" : "danger"
              }`}
            >
              <strong>Prediction:</strong> {prediction}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Request;
