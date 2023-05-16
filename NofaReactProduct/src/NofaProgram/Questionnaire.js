import React, { Component } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormTextArea, FormInput, FormCheckbox, FormNumericTextBox, FormInputQues } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Attachments } from './data';
import { Col, FormGroup } from 'reactstrap';
import { quesnumber, abb } from './validators';
import { Link } from "react-router-dom";

//import Popup from './Popup'

import {
    BrowserRouter as Router, Route
} from "react-router-dom";

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';
import adminServices from '../services/adminServices'

class Questionnaire extends Component {
    constructor(props) {
        super(props);

    };
    state = {
        data_value: "",
        value: false,
    };
    // Handle the input change
    onChange = (event) => {

        this.handleClick();
        const RfpResponceId = sessionStorage.getItem('RfpResponceID');
        this.setState({ data_value: event.target.value })
        const value = {
            data_value: event.target.value
        }
        console.log("datavalue", event.target.name)
        // console.log("target name",event.target.name)
        const datavalue = {
            rfp_responce_id: RfpResponceId,
            questions: event.target.name,
            ans1: event.target.value
        }
        adminServices.createQuestionnaire(datavalue).then(
            response => {
                console.log(response);
            },
            error => {

            }
        );
        if(event.target.name === 'has_any_portion'){
            if(event.target.value == false){
                // console.log('delete text') 
                const datavalue = {
                    rfp_responce_id: RfpResponceId,
                    questions: 'cleanup_abatement',                   
                  }
                  adminServices.updateQuestionnaire(datavalue).then(
                    response => {
                      console.log(response);
                    },
                    error => {
      
                    }
                  );
                  const datavalue2 = {
                    rfp_responce_id: RfpResponceId,
                    questions: 'has_any_portion_area',                   
                  }
                  adminServices.updateQuestionnaire(datavalue2).then(
                    response => {
                      console.log(response);
                    },
                    error => {
      
                    }
                  );                  
            }
        }
        else if(event.target.name === 'project_fund'){
            if(event.target.value == false){
                // console.log('delete text') 
                const datavalue = {
                    rfp_responce_id: RfpResponceId,
                    questions: 'project_fund_area',                   
                  }
                  adminServices.updateQuestionnaire(datavalue).then(
                    response => {
                      console.log(response);
                    },
                    error => {      
                    }
                  );                         
            }
        }
        else if(event.target.name === 'regional_bord_fund'){
            if(event.target.value == false){
            const datavalue = {
                rfp_responce_id: RfpResponceId,
                questions: 'regional_bord_fund_ans',                   
              }
              adminServices.updateQuestionnaire(datavalue).then(
                response => {
                  console.log(response);
                },
                error => {
  
                }
              );  
            }    

        }else if(event.target.name === 'other_list'){
            if(event.target.value == false){
            const datavalue = {
                rfp_responce_id: RfpResponceId,
                questions: 'consists_area',                   
              }
              adminServices.updateQuestionnaire(datavalue).then(
                response => {
                  console.log(response);
                },
                error => {
  
                }
              );    
              const datavalue1 = {
                rfp_responce_id: RfpResponceId,
                questions: 'estimated_area',                   
              }
              adminServices.updateQuestionnaire(datavalue1).then(
                response => {
                  console.log(response);
                },
                error => {
  
                }
              );    
            }  

        }
        
        else{

        }
    }

    componentDidMount() {
    }

    handleClick = () =>
        this.setState({
            value: !this.state.value,
        });
    handleChange = (event) =>
        this.setState({
            value: event.value,
        });

    render() {
        // const has = this.props.hasAnyPortion
        // console.log("My id", has)
        return (
            <div>
                {/* {this.state.countdown != 0 ?
                    <div>
                        <p>{this.state.countdown}</p>
                        <Popup trigger={false} /> */}

                <center><h3>Questionnaire - Current Phase</h3></center>

                <PanelBar>
                    <PanelBarItem expanded={true} title={"Questionnaire - Current Phase"}>
                        <p>Cleanup and Abatement Request for Funding Form (PLEASE READ BEFORE APPLYING!)</p>
                        <p>This application is only for the Cleanup and Abatement Account (CAA) Program! In order to
                            receive CAA funding, all applicants must first discuss their project with the Division's Technical Staff PRIOR to submitting an application.</p>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormTextArea}
                                    // value={this.state.value} 
                                    // onChange={this.onChangeTextarea}
                                    name="purpose_of_request"
                                    type="textarea"
                                    label="Purpose of request"

                                />
                            </Col>
                            <Col xs="12" lg="12">
                                <Field component={FormTextArea}
                                    // value={this.state.value} 
                                    // onChange={this.onChangeTextarea}
                                    name="background"
                                    type="textarea"
                                    label="Background"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    name="has_any_portion"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    label="Has any portion of this project previously received funding through the Cleanup and Abatement account? If so, please provide the funding amount approved, Cleanup and Abatement #, and a brief description of the project."
                                />


                            </Col>
                            {this.props.hasAnyPortion &&

                                <FormGroup row>
                                    <Col xs="12" lg="6">
                                        <Field component={FormInputQues}
                                            name="cleanup_abatement"
                                            hint={'Hint: Please do not use comma ( , ) and enter a number between 0 and 10000000'}
                                            validator={abb}
                                            label="Answer"
                                        />
                                    </Col>
                                    <Col xs="12" lg="6">
                                        <Field component={FormTextArea}
                                            name="has_any_portion_area"
                                            type="textarea"
                                            label="Answer"
                                            hint={'Hint: (1000 character maximum'}
                                        />
                                    </Col>
                                </FormGroup>

                            }


                        </FormGroup>
                        <FormGroup row>

                            <Col xs="12" lg="12">
                                <p><strong>Impact to community or surrounding areas with regards to water quality</strong></p>
                                <Field component={FormTextArea}
                                    name="community_impact_area"
                                    type="textarea"
                                    label="Answer"
                                    hint={'Hint: (1000 character maximum'}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>

                            <Col xs="12" lg="12">
                                <p><strong>What waste is being addressed by this project?</strong></p>
                                <Field component={FormTextArea}
                                    name="project_waste_area"
                                    type="textarea"
                                    label="Answer"
                                    hint={'Hint: (1000 character maximum'}
                                />
                            </Col>
                        </FormGroup>


                        <FormGroup row>

                            <Col xs="12" lg="12">
                                <p><strong>How do you plan to measure the water quality effectiveness of this project?</strong></p>
                                <Field component={FormTextArea}
                                    name="water_quality_area"
                                    type="textarea"
                                    label="Answer"
                                    hint={'Hint: (1000 character maximum'}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="project_fund"
                                    label="Are other funds available for this project? If yes, please describe."
                                />
                            </Col>
                            <Col xs="12" lg="12">
                                {this.props.ProjectFund &&
                                    <Field component={FormTextArea}
                                        name="project_fund_area"
                                        type="textarea"
                                        label="Answer"
                                        hint={'Hint: (1000 character maximum'}
                                    />
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="regional_bord_fund"
                                    label="Will any of these funds be used for Regional Board oversight? If yes, how much? Typically, CAA funds do not cover Regional Board oversight costs."
                                />
                            </Col>
                            <Col xs="12" lg="12">
                                {this.props.RegionalBordFund &&
                                    <Field component={FormInputQues}
                                        type="text"
                                        name="regional_bord_fund_ans"
                                        hint={'Hint: Please do not use comma ( , ) and enter a number between 0 and 10000000'}

                                        label="Answer"
                                    />
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>

                            <Col xs="12" lg="12">
                                <p><strong>List any responsible party</strong></p>
                                <Field component={FormTextArea}
                                    name="responsible_party_area"
                                    type="textarea"
                                    label="Answer"
                                    hint={'Hint: (1000 character maximum'}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>

                            <Col xs="12" lg="12">
                                <p>List any responsible party</p>
                                <ul>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_1"
                                            label=" Preference 1: Emergency Cleanup Projects - Public Safety."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_2"
                                            label="Preference 2: Projects that address Disadvantaged Communities Environmental Justice Infastructure needs.	"
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_3"
                                            label="Preference 3: Cleanup and/or abatement of 2006-listed water bodies that will help to implement a Total Maximum Daily Load (TMDL)."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_4"
                                            label="Preference 4: Cleanup and/or abatement of non-point source legacy pollutant (i.e Stormwater)when the source(s) of the pollution have been mitigated."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_5"
                                            label="Preference 5: Cleanup and/or abatement of pollution in high-use groundwater basins."
                                        />
                                    </li>
                                </ul>
                            </Col>


                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>(continued)</p>
                                <p>What Program Preference(s) does your project fulfill?</p>
                                <ul>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_6"
                                            label="Preference 6: Cleanup and/or abatement of contaminated site when the viable responsible party has not been identified."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_7"
                                            label="Preference 7: Projects that promote habitat restoration through non-profit organizations that collaborate with the Regional Water Boards and encourage public outreach and education."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="preference_8"
                                            label="Preference 8: Completion of a study/plan and/or monitoring addressing significant Statewide water quality problems."
                                        />
                                    </li>

                                </ul>
                            </Col>

                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>What Strategic Plan Goal(s) does your project fulfill?</p>
                                <ul>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="goal_1"
                                            label="Goal 1: Implement strategies to fully support the beneficial uses for all 2006-listed water bodies by 2030."
                                        /></li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="goal_2"
                                            label="Goal 2: Improve and protect groundwater quality in high-use basins by 2030."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            name="goal_3"
                                            label="Goal 3: Increase sustainable local water supplies available for meeting existing and future beneficial uses by 1,725,000 acre-feet per year by 2015, and ensure adequate flows for fish and wildlife habitat."
                                        /></li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="goal_4"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Goal 4: To comprehensively address water quality protection and restoration, and the relationship between water supply and water quality, and describe the connections between water quality, water quantity, and climate change, throughout California's water planning processes."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="goal_5"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Goal 5: Improve transparency and accountability by ensuring that Water Board goals and actions are clear and accessible, by demonstrating and explaining results achieved with respect to the goals and resources available, by enhancing and improving accessibility of data and information, and by encouraging the creating of organizations or cooperative agreements that advance this goal."
                                        /></li>

                                    <li></li>

                                </ul>
                            </Col>

                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>(continued)</p>
                                <p>What Strategic Plan Goal(s) does your project fulfill?</p>
                                <ul>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="goal_6"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Goal 6: Enhance consistency across the Water Boards to ensure our processes are effective, efficient, and predictable, and to promote fair and equitable application of laws, regulations, policies, and procedures."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="goal_7"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Goal 7: Ensure that the Water Boards have access to information and expertise, including employees with appropriate knowledge and skills, needed to effectively and efficiently carry out the Water Boards' mission."
                                        />
                                    </li>
                                </ul>
                            </Col>

                        </FormGroup>


                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>Your project is consistent with what Water Code Section(s)?</p>
                                <ul>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="section_13442"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Section 13442: State Water Board may order moneys to be paid from the CAA to a public agency with authority to cleanup or abate the effects of waste in order to assist it in cleaning up the waste or abating its effects on the waters of the state; or"
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="section_13443"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Section 13443: State Water Board may order moneys to be paid from the account to the Regional Water Board to assist it in attempting to remedy a significant unforeseen water pollution problem, posing an actual or potential public health threat, or is overseeing and tracking the implementation of a supplemental environmental project required as a condition of an order imposing administrative civil liability."
                                        />
                                    </li>
                                </ul>
                            </Col>

                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>CEQA must be completed before the project can begin. Please choose the anticipate method of CEQA compliance below</p>

                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="categorial_exempt"
                                    label="Categorical Exemption"
                                />
                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="negative_declar"
                                    label="Negative Declaration"
                                />
                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="mitigated"
                                    label="Mitigated Negative Declaration"
                                />
                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="environmental_impact"
                                    label="Environmental Impact Report"
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>Indicate the status of the environmental document in the drop box below. If the CEQA document is older than 5-years, please choose "Older than 5-yrs". Provide the estimated or known completion date in the second box, and if the CEQA document is complete, the Clearinghouse number. Example (clearinghouse number: 2009045843, document approved: 02/09/09)</p>

                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="havent_start"
                                    label="Haven't Started"
                                />
                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="in_progress"
                                    label="In Progress"
                                />
                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="complete"
                                    label="Complete"
                                />
                            </Col>
                            <Col xs="12" lg="3">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="older_then_5"
                                    label="Older than 5-years"
                                />
                            </Col>
                            <Col xs="12" lg="12">
                                {this.props.OlderThen_5 &&
                                    <Field component={FormTextArea}
                                        name="indecate_status_area"
                                        type="textarea"
                                        label="Answer"
                                        hint={'Hint: (1000 character maximum'}
                                    />
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <p>If exempt, which exemption does your project meet?</p>
                                <ul>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="consists_15301"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="15301 Existing Facilities: Consists of the operation, repair, maintenance, permitting, leasing, licensing, or minor alteration of existing public or private structures, facilities, mechanical equipment, or topographical features, inviliving negligible or no expansion of use beyond that existing at the time of the lead agency's determination."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="consists_15302"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="15302 Replacement of Reconstruction: Consists of replacement or reconstruction of existing structures and facilities where the new structure will be located on the same site as the structure replaced and will have substantially the same purpose and capacity as the structure replaced.."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="consists_15303"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="15302 New Construction or Conversion of Small Structure: Consists of construction and location of limited numbers of new, small facilities or structures; installation of small new equipment and facilities in small structures; and the conversion of existing small structures from one use to another where only minor modifications are made in the exterior of the stuctures."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="consists_15304"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="15304 Minor Alteration to Land: Consists of minor public or private alteration in the condition of land, water and/or vegitation which do not involove removal of healthy, mature, scenic trees except for forestry or agricultural purposes."
                                        />
                                    </li>
                                    <li>
                                        <Field component={FormCheckbox}
                                            type="checkbox"
                                            name="other_list"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            label="Other"
                                        />
                                    </li>
                                </ul>
                            </Col>

                            <Col xs="12" lg="12">
                                {this.props.OtherList &&
                                    <Field component={FormTextArea}
                                        name="consists_area"
                                        type="textarea"
                                        label="Answer"
                                        hint={'Hint: (1000 character maximum'}
                                    />
                                }
                            </Col>
                        </FormGroup>
                        {this.props.OtherList &&
                            <FormGroup row>
                                <Col xs="12" lg="12">

                                    <p>Please provide an estimated project budget broken down by State Fiscal Year (SFY). (Note: The SFY begins in July 1st and ends June 30th). This should be done for each SFY projected out to the end of the project term.</p>
                                    <p>Example: Project XYZ is a three year project costing $300,000. So SFY 10/11 would be for $100,000; SFY 11/12 would be for $100,000 and SFY 12/13 would be for $100,000.</p>

                                </Col>
                                <Col xs="12" lg="12">
                                    <Field component={FormTextArea}
                                        name="estimated_area"
                                        type="textarea"
                                        label="Answer"
                                        hint={'Hint: (1000 character maximum'}
                                    />
                                </Col>
                            </FormGroup>
                        }
                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="does_your_proj"
                                    // onChange={this.onChangeProgram}
                                    label="Does your project have Regional Board support (i.e. Resolution or Letter from Executive Officer)? If not, please provide an explanation."
                                />

                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="12">
                                <Field component={FormCheckbox}
                                    type="checkbox"
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    name="have_you_attach"
                                    label="Have you attached a detailed Scope of Work, Project Budget, and Schedule with your application? If not, please provide an explanation."
                                />

                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                {/* </div>
                    :
                    <div>
                        <Popup trigger={true}>
                            <h3>Hello Popup</h3>
                            <p>Go to log in </p>
                        </Popup>

                    </div>

                } */}

            </div>
        )
    }
}
export default Questionnaire