import React, { Component, useState } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormCheckbox } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import adminServices from '../services/adminServices'
import { required, number } from './validators';
import Tabs from './TabComponent/Tabs'

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';
const API_URL_NEW = `${process.env.REACT_APP_URL}` + 'api/';
class ProjectManag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      sid: "",   match :false, submitterName:"",submitterEmail:""

    };   
  }
  
  componentDidMount() {   
//this.setState(this.state.match=true)
const userName = JSON.parse(sessionStorage.getItem('user'));
console.log("username", userName)
this.setState({
  submitterName: userName.CREATED_BY,
  submitterEmail: userName.email
})

  }

  render() {

    // console.log("mydata", this.state.sid)

    return (

      <div>
        <center><h3>Project Management</h3></center>
        {/* <p>The Application is organized into different tabs. Each tab should be completed according to the instructions provided. All tabs should be completed before submitting the Application.</p>
        <p>SAVE: Pressing this button will save the information entered thus far.</p>
        <p>PREVIEW/SUBMIT: Pressing this button will allow you to preview/submit the information entered thus far.</p> */}

        <PanelBar>
          <PanelBarItem expanded={true} title={"Applicant Information"}>
            <FormGroup row>
              <Col xs="12" lg="12">
                <p>The Project Management tab allows the user to enter or edit the project managements’ roles. The applicant and person submitting information is pulled from other areas of the application process.</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Name:</p>
              </Col>
              <Col xs="12" lg="6">
                <p>Coachella Valley Housing Coalition</p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Department:</p>
              </Col>
              <Col xs="12" lg="6">
                <p></p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Address:</p>
              </Col>
              <Col xs="12" lg="6">
                <p>45-701 Monroe Street Ste G Indio, CA , 92201</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="12">
                <p>To edit Applicant information, click on the “Update Organization Profile” on the Main Menu. If submitting on behalf of another Organization, any edits to the Applicant organization profile must be submitted via email (FAAST_admin@waterboards.ca.gov).</p>
              </Col>

            </FormGroup>

          </PanelBarItem>
        </PanelBar>

        <PanelBar>
          <PanelBarItem expanded={true} title={"Person Submitting Information"}>
            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Submitter Name:</p>
              </Col>
              <Col xs="12" lg="6">
                <p>{this.state.submitterName}</p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Submitter :</p>
              </Col>
              <Col xs="12" lg="3">
                <p></p>
              </Col>
              <Col xs="12" lg="3">
                <p>Fax :</p>
              </Col>
              <Col xs="12" lg="3">
                <p></p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Phone:</p>
              </Col>
              <Col xs="12" lg="6">
                <p></p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                <p>Submitter Email:</p>
              </Col>
              <Col xs="12" lg="6">
                <p>{this.state.submitterEmail}</p>
              </Col>
            </FormGroup>


            <FormGroup row>
              <Col xs="12" lg="12">
                <p>To edit the information contained here, click on the “Update User Profile” on the Main Menu.</p>
              </Col>
            </FormGroup>
          </PanelBarItem>
        </PanelBar>
        <PanelBar>
          <PanelBarItem expanded={true} title={"PROJECT DIRECTOR AND PROJECT MANAGER"}>
            <p>Enter the contact information for the Project Director (including the confirm email), then:</p>
            {/* <p>1. Either click on the Project Manager = Project Director button; or Enter the contact information for the Project Manager (including the confirm email).</p> */}
            

            <div className="wrapper tableFixHead devbudget">
              <table className="table overviewtable table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Management Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Fax</th>
                    <th>Email</th>
                    <th>Confirm Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Project Director</td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pd_first_name"
                        // validator={required}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pd_last_name"
                        // validator={required}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pd_phone"
                        // validator={number}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pd_fax"
                        // validator={number}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pd_email"
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pd_cemail"
                      />
                    </td>

                  </tr>
                  <tr>
                    <td>Project Manager</td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pm_first_name"
                        // validator={required}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pm_last_name"
                        // validator={required}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pm_phone"
                        // validator={number}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pm_fax"
                        // validator={number}
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pm_email"
                      />
                    </td>
                    <td>
                      <Field component={FormInput}
                        type="text"
                        name="pm_cemail"
                      />
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

          </PanelBarItem>
        </PanelBar>


      </div>

    )
  }
}
export default ProjectManag