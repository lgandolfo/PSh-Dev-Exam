import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { render } from '@testing-library/react';
import { Button } from '@material-ui/core';
import {CSVLink, CSVDownload} from 'react-csv';

class App extends Component{
    constructor(props){
      super(props)
      this.state = {
        data: []
    };
    }

    callApi(){
      fetch("http://localhost:9000")
      .then(res => res.json())
      .then(data => {
      let iterableResponse = Object.values(data);
      iterableResponse.map(item => console.log(item));
      this.setState({data: iterableResponse});
      this.intervalID = setTimeout(this.callApi.bind(this), 10000);});
    }

    componentDidMount(){
      this.callApi();
    }

    comvertToDate(time){
      return new Date(time);
    }

render(){

  return (
    <React.Fragment>
    <TableContainer component={Paper}>
    <Table  width="100%" aria-label="simple table">
      <TableHead>
        <TableRow bgcolor="#11d996">
          <TableCell>ID</TableCell>
          <TableCell align="center">Nickname</TableCell>
          <TableCell align="center">Score</TableCell>
          <TableCell align="center">Timestamp</TableCell>
        </TableRow>
      </TableHead>
      <TableBody bgcolor="#d0d9d6">
        {this.state.data.map((player) => (
            <TableRow key={player.id}>
            <TableCell component="th" scope="row">{player.id}</TableCell>
            <TableCell align="center">{player.nickname}</TableCell>
            <TableCell align="center">{player.puntos}</TableCell> 
            <TableCell align="center">{player.fecha_creacion}</TableCell> 
          </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
  
  <CSVLink class="button" data={this.state.data}  >Download File</CSVLink>

  </React.Fragment>
  );
  }
}
export default App;
