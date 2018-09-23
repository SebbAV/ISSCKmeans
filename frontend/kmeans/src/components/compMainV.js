import React, { Component } from 'react';

class CompMainV extends Component {
    render() {
      return (
        <div id="K" className="col-sm-3">
        <label  htmlFor="KIn">K</label>
        <input className="form-control" id="KInput" type="text"/>
        <label  htmlFor="PropIn">Prop</label>
        <input className="form-control" id="PropInput" type="text"/>
        </div>   
      )
    }
  }

export default CompMainV;