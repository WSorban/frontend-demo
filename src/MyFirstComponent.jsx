import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import axios from "axios";

class MyFirstComponent extends React.Component {
  state = {
    myTextFieldValue: "Dummy name",
    names: []
  };

  componentDidMount = () => {
    this.getStudent();
  };

  getStudent = () => {
    axios.get("https://localhost:8085/rest/students")
    .then(
        (response) => {
          let names = response.data.map(data =>
            data.name
          );
          this.setState({names: names});
          console.log(response);
        }
    )
    .catch(function(error) {
      console.log(error);
    })
  };

  addStudent = (student) => {
    axios.post("http://localhost:8085/rest/class/1/student",
        student)
      .then(
          function(response) {
            console.log(response);
          }
      )
      .catch(function(error) {
        console.log(error);
      })
  };

  buttonClickAction = () => {
    //this is an arrow function
    console.log("You clicked me");
    let myObjectBeStringified = JSON.stringify(this.state);
    console.log(myObjectBeStringified);
    let myStringBeObjectified = JSON.parse(myObjectBeStringified);
    console.log(myStringBeObjectified); //we did a deep clone here
    let names = Object.assign([], this.state.names); //we did a shallow clone here
    names.push(this.state.myTextFieldValue);
    let student = {
      name: this.state.myTextFieldValue
    };
    this.addStudent(student);

    this.setState({ myTextFieldValue: "", names: names });
  };

  handleTextFieldChange = event => {
    this.setState({ myTextFieldValue: event.target.value });
    console.log(event.target.value);
    console.log("Text field has changed!");
  };

  render() {
    console.log(this.state.names);
    return (
      <div>
        <div>HelloWorld</div>

        <TextField
          required
          error={!this.state.myTextFieldValue}
          label={"Name"}
          onChange={this.handleTextFieldChange}
          value={this.state.myTextFieldValue}
          helperText={"Name is always a must!"}
        />

        <Button
          onClick={this.buttonClickAction}
          disabled={!this.state.myTextFieldValue}
        >
          Submit
        </Button>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Names</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.names.map(name => (
                <TableRow key={name}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default MyFirstComponent;
