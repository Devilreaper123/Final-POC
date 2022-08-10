import React, { Component } from "react";
import axios from "axios";
import "./Home.css";
export class Home extends Component {
  state = {
    file: null,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleCsvChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };
  handleJsonChange = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };
  handleCsvSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(this.state);
      let form_data = new FormData();
      form_data.append("file", this.state.file, this.state.file.name);
      let url = "http://localhost:4000/uploadcsv/";
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("An Error occured", error);
    }
  };
  handleJsonSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(this.state);
      let form_data = new FormData();
      form_data.append("file", this.state.file, this.state.file.name);
      let url = "http://localhost:4000/uploadjson/";
      axios({
        method: "post",
        url: url,
        data: form_data,
        header: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("An Error occured", error);
    }
  };
  render() {
    return (
      <div className="App">
        <br />
        <br />
        <br />
        <form encType="multipart/form-data" onSubmit={this.handleCsvSubmit}>
          <div class="p-3 mb-2 bg-primary text-white">
            <p>
              Please upload a .csv file here for adding multiple patients
              <br />
              <div class="input-group mb-3">
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile02"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={this.handleCsvChange}
                />
                <label class="input-group-text" for="inputGroupFile02">
                  Upload
                </label>
              </div>
            </p>
          </div>
          <input type="submit" />
        </form>
        <br />
        <br />
        <br />
        <form onSubmit={this.handleJsonSubmit}>
          <div class="p-3 mb-2 bg-success text-white">
            <p>
              Please upload a .json file here for adding a single patient
              <br />
              <div class="input-group mb-3">
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile02"
                  accept="application/JSON"
                  onChange={this.handleJsonChange}
                />
                <label class="input-group-text" for="inputGroupFile02">
                  Upload
                </label>
              </div>
            </p>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}
