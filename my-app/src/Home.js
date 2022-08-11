import React, { Component } from "react";
import axios from "axios";
import "./Home.css";
import swal from "sweetalert";
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
          swal("Multiple Patient Medical Notes has been added successfully. Please view them in the Patient Data Section", {
            icon: "success",
          });
          console.log(res.data);
        })
        .catch((err) => swal("An Error occured", {
          icon: "error",
        }));
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
          swal("Single Patient Medical Note has been added successfully. Please view the data in the Patient Data Section", {
            icon: "success",
          });
          console.log(res.data);
        })
        .catch((err) => swal("An Error occured", {
          icon: "error",
        }));
    } catch (error) {
      ;
      console.log("An Error occured", error);
    }
  };
  render() {
    return (
      <div className="App">
        <br />
            <td>
            <p className="json">Import Medical Note for a Single Patient</p>
            <form onSubmit={this.handleJsonSubmit}>
              <div  id="json" className="p-3 mb-2 text-white">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                      accept="application/JSON"
                      onChange={this.handleJsonChange}
                    />
                  </div>
                  Only file with a .json extensions are accepted<br/>
              </div>
              <input type="submit" />
            </form>
            </td>
            <td>
            <p className="csv">Import Medical Note for Multiple Patient</p>
            <form encType="multipart/form-data" onSubmit={this.handleCsvSubmit}>
              <div id="csv" className="p-3 mb-2 bg text-white">
              
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={this.handleCsvChange}
                    />
                  </div>
                  Only file with a .csv extensions are accepted<br/>
              </div>
              <input type="submit" />
            </form>
            </td>
      </div>
    );
  }
}
