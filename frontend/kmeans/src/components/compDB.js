import React, { Component } from 'react';

class CompDB extends Component {
    render() {
      return (
        <div id="DB" className="col-sm-3">
          <label  htmlFor="Sel1">Select Data Base (select one):</label>
          <select className="form-control" id="sel1">
          <option>iris plant</option>
          <option>other</option>
          </select>
          <br/>
          <input type="submit" className="btn btn-info btn-md " value="OK"/>

          </div>        
      )
    }
  }

export default CompDB;