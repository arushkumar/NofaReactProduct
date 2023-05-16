import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormCheckbox, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { required } from './validators';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
const API_URL_TEST = `${process.env.REACT_APP_URL}` + 'api/test/';
class NofaItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nofatab: [],
      nofa: [],
      nofalineitemtype: [],
      nofatitle:null,
    };

  };
  onChange = (event) => {

    console.log(event.target.value.ID)
    
    this.setState({ data_value: event.target.value })
    const value = {
      data_value: event.target.value
    }
   

  }

  componentDidMount() {
    const Title = sessionStorage.getItem('NofaTitle');
          
    this.setState({nofatitle:Title })
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
          <PanelBarItem expanded={true} title={this.state.nofatitle}>
            <FormGroup row>

              <Col lg="4">

                <Field

                  name="nofa"
                  component={FormDropDownList}
                  value={this.state.nofa.ID}
                  onChange={this.onChange}
                  label={"Nofa"}
                  data={this.state.nofa}
                  textField={"TITLE"}
                  dataItemKey={'ID'}

                />

              </Col>


              <Col lg="4">
                <Field
                  // name={this.state.nofatab.TAB_NAME}
                  name="nofatab"
                  component={FormDropDownList}
                  onChange={this.onChange}
                  type="text"
                  data={this.state.nofatab}
                  textField={"TAB_NAME"}
                  dataItemKey={"ID"}
                  label="Nofa Tabs"
                />
              </Col>

              <Col lg="4">
                <Field
                  name="nofaLineItemType"
                  component={FormDropDownList}
                  onChange={this.onChange}
                  type="text"
                  data={this.state.nofalineitemtype}
                  textField={"TYPE"}
                  dataItemKey={'ID'}
                  label="Nofa Line Item Types"
                />
              </Col>

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
                  name="discription"
                  label="Description"
                />
              </Col>
              <Col lg="12">
                <Field
                  component={FormCheckbox}

                  type="select"
                  name="required"
                  label="Required"
                />
              </Col>


            </FormGroup>

          </PanelBarItem>
        </PanelBar>



      </div>
    )
  }


}

export default NofaItems