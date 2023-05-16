import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormAutoComplete, FormInput, FormCheckbox } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { required, email, number } from './validators';
import { Col, FormGroup } from 'reactstrap';
import { counties } from './data';
import adminServices from '../services/adminServices';

class Funding extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };

  };  
  
  componentDidMount() {
    
  }
  

  render() {
    let { onBlur, onFocus, onChange, value, ...props } = this.props;

    return (

      <div>
        <center><h3>Funding Program(s)</h3></center>
       

        <PanelBar>
          <PanelBarItem expanded={true} title={"Funding"}>
          <p>Please select a program or multiple programs by checking the "Apply" box below. Checking the apply box triggers the display of questions specific to a program or multiple programs in the Questionnaire tab.
          Note: Typically, only one (1) program is checked. However, for select RFPs, two (2) or more programs can be checked.</p>
            <div className="wrapper tableFixHead devbudget">
              <table className="table overviewtable table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Funding Program</th>
                    <th>Description</th>
                    <th>Funding Amount Range</th>
                    <th>Apply?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cleanup and Abatement Account Program</td>
                    <td>Created by Water Code Sections 13440-13443 to provide public agencies with grants for the cleanup or abatement of a condition of pollution when there are no viable responsible parties available to undertake the work.</td>
                    <td>0.00 - 999,999,999.00</td>
                    <td>
                      <Field component={FormCheckbox}
                        type="checkbox"
                        name="fund_request_check"
                      
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

export default Funding