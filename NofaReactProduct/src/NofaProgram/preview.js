import React, { Component, useState } from 'react';
import { Form, Field , FormElement} from '@progress/kendo-react-form';
import { FormInput, FormTextArea, FormUpload } from './form-components';
import { PanelBar, PanelBarItem, Step } from "@progress/kendo-react-layout";
import { Col, FormGroup } from 'reactstrap';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import adminServices from '../services/adminServices';
import Tabs from './TabComponent/Tabs'
import PreviewMeasueTable from './PreviewMeasueTable';
import Swal from 'sweetalert2';
import OrgContactTable from './org-contactTable'
// import { useHistory } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';

class Preview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            sid: "",
            isDisabled: false,
            getAllData: [],
            userValue: "",
            userEmail: "",
            assemblyArr: [],
            filename: "",
            implementation: [],
            loader: false,
            ShowForm:false,


        };
    }

    componentDidMount() {
        this.setState({
            loader: true
            

        })
        // const partyid = this.state.loader  
        //  console.log("partyIDkkk",this.state.loader)
        //  console.log("prop id", this.props.match.params.id)
        const userNM = JSON.parse(sessionStorage.getItem('user'))
       
        this.setState({
            userValue: userNM.CREATED_BY,
            userEmail: userNM.email,
        })
        const datavalue = {
            party_id: this.props.match.params.id
        }

        adminServices.getAllDataByPartyIDIdAndRfpId(datavalue).then(
            response => {
                sessionStorage.setItem('RfpResponceID', response.data.RFPResponceId)
                const setValue = response.data;
                // console.log("setValue123", this.state.loader)
                this.setState({ getAllData: setValue })
                this.setState({
                    loader: false

                })

            },
            error => {

            }
        );
        const RFpResponceId = JSON.parse(sessionStorage.getItem('RfpResponceID'))
        // console.log("responce id", RFpResponceId)
        if (RFpResponceId === null || RFpResponceId === '') {

        } else {
            this.getFile = () => {
                this.setState({
                    loader: true

                })
                adminServices.getAttachementFile(RFpResponceId).then(
                    response => {
                        this.setState({
                            filename: response.data.data.filename,
                        });
                        this.setState({
                            loader: false,
                        });
                    },
                    error => {

                    }
                );
            };
            this.getFile();
            this.downloadFileCtrl = (e, fieldname) => {

                adminServices.downloadFiles(fieldname).then(
                    response => {
                        // window.open(API_URL + 'files/' + this.state.sid + '/' + fieldname + '/' +val);
                        this.getFile();
                    },
                    error => {

                    }
                );
            }


        }
        this.handleSubmitDeleteForm =(dataItem) =>{
            // console.log("value delete", dataItem.EnterText)
            const RfpResId = sessionStorage.getItem('RfpResponceID');
          
            if(dataItem.EnterText === 'DELETE'){
                console.log("ok delete")
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to delete this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                         axios.post(`${process.env.REACT_APP_URL}` + 'organization/desableApplicantOrg/' + this.props.match.params.id, {
                         headers: {
                        "Content-Type": "multipart/form-data",
                    },                   
                  
                })
                this.props.history.push("/nofa-create");

            }
            })
               
              
            }else{
                alert("Text Not Matched ")
            }

         }

        this.handleCloseDeleteForm =() =>{
            this.setState({ShowForm:false})
        }
        this.ShowDeleteForm = () => {
               
            // console.log("come in show")
            this.setState({ShowForm:true})
            // if(this.state.ShowForm){
            //     alert("windows open ")
            // }
        };

        this.backtonofa = () => {
            this.props.history.push("/nofa-create");
        };
    }
    render() {
        return (

            <div className='prviewcss'>
                <div className="">
                    <div className="position-relative row form-group">
                        <div className="col-lg-8">
                            <h4><i className="fa fa-bars" aria-hidden="true"></i> Preview</h4>
                        </div>
                        <div className="col-lg-4">
                        <a className="text-align-right btn-danger" onClick={() => this.ShowDeleteForm()}><i className="fa fa fa-ban" aria-hidden="true"></i> Delete </a>
                            <a className="text-align-right" onClick={() => this.backtonofa()}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a>
                           
                            </div>
                    </div>

                </div>
                <div className="row">
                    {this.state.loader ?
                        <div className="loader-wrapper">
                            <div className="loader"></div>
                        </div>
                        : <></>
                    }
                </div>

                <PanelBar>
                    <PanelBarItem expanded={true} title={"General Information"}>
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
                                <p><strong>Applicant Division:  </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>Outreach</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>

                            <Col xs="12" lg="3">
                                <p><strong>Submitting Organization:     </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>Transparent IT</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Submitting Division:     </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>Outreach</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Watershed    </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>{this.state.getAllData.watershed}</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>County   </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>{this.state.getAllData.project_county}</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Responsible Regional Water Board</strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>{this.state.getAllData.Responsible_Reg}</p>
                            </Col>
                        </FormGroup>

                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={true} title={"PROJECT BUDGET"}>


                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Funds Requested($):</strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                {this.state.getAllData.fund_request === 0 ? 0 : this.state.getAllData.fund_request}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Local Cost Match($): </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                {this.state.getAllData.local_cost === 0 ? 0 : this.state.getAllData.local_cost}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Total Budget($) : </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                {this.state.getAllData.total_budget === 0 ? 0 : this.state.getAllData.total_budget}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>DUNS Number : </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                {this.state.getAllData.duns_no === 0 ? 0 : this.state.getAllData.duns_no}
                            </Col>
                        </FormGroup>

                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={true} title={"Funding Program"}>
                        <FormGroup row>
                            <Col xs="12" lg="3">
                                <p><strong>Cleanup and Abatement Account Program : </strong></p>
                            </Col>
                            <Col xs="12" lg="6">
                                {this.state.getAllData.fund_request_check === true ? "Yes" : "No"}
                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Project Management Role"}>
                        <p>Project Director: Authorized Representative</p>
                        <p>Project Manager: Day to day contact</p>
                        <h3><strong>Applicant Information</strong></h3>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>Name: </strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                <p>Coachella Valley Housing Coalition</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Devision</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>Address</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                <p>45-701 Monroe Street Ste G Indio, CA , 92201 DUNS Number:     11</p>
                            </Col>
                        </FormGroup>

                        <h3><strong>Person Submitting Information</strong></h3>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Submitter Name:</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.userValue}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Submitter Phone:</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Submitter Fax:</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Submitter Email:</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.userEmail}
                            </Col>
                        </FormGroup>


                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Legislative Information"}>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>Legislative Information</strong></p>
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>Primary</strong></p>
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>Additional District(s)</strong></p>
                            </Col>
                            <Col xs="12" lg="4">
                                <p>Senate District</p>
                            </Col>
                            <Col xs="12" lg="4">
                                <p>{this.state.getAllData.senet_dist}</p>
                            </Col>
                            <Col xs="12" lg="4">

                                {this.state.getAllData.legislative_value ?
                                    <div>
                                        {this.state.getAllData.legislative_value.map((step, i) => (
                                            <a className="leg-space" key={step}>  {step.NAME}</a>
                                        ))}
                                    </div>
                                    : <></>}
                            </Col>

                            <Col xs="12" lg="4">
                                <p>Assembly District</p>
                            </Col>
                            <Col xs="12" lg="4">
                                <p>{this.state.getAllData.assembly_dist}</p>
                            </Col>
                            <Col xs="12" lg="4">

                                {this.state.getAllData.assembly_value ?
                                    <div>
                                        {this.state.getAllData.assembly_value.map((step, i) => (
                                            <a className="leg-space" key={step}>  {step.NAME}</a>
                                        ))}
                                    </div>
                                    : <></>}

                            </Col>
                            <Col xs="12" lg="4">
                                <p>US Congressional District</p>
                            </Col>
                            <Col xs="12" lg="4">
                                <p>{this.state.getAllData.us_cong_dist}</p>
                            </Col>
                            <Col xs="12" lg="4">

                                {this.state.getAllData.us_cong_value ?
                                    <div>
                                        {this.state.getAllData.us_cong_value.map((step, i) => (
                                            <a className="leg-space" key={step}>  {step.NAME}</a>
                                        ))}
                                    </div>
                                    : <></>}

                            </Col>

                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Contacts"}>
                        <FormGroup row>
                        <Col xs="12" lg="12">
                            <OrgContactTable tabledata = {"PreviewContactList"} />
                        
                         </Col>
                        </FormGroup>

                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Cooperating Entities"}>
                        <FormGroup row>
                            <Col xs="12" lg="12">
                                
                            <OrgContactTable tabledata = {"PreviewCooperatingList"} />
                            </Col>


                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Questionnaire - Phase 1"}>
                        <Col xs="12" lg="4">
                            <p><strong>Purpose of request:</strong></p>
                        </Col>
                        <Col xs="12" lg="8">
                            <p>{this.state.getAllData.purpose_of_request}</p>

                        </Col>
                        <Col xs="12" lg="4">
                            <p><strong>Background:</strong></p>
                        </Col>
                        <Col xs="12" lg="8">
                            <p>{this.state.getAllData.background}</p>

                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Has any portion of this project previously received funding through the Cleanup and Abatement account? If so, please provide the funding amount approved, Cleanup and Abatement #, and a brief description of the project.:</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.has_any_portion === true ? "Yes" : "No"}</p>
                            <Col xs="12" lg="6">
                                <p>{this.state.getAllData.cleanup_abatement}</p>
                            </Col>
                            <Col xs="12" lg="6">
                                <p>{this.state.getAllData.has_any_portion_area}</p>
                            </Col>

                        </Col>
                        <Col xs="12" lg="4">
                            <p><strong>Impact to community or surrounding areas with regards to water quality::</strong></p>
                        </Col>
                        <Col xs="12" lg="8">
                            <p>{this.state.getAllData.community_impact_area}</p>

                        </Col>
                        <Col xs="12" lg="4">
                            <p><strong>What waste is being addressed by this project?:</strong></p>
                        </Col>

                        <Col xs="12" lg="8">
                            <p>{this.state.getAllData.project_waste_area}</p>

                        </Col>
                        <Col xs="12" lg="4">
                            <p><strong>How do you plan to measure the water quality effectiveness of this project?:</strong></p>
                        </Col>

                        <Col xs="12" lg="8">
                            <p>{this.state.getAllData.project_waste_area}</p>

                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Are other funds available for this project? If yes, please describe.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.project_fund === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="12">
                            <p>{this.state.getAllData.project_fund_area}</p>
                        </Col>


                        <Col xs="12" lg="10">
                            <p><strong>Will any of these funds be used for Regional Board oversight? If yes, how much? Typically, CAA funds do not cover Regional Board oversight costs.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.regional_bord_fund_ans === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="8">
                            <p>{this.state.getAllData.project_fund_area}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Will any of these funds be used for Regional Board oversight? If yes, how much? Typically, CAA funds do not cover Regional Board oversight costs.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.regional_bord_fund_ans === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>List any responsible party:</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.responsible_party_area}</p>
                        </Col>

                        <h3><strong>What Program Preference(s) does your project fulfill?</strong></h3>
                        <Col xs="12" lg="10">
                            <p><strong>Preference 1: Emergency Cleanup Projects - Public Safety.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_1 === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Preference 2: Projects that address Disadvantaged Communities Environmental Justice Infastructure needs.:</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_2 === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Preference 3: Cleanup and/or abatement of 2006-listed water bodies that will help to implement a Total Maximum Daily Load (TMDL).</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_3 === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Preference 4: Cleanup and/or abatement of non-point source legacy pollutant (i.e Stormwater)when the source(s) of the pollution have been mitigated.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_4 === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Preference 5: Cleanup and/or abatement of pollution in high-use groundwater basins.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_5 === true ? "Yes" : "No"}</p>
                        </Col>
                        <h3><strong>What Program Preference(s) does your project fulfill?</strong></h3>
                        <Col xs="12" lg="10">
                            <p><strong>Preference 6: Cleanup and/or abatement of contaminated site when the viable responsible party has not been identified.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_6 === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Preference 7: Projects that promote habitat restoration through non-profit organizations that collaborate with the Regional Water Boards and encourage public outreach and education.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_7 === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Preference 8: Completion of a study/plan and/or monitoring addressing significant Statewide water quality problems.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.preference_8 === true ? "Yes" : "No"}</p>

                        </Col>
                        <p><strong>What Strategic Plan Goal(s) does your project fulfill?</strong></p>





                        Goal 5: Improve transparency and accountability by ensuring that Water Board goals and actions are clear and accessible, by demonstrating and explaining results achieved with respect to the goals and resources available, by enhancing and improving accessibility of data and information, and by encouraging the creating of organizations or cooperative agreements that advance this goal.
                        <Col xs="12" lg="10">
                            <p><strong>Goal 1: Implement strategies to fully support the beneficial uses for all 2006-listed water bodies by 2030.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_1 === true ? "Yes" : "No"}</p>

                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Goal 2: Improve and protect groundwater quality in high-use basins by 2030..</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_2 === true ? "Yes" : "No"}</p>

                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Goal 3: Increase sustainable local water supplies available for meeting existing and future beneficial uses by 1,725,000 acre-feet per year by 2015, and ensure adequate flows for fish and wildlife habitat.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_3 === true ? "Yes" : "No"}</p>

                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Goal 4: To comprehensively address water quality protection and restoration, and the relationship between water supply and water quality, and describe the connections between water quality, water quantity, and climate change, throughout California's water planning processes.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_5 === true ? "Yes" : "No"}</p>

                        </Col>

                        <h3><strong>What Strategic Plan Goal(s) does your project fulfill?</strong></h3>


                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_3 === true ? "Yes" : "No"}</p>

                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Goal 6: Enhance consistency across the Water Boards to ensure our processes are effective, efficient, and predictable, and to promote fair and equitable application of laws, regulations, policies, and procedures.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_6 === true ? "Yes" : "No"}</p>

                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Goal 7: Ensure that the Water Boards have access to information and expertise, including employees with appropriate knowledge and skills, needed to effectively and efficiently carry out the Water Boards' mission.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.goal_7 === true ? "Yes" : "No"}</p>

                        </Col>
                        <h3><strong> Your project is consistent with what Water Code Section(s)?</strong></h3>


                        <Col xs="12" lg="10">
                            <p><strong>Section 13442: State Water Board may order moneys to be paid from the CAA to a public agency with authority to cleanup or abate the effects of waste in order "to assist it in cleaning up the waste or abating its effects on the waters of the state"; or</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.section_13442 === true ? "Yes" : "No"}</p>

                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Section 13443: State Water Board may order moneys to be paid from the account to the Regional Water Board to assist it in attempting to remedy a significant unforeseen water pollution problem, posing an actual or potential public health threat, or is overseeing and tracking the implementation of a supplemental environmental project required as a condition of an order imposing administrative civil liability..</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.section_13443 === true ? "Yes" : "No"}</p>

                        </Col>


                        <Col xs="12" lg="10">
                            <p><strong>CEQA must be completed before the project can begin. Please choose the anticipate method of CEQA compliance below:.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.categorial_exempt === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Indicate the status of the environmental document in the drop box below. If the CEQA document is older than 5-years, please choose "Older than 5-yrs". Provide the estimated or known completion date in the second box, and if the CEQA document is complete, the Clearinghouse number. Example (clearinghouse number: 2009045843, document approved: 02/09/09).</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.havent_start === true ? "Yes" : "No"}</p>
                        </Col>
                        <h3><strong> If exempt, which exemption does your project meet?</strong></h3>




                        Other

                        <Col xs="12" lg="10">
                            <p><strong>15301 Existing Facilities: Consists of the operation, repair, maintenance, permitting, leasing, licensing, or minor alteration of existing public or private structures, facilities, mechanical equipment, or topographical features, inviliving negligible or no expansion of use beyond that existing at the time of the lead agency's determination..</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.consists_15301 === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>15302 Replacement of Reconstruction: Consists of replacement or reconstruction of existing structures and facilities where the new structure will be located on the same site as the structure replaced and will have substantially the same purpose and capacity as the structure replaced...</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.consists_15302 === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>15302 New Construction or Conversion of Small Structure: Consists of construction and location of limited numbers of new, small facilities or structures; installation of small new equipment and facilities in small structures; and the conversion of existing small structures from one use to another where only minor modifications are made in the exterior of the stuctures..</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.consists_15303 === true ? "Yes" : "No"}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>15304 Minor Alteration to Land: Consists of minor public or private alteration in the condition of land, water and/or vegitation which do not involove removal of healthy, mature, scenic trees except for forestry or agricultural purposes..</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.consists_15304 === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Other</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.other_list === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="8">
                            <p><strong>Answer</strong></p>
                        </Col>
                        <Col xs="12" lg="4">
                            <p>{this.state.getAllData.consists_area}</p>
                        </Col>

                        <Col xs="12" lg="10">
                            <p><strong>Does your project have Regional Board support (i.e. Resolution or Letter from Executive Officer)? If not, please provide an explanation.</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.does_your_proj === true ? "Yes" : "No"}</p>
                        </Col>
                        <Col xs="12" lg="10">
                            <p><strong>Have you attached a detailed Scope of Work, Project Budget, and Schedule with your application? If not, please provide an explanation..</strong></p>
                        </Col>
                        <Col xs="12" lg="2">
                            <p>{this.state.getAllData.have_you_attach === true ? "Yes" : "No"}</p>
                        </Col>
                    </PanelBarItem>

                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Attachments"}>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Attachment Title</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                File Name
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>{this.state.getAllData.project_attach}</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.filename ?
                                    <div className='filebord'>

                                        <div >
                                            <i className="fa fa-file" aria-hidden="true"></i>
                                            <a onClick={(e) => this.downloadFileCtrl(e, this.state.filename)} className="link"  >{this.state.filename}</a>

                                        </div>

                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Performance Measure Classification Data"}>
                        <FormGroup row>
                            <Tabs>
                                <div label="Purpose">
                                    <PreviewMeasueTable data={"Purpose"} />
                                </div>
                                <div label="Waterbody">
                                    <PreviewMeasueTable data={"Waterbody"} />
                                </div>
                                <div label="Land use">
                                    <PreviewMeasueTable data={"Land Use"} />
                                </div>
                                <div label="Site Condition">
                                    <PreviewMeasueTable data={"Site Condition"} />
                                </div>
                                <div label="Implementation">
                                    <PreviewMeasueTable data={"Implementation"} />
                                </div>
                                <div label="TMDL">
                                    <PreviewMeasueTable data={"TMDL"} />
                                </div>
                                <div label="BMPs">
                                    <PreviewMeasueTable data={"BMPs"} />
                                </div>
                                <div label="Sampling">
                                    <PreviewMeasueTable data={"Sampling"} />
                                </div>
                                <div label="Comments">
                                    <PreviewMeasueTable data={"Comments"} />
                                </div>


                            </Tabs>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <Modal  show={this.state.ShowForm} onHide={this.handleCloseDeleteForm} centered>
                <Modal.Header closeButton>
                            <Modal.Title> Delete Submission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <Form
                                        onSubmit={this.handleSubmitDeleteForm}
                                        render={(formRenderProps) => (
                                            <FormElement
                                                style={{
                                                    maxWidth: 650,
                                                }}
                                            >
                                                <fieldset className={"k-form-fieldset"}>

                                                    <FormGroup row>

                                                        <Col lg="12">
                                                            <Field
                                                                name={"EnterText"}
                                                                // type={"textarea"}
                                                                component={FormInput}
                                                                label={"Please Enter DELETE"}

                                                            />
                                                        </Col>
                                                    </FormGroup>                                                    
                                                </fieldset>
                                                <div className=" btn123">
                                                    <button className=" fourth btn btn-primary"
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
                            </Modal.Body>
                </Modal>

            </div>
              
           
        )
    }
}

export default Preview