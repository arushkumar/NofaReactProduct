import React, { Component, useState } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Col, FormGroup } from 'reactstrap';
import { required } from './validators';
import adminServices from '../services/adminServices'
import OrgContactTable from './org-contactTable'

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            PContacts:[],
        };
        this.ContactList = this.ContactList.bind(this)
    }
    ContactList =()=>{
        const RfpResponceId = sessionStorage.getItem('RfpResponceID');
        const datavalue ={
            rfp_responce_id:RfpResponceId
        }
        adminServices.getAllProjectContactbyRespID(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ PContacts: list })
                console.log("Contact data", list)
            },
            error => {
            }
        );
    }

    componentDidMount() {

    }

    render() {
      
        return (

            <div>
                <center><h3>Contact</h3></center>
                <p>The Contacts tab allows the user to add or view/edit information previously entered. This tab is used to record the person/organization who was or will be contacted regarding this Project. To edit an existing contact, please select the name of the organization link. Changes made must be saved by clicking on the “Save Contact” button.</p>

                <PanelBar>
                    <PanelBarItem expanded={true} title={"Contact"}>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormInput}
                                    type="text"
                                    name="cont_org_name"
                                    label="Organization Name"
                                    validator={required}
                                />
                            </Col>
                            <Col xs="12" lg="6">
                                <Field component={FormInput}
                                    type="text"
                                    name="cont_first_name"
                                    label="First Name"
                                    validator={required}
                                />
                            </Col>
                            <Col xs="12" lg="6">
                                <Field component={FormInput}
                                    type="text"
                                    name="cont_last_name"
                                    label="Last Name"
                                    validator={required}
                                />
                            </Col>
                            <Col xs="12" lg="6">
                                <Field component={FormInput}
                                    type="text"
                                    name="cont_phone"
                                    label="Phone"
                                    validator={required}
                                />
                            </Col>
                            <Col xs="12" lg="6">
                                <Field component={FormInput}
                                    type="text"
                                    name="cont_email"
                                    label="Email"                                    
                                />
                                
                            </Col>
                        </FormGroup>

                        <OrgContactTable tabledata = {"ContactList"} />
                    </PanelBarItem>
                </PanelBar>

               
            </div>
        )
    }
}
export default Contact