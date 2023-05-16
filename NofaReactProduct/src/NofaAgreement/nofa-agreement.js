import React, { useState, useEffect } from "react";
import adminServices from '../services/adminServices';

import { Agreement } from './data';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import {
    FormTextArea,
    FormDatePicker,
    FormInput,
    FormAutoComplete,
} from "./form-components";
import { Col, FormGroup } from "reactstrap";


import moment from "moment";

import TestSignature from './TestSignature'

const NofaAgreement = (props) => {
    // const [OrgName, setOrgName] = useState(props.match.params.name)
    const[partyId , setPartyId] = useState(props.match.params.id)

    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));

    useEffect(() => {
        //    console.log("project name", partyId)
    }, [])

    const handleSubmit = (dataItem) => {
        // alert(JSON.stringify(dataItem, null, 2));
        console.log("dataitem",dataItem)
        console.log("partyId",partyId)
        console.log("Nofid",Nofid)

        var AgencyDate =  moment(dataItem.agency_agreement_date).utc().format('yyyy-MM-DD hh:mm:ss')
        var ContractorDate =  moment(dataItem.contractor_agreement_date).utc().format('yyyy-MM-DD hh:mm:ss')

        // console.log("date adta", Sdata)
        const valueItem = {
            Party_id: partyId,
            nofa_id: Nofid,
            Agency_Name : dataItem.state_agency_name,
            Line_Item_Text: dataItem.agreement_contractor,
            Agreement_Party_role: dataItem.Agreement_term,
            Agreement_amount: dataItem.agreement_amount,
            Agreement_NO: '16-NDA-1658',                
            Agreement_Item_Party_role: "Attachement",
            Nofa_Agree_Addess: dataItem.contractor_add,
            Nofa_AgreementDate: dataItem.contractor_agreement_date,
            Nofa_AgreementItemDate: dataItem.agency_agreement_date,
            Nofa_Agree_Item_Addess: dataItem.agency_add,
        }
        
        adminServices.createAgreement(valueItem).then(
            (response) => {
                // var nofa = response.data.data;
                //alert("Nofa saved successfully")
                // setNofa(nofa)
            },
            (error) => { }
        );
    };

    return (
        <div className="container">
            <div className="AB434-CSS12">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <h1 className="headsec">CREATE AGREEMENT</h1>
                        </div>
                    </div>
                </div>
                <div className="AB434-CSS">
                    <div className="row">
                        <div className="col-md-9 offset-md-2">
                            <Form
                                onSubmit={handleSubmit}
                                render={(formRenderProps) => (
                                    <FormElement
                                        style={{
                                            maxWidth: 650,
                                        }}
                                    >
                                        <FormGroup row>
                                            <Col lg="12">
                                                <p>
                                                    1. This Agreement is entered into between the State
                                                    Agency and the Contractor named below
                                                </p>
                                            </Col>
                                            <Col lg="12">
                                            <Field
                                                    name={"state_agency_name"}
                                                    component={FormInput}
                                                  label={"STATE AGENCY NAME"}
                                                />
                                                {/* <p></p>
                                                <strong>
                                                    <p>Department Of Housing</p>
                                                </strong> */}
                                            </Col>
                                            <Col lg="12">
                                            <Field
                                                    name={"agreement_contractor"}
                                                    component={FormInput}
                                                  label={"CONTRACTOR'S NAME"}
                                                />
                                                
                                                {/* <strong>
                                                    <p>{OrgName}</p>
                                                </strong> */}
                                            </Col>
                                        </FormGroup>

                                        <FormGroup row>
                                           
                                            <Col lg="12">
                                                <Field component={FormAutoComplete}

                                                    type="text"
                                                    name="Agreement_term"
                                                     label="2. The terms of this Agreement is"
                                                    data={Agreement}
                                                    placeholder="Start typing..."
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                           
                                            <Col lg="12">
                                                <Field
                                                    name={"agreement_amount"}
                                                    component={FormInput}
                                                   label={"3. The maximum amount of this Agreement is"}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col lg="12">
                                                <p>4. The Parties agree to comply with the terms and conditions  of the following exhibits which are by this reference made a part of the Agreement </p>

                                            </Col>
                                            <Col lg="12">
                                                <p>Exhibit A -            Authority -Purpose of Scope of work</p>
                                                <p>Exhibit B -            Budget Detail and Payment Provisions</p>
                                                <p>Exhibit A -           State of California genral terms and conditions</p>
                                            </Col>
                                        </FormGroup>
                                        <fieldset className={"k-form-fieldset"}>
                                            <p>IN WITNESS WHEREOF ,this Agreement has been execute by the parties </p>
                                            <FormGroup row>
                                                <Col lg="12">
                                                  <b><p className="pstyle">CONTRACTOR</p></b>
                                                </Col>
                                                <Col lg="6">
                                                    <Field key={'contractor_Signatory'}
                                                        id={'contractor_Signatory'}
                                                        name={'contractor_Signatory'}
                                                        label={'Signature'}
                                                        component={TestSignature}
                                                    />
                                                </Col>
                                                <Col lg="6">
                                                    <Field
                                                        name={"contractor_agreement_date"}
                                                        type={"textarea"}
                                                        component={FormDatePicker}
                                                        format={"dd-MM-yyyy"}
                                                        label={"Agreement Date"}
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                              
                                                <Col lg="12">
                                                    <Field
                                                        name={"contractor_printed_signing"}
                                                        type={"textarea"}
                                                        component={FormInput}
                                                    label={"PRINTED NAME AND TITLE OF PERSON SIGNING"}
                                                    />
                                                </Col>
                                               
                                                <Col lg="12">
                                                    <Field
                                                        name={"contractor_add"}
                                                        type={"textarea"}
                                                        component={FormTextArea}
                                                    label={"ADDRESS"}
                                                    />
                                                </Col>

                                            </FormGroup>

                                            <FormGroup row>
                                                <Col lg="12">
                                                  <b><p className="pstyle">STATE OF CALIFORNIA</p></b>
                                                </Col>
                                                <Col lg="6">
                                                    <Field key={'agency_Signatory'}
                                                        id={'agency_Signatory'}
                                                        name={'agency_Signatory'}
                                                        label={'Signature'}
                                                        component={TestSignature}
                                                    />
                                                </Col>
                                                <Col lg="6">
                                                    <Field
                                                        name={"agency_agreement_date"}
                                                        type={"textarea"}
                                                        component={FormDatePicker}
                                                        // format={"dd-MM-yyyy"}
                                                        label={"Agreement Date"}
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>
                                                
                                                <Col lg="12">
                                                    <Field
                                                        name={"agency_printed_signing"}
                                                        type={"textarea"}
                                                        component={FormInput}
                                                     label={"PRINTED NAME AND TITLE OF PERSON SIGNING"}
                                                    />
                                                </Col>
                                              
                                                <Col lg="12">
                                                    <Field
                                                        name={"agency_add"}
                                                        type={"textarea"}
                                                        component={FormTextArea}
                                                    label={"ADDRESS"}
                                                    />
                                                </Col>

                                            </FormGroup>
                                        </fieldset>
                                        <div className=" btn123">
                                            <button
                                                className=" fourth btn btn-primary"
                                                type={"submit"}
                                                disabled={!formRenderProps.allowSubmit}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </FormElement>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NofaAgreement;