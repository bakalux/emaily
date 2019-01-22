import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, (field) => {
      return (
        <Field
          component={ SurveyField }
          key={ field.name }
          label={ field.label }
          name={ field.name }
          type="text"
        />
      );
    });

  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit(values => { console.log(values) }) }>
          { this.renderFields() }
          <Link
            className="red btn-flat white-text"
            to="/surveys"
          >
            Cancel
          </Link>
          <button
            className="teal btn-flat right white-text"
            type="submit"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}

  errors.emails = validateEmails(values.emails || '');

  FIELDS.forEach(({ name }) => {
    if(!values[ name ]) {
      errors[ name ] = `You must provide ${name}`
    }
  });

  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm);
