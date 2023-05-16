import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormInput, FormAutoComplete , FormDropDownList } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { counties, watershed, RegionalWater } from './data';
import { required } from './validators';
import { Col, FormGroup } from 'reactstrap';
import adminServices from '../services/adminServices';

const yesno = ["Yes", "No"]

class generalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pre_app_bool1: "" ,
       county:[],
       waterShed:[],
       waterBord:[],
      };
    this.onMapClick = this.onMapClick.bind(this);
    this.CountyList = this.CountyList.bind(this);
    this.waterBordList = this.waterBordList.bind(this);
  };

  onMapClick = () => {
    console.log("Map Operate")
  }

  CountyList = () => {
    // console.log("Map Operate")
    adminServices.getCounty().then(
      response => {
          var list = response.data.data;
          this.setState({ county: list })
          console.log("alldata",list)
      },
      error => {
      }
  );
  }
  waterBordList = () => {
    // console.log("Map Operate")
    adminServices.getWaterBoardList().then(
      response => {
          var list = response.data.data;
          this.setState({ waterBord: list })
          
      },
      error => {
      }
  );
  }

  componentDidMount() {   
    this.CountyList();
    this.waterBordList();
    this.onMapClick();
  }


  render() {
    
    return (

      <div>
        <center><h3>Genral Information</h3></center>
      
        <PanelBar>
          <PanelBarItem expanded={true} title={"Genral Information"}>
            <FormGroup row>
              <Col xs="12" md="12">
                <p>The “General Information” tab allows the user to enter a project title, project description, and location information for the project.</p>
              </Col>
            </FormGroup>
            <FormGroup row>

              <Col xs="12" md="3">
                <p><strong>RFP Title:</strong></p>
              </Col>
              <Col xs="12" lg="6">
                <p>Cleanup and Abatement Account</p>
              </Col>

            </FormGroup>

            <FormGroup row>

              <Col xs="12" lg="3">
                <p><strong>Applicant Organization:</strong></p>
              </Col>
              <Col xs="12" lg="6">
                <p>Coachella Valley Housing Coalition</p>
              </Col>
            </FormGroup>

            <FormGroup row>

              <Col xs="12" lg="3">
                <p><strong>Applicant Division:	</strong></p>
              </Col>
              <Col xs="12" lg="6">
                <p>Outreach</p>
              </Col>
            </FormGroup>

            <FormGroup row>

              <Col xs="12" lg="3">
                <p><strong>Submitting Organization:		</strong></p>
              </Col>
              <Col xs="12" lg="6">
                <p>Transparent IT</p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="3">
                <p><strong>Submitting Division:		</strong></p>
              </Col>
              <Col xs="12" lg="6">
                <p>Outreach</p>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col xs="12" lg="6">
                <Field component={FormInput}
                  type="text"
                  name="project_title"
                  label="Project Title"
                  validator={required}
                  required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="12">
                <Field component={FormTextArea}
                 
                  name="project_desc"
                  type="textarea"
                  label="Project Description"
                  validator={required}
                  required />
              </Col>
            </FormGroup>
            {/* <FormGroup row>
              <Col xs="12" lg="12">
                <h3><strong>PROJECT LOCATION</strong></h3>
              </Col>
            </FormGroup> */}
            <FormGroup row>

              <Col xs="12" lg="6">
                <Field component={FormAutoComplete}
                  value={this.state.value}
                  onChange={this.onChange}
                  type="text"
                  name="watershed"
                  label="Watershed"
                  data={watershed}
                  placeholder="Start typing..."
                />
              </Col>
              <Col xs="12" lg="6">
                <Field component={FormAutoComplete}
                  value={this.state.value}
                  onChange={this.onChange}
                  type="text"
                  name="project_county"
                  label="County"                  
                  data={this.state.county}
                  textField={"COUNTY_NAME"}
                  dataItemKey={"STATES_ID"}
                  placeholder="Start typing..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="12" lg="6">
                <Field component={FormAutoComplete}
                  value={this.state.value}
                  onChange={this.onChange}
                  type="text"
                  name="Responsible_Reg"
                  label="Responsible Regional Water Board"
                  data={this.state.waterBord}
                  textField={"WATER_BOARD_NAME"}
                  dataItemKey={"ID"}
                  placeholder="Start typing..."
                  validator={required}
                  required />
              </Col>
            </FormGroup>


          </PanelBarItem>
        </PanelBar>


      </div>
    )
  }
}

export default generalInfo