import React, { Component, useState } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormAutoComplete, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { CooperatingRole } from './data';
import { Col, FormGroup } from 'reactstrap';
import { required } from './validators';
import OrgContactTable from './org-contactTable'

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';
import adminServices from '../services/adminServices'

class CooperatingEntities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",         
        };
    }
handleChangeRole = (event) =>{
    const coopId = event.value;
    console.log("coope", coopId)

}
    componentDidMount() {       

    }

    render() {

        // console.log("My id", this.state.sid)
        return (

            <div>
            <center><h3>Cooperating Entities</h3></center>
            <p>The Cooperating Entities tab allows the user to add or view/edit information previously entered. This tab is used to record the person/organization who was or will be contacted regarding this Project. To edit an existing contact, please select the name of the organization link. Changes made must be saved by clicking on the “Save Contact” button.</p>

            <PanelBar>
                <PanelBarItem expanded={true} title={"#"}>

                    <FormGroup row>
                        <Col xs="12" lg="6">
                            <Field component={FormInput}
                                type="text"
                                name="co_org_name"
                                label="Cooperating Entity"
                                validator={required}
                            />
                        </Col>
                        <Col xs="12" lg="6">
                            <Field component={FormAutoComplete}
                                type="text"
                                name="role_contribution"
                                label="Role/Contribution to Project"
                                onChange={this.handleChangeRole}
                                value={this.state.value}
                                data={CooperatingRole}
                                textField="TYPE"
                                dataItemKey="ID"
                                placeholder="Select a Value..."
                            />
                        </Col>
                        <Col xs="12" lg="6">
                            <Field component={FormInput}
                                type="text"
                                name="co_first_name"
                                label="First Name"
                                validator={required}
                            />
                        </Col>
                        <Col xs="12" lg="6">
                            <Field component={FormInput}
                                type="text"
                                name="co_last_name"
                                label="Last Name"
                                validator={required}
                            />
                        </Col>
                        <Col xs="12" lg="6">
                            <Field component={FormInput}
                                type="text"
                                name="co_cotect_ph"
                                label="Phone"
                                validator={required}
                            />
                        </Col>
                        <Col xs="12" lg="6">
                            <Field component={FormInput}
                                type="text"
                                name="co_email"
                                label="Email"
                                validator={required}
                            />
                        </Col>
                    </FormGroup>
                    <OrgContactTable tabledata = {"CoopratingList"} />
                </PanelBarItem>
            </PanelBar>

          
        </div>
        )
    }
}
export default CooperatingEntities