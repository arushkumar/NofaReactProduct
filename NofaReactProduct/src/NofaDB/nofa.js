import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';

class Nofa extends Component {
  constructor(props) {
    super(props);
    this.state ={
      nofatitle:null,

    };

  };
  componentDidCatch(){

  }
 

  render() {
    return (

      <div>
        <PanelBar>
          <PanelBarItem expanded={true} title={"Create Nofa"}>
           
            <FormGroup row>
              <Col lg="12">
                <Field
                  name={"title"}
                  component={FormInput}
                  label={"Title"}
                />
              </Col>
            </FormGroup>

            <FormGroup row>

              <Col lg="12">
                <Field
                  name={"desc"}
                  type={"textarea"}
                  component={FormTextArea}
                  label={"Description"}

                />
              </Col>
            </FormGroup>

          </PanelBarItem>
        </PanelBar>



      </div>
    )
  }


}

export default Nofa