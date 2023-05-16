import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormCheckbox, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { required } from './validators';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { pre_app_bool1: true };
    // this.onChange = this.onChange.bind(this);
  };
 

  // Handle the input change
  onChange = (event) => {
    const sidValue = sessionStorage.getItem('submissionId');
    if(sidValue == null){

    }else{
      this.setState({ data_value: event.target.value })
      const value = {
        data_value: event.target.value
      }
      console.log(value);
      nofaServices.updateFormData(sidValue, event.target.name, value).then(
        response => {
          console.log("project Info");
        },
        error => {
  
        }
      );
  
    }

  }
  render() {

    return (

      <div>
        <center><h3>Account Info</h3></center>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Pre-Screening Questions"}>
            <FormGroup row>

              <Col lg="6">
                <Field 
                  component={FormInput}
                  onChange={this.onChange}
                  type="text"
                  name="name"
                  label="Name"
                  validator={required} />
              </Col>
              <Col lg="6">
                <Field 
                  component={FormInput}
                  onChange={this.onChange}
                  type="text"
                  name="title"
                  label="Title"
                  validator={required} />
              </Col>
              <Col lg="6">
                <Field 
                  component={FormInput}
                  onChange={this.onChange}
                  type="text"
                  name="email"
                  label="Email"
                  validator={required} />
              </Col>
              <Col lg="6">
                <Field 
                  component={FormInput}
                  onChange={this.onChange}
                  type="text"
                  name="phone"
                  label="Phone"
                  validator={required} />
              </Col>
              
            </FormGroup>
          </PanelBarItem>
        </PanelBar>


      </div>
    )
  }
}

export default AccountInfo