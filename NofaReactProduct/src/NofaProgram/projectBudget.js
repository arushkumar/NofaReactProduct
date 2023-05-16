import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormCheckbox, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Col, FormGroup } from 'reactstrap';
import { oneRequired, required } from './validators';
import adminServices from '../services/adminServices';
import { Checkbox } from '@progress/kendo-react-inputs';

class ProjectBudget extends Component {
  constructor(props) {
    super(props);
  };
  state = {
    data_value: "",
    value: false,
  };
 
  

  render() {

    return (

      <div>
        <center><h3>Project Budget</h3></center>
        {/* <p>The Application is organized into different tabs. Each tab should be completed according to the instructions provided. All tabs should be completed before submitting the Application.</p>
        <p>SAVE: Pressing this button will save the information entered thus far.</p>
        <p>PREVIEW/SUBMIT: Pressing this button will allow you to preview/submit the information entered thus far.</p> */}

        <PanelBar>
          <PanelBarItem expanded={true} title={"Project Budget"}>
            <FormGroup row>

              <Col xs="12" lg="12">
                <p>The “Project Budget” tab allows the user to enter budget information for the project.</p>
              </Col>
            </FormGroup>
            <FormGroup row>

              <Col xs="12" lg="6">
                <Field component={FormInput}
                  type="text"
                  name="fund_request"
                  label="Funds Requested($)"
                />
              </Col>
              <Col xs="12" lg="6">
                <Field component={FormInput}
                  type="text"
                  name="local_cost"
                  label="Local Cost Match($)"
                />
              </Col>
              <Col xs="12" lg="6">
                <Field component={FormInput}
                  type="text"
                  name="total_budget"
                  label="Total Budget($)"
                />
              </Col>


            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field component={FormInput}
                  type="text"
                  name="duns_no"
                  label="DUNS Number"
                />
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>


      </div>
    )
  }
}

export default ProjectBudget