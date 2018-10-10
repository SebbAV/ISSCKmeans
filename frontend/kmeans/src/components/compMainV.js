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
    this.loadCanvas()
    this.props.iris(values);
    //this.props.iris_data this is where the info is located once the promise has been completed
  }
  loadCanvas(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 40;
    canvas.height = 30;
    var imgData = ctx.getImageData(0, 0, 40, 30);
    var data = imgData.data;

    // manipulate some pixel elements
    for (var i = 0; i < data.length; i += 4) {
        data[i] = 1; //red
        data[i+1] = 255; //green
        data[i+2] = 255; //blue
        data[i + 3] = 100; // make this pixel opaque
    }

    // put the modified pixels back on the canvas
    ctx.putImageData(imgData, 0, 0);

    // create a new img object
    var image = new Image();

    // set the img.src to the canvas data url
    image.src = canvas.toDataURL();
    document.body.appendChild(image);
    return (
      <div>
        
      </div>
    )
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
            name="props"
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