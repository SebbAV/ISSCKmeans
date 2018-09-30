import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';

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
  onSubmit() {

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
      </div>
    )
  }

}
function validate(values) {
  const errors = {};

  return errors;
}


export default reduxForm({
  validate,
  form: "KMeansForm"
})(connect(null, null)(CompMainV));