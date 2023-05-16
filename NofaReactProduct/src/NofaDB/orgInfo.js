import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { required } from './validators';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
const API_URL_TEST = `${process.env.REACT_APP_URL}` + 'api/test/';
class OrgInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nofatab: [],
      nofa: [],
      nofalineitemtype: []
    };

  };

  componentDidMount() {
    console.log("Hello In")
    nofaServices.getNofalineItemsType().then(
      response => {
        console.log("Hello out")
        // window.scrollTo(0, 0)
        var nofalineitemtype = response.data.data;
        this.setState({ nofalineitemtype: nofalineitemtype })
      },
      error => {

      }
    );
    nofaServices.getNofa().then(
      response => {

        // window.scrollTo(0, 0)
        var nofa = response.data.data;
        console.log("nofa")
       
        this.setState({ nofa: nofa })
        console.log(this.state.nofa)
      },
      error => {

      }
    );
    nofaServices.getNofatabs().then(
      response => {
        console.log("Hello out")
        // window.scrollTo(0, 0)
        var nofatab = response.data.data;
        this.setState({ nofatab: nofatab })
      },
      error => {

      }
    );

  }
  render() {
  

    return (

      <div>
        <PanelBar>
          <PanelBarItem expanded={true} title={"Nofa Line Items"}>
            <FormGroup row>
              <Col lg="6">
                <Field
                  component={FormInput}

                  type="select"
                  name="name"
                  label="Name"
                />
              </Col>
              <Col lg="12">
                <Field
                  component={FormTextArea}

                  type="select"
                  name="des"
                  label="Description"
                />
              </Col>
             
              <Col lg="4">
               
                    <Field
                      component={FormDropDownList}
                      data={this.state.nofa}
                     
                      textField={"TITLE"}
                      dataItemKey={this.state.nofa.ID}
                      
                      type="text"
                      name={this.state.nofa.TITLE}
                      label="Nofa"
                    />
                  
              </Col>
 

              <Col lg="4">
                <Field
                  component={FormDropDownList}

                  type="text"
                  data={this.state.nofatab}
                      textField={"TAB_NAME"}
                      
                      dataItemKey={this.state.nofatab.ID}
                      
                      type="text"
                      name={this.state.nofatab.TAB_NAME}
                  label="Nofa Tabs"
                />
              </Col>

              <Col lg="4">
                <Field
                  component={FormDropDownList}

                  type="text"
                  data={this.state.nofalineitemtype}
                  textField={"TYPE"}
                  name={this.state.nofatab.TYPE}
                  dataItemKey={this.state.nofalineitemtype.ID}
                  label="Nofa Line Item Types"
                />
              </Col>

            </FormGroup>

          </PanelBarItem>
        </PanelBar>



      </div>
    )
  }


}

export default OrgInfo