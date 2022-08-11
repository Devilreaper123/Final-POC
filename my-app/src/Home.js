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
            <p className="json">For Adding a Medical note for a Single patient</p>
            <form onSubmit={this.handleJsonSubmit}>
              <div  className="p-3 mb-2 bg-success text-white">
              Only files with a .Json extensions are accepted<br/>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                      accept="application/JSON"
                      onChange={this.handleJsonChange}
                    />
                  </div>
              </div>
              <input type="submit" />
            </form>
            </td>
            <td>
            <p className="csv">For Adding a Medical note for Multiple patient</p>
            <form encType="multipart/form-data" onSubmit={this.handleCsvSubmit}>
              <div className="p-3 mb-2 bg-primary text-white">
              Only files with a .Csv extensions are accepted<br/>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="inputGroupFile02"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={this.handleCsvChange}
                    />
                  </div>
              </div>
              <input type="submit" />
            </form>
            </td>
      </div>
    );
  }
}
