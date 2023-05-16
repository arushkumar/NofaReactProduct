import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';

class NofaFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nofatitle: null,
    }

  };
  componentDidMount() {
    const Title = sessionStorage.getItem('NofaTitle');
    this.setState({ nofatitle: Title })
  }
  render() {
    return (

      <div>
        <PanelBar>
          <PanelBarItem expanded={true} title={this.state.nofatitle}>

            <FormGroup row>
              <Col lg="12">
                <Field
                  name={"file_title"}
                  component={FormInput}
                  label={"Title"}
                />
              </Col>
            </FormGroup>

          </PanelBarItem>
        </PanelBar>
      </div>
    )
  }


}

export default NofaFiles