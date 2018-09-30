import React, { Component } from 'react'
import logo from './logo.svg';
import './main.css'
import Bubble from './burbuja';
import CompDB from './compDB';
import CompMainV from './compMainV';


class Main extends Component {
    render() {
        return (
        <div className="App">
            {/* Here goes all the components created */}
            <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">Kmeans</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#K">Kmeans</a></li>
            <li><a href="#DB">Data Base</a></li>
            <li><a href="#">Graphic</a></li>
          </ul>
        </div>
      </nav>  
      <CompMainV/> 
      <div className="col-sm-6">
      <Bubble />
      </div> 
      <CompDB/> 
        </div>
        )
    }
}

export default Main