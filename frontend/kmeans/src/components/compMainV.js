import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import {iris} from '../actions/index';
import { bindActionCreators } from 'redux';

class CompMainV extends Component {
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    )
  }
  onSubmit(values) {
   // this.loadCanvas()
    this.props.iris(values);
    //this.props.iris_data this is where the info is located once the promise has been completed
  }
  loadCanvas(){
    var width = 400,
    height = 400,
    buffer = new Uint8ClampedArray(width * height * 4);
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
          var pos = (y * width + x) * 4; // position in buffer based on x and y
      //    buffer[pos  ] = ...;           // some R value [0, 255]
       //   buffer[pos+1] = ...;           // some G value
       //   buffer[pos+2] = ...;           // some B value
       //   buffer[pos+3] = 255;           // set alpha channel
      }
  }
  }
  render() {
    const { handleSubmit } = this.props
    return (
      <div className="form-group col-sm-3">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="K"
            name="k"
            component={this.renderField} />
          <Field
            label="Props"
            name="opt"
            component={this.renderField} />
          <button type="submit" className="btn btn-primary"> Ok </button>

        </form>
        <div>
          <canvas id="canvas" />
        </div>
      </div>
    )
  }

}
function validate(values) {
  const errors = {};

  return errors;
}
function mapStateToProps(state){
  console.log(state)
  return {
    iris_data:state.kmeans
  }
}



export default reduxForm({
  validate,
  form: "KMeansForm"
})(connect(mapStateToProps, {iris})(CompMainV));