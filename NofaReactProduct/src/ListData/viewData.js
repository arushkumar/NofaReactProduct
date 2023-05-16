import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormInput, FormTextArea, FormUpload } from '../NofaProgram/form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
// import { requiredValidator } from './validators';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices'
const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';

class ViewData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrData:"",
            value: "",
            sid: "",
            isDisabled: false,
           

        };
    }
    componentDidMount() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
       var sss = this.props.match.params.id;        
    //    console.log("show me", sss)
        if (sss === null) {

        } else {
            this.setState({ sid: sss })
            this.AllDataCtrl = () => {
                nofaServices.getFilesOnly(sss).then(
                    response => {
                        // window.scrollTo(0, 0)
                        var ad = response.data;
                        this.setState({ value: ad })
                       
                        
                    },
                    error => {

                    }
                );
                nofaServices.getFiles(sss).then(
                    response => {
                        // window.scrollTo(0, 0)
                        var ad = response.data;
                        this.setState({ scrData: ad })
                      
                        // console.log("Scr Data",this.state.scrData)
                        
                    },
                    error => {

                    }
                );
            }
           
            this.AllDataCtrl();           
            this.downloadFileCtrl = (e,fieldname, val) => {

                nofaServices.downloadFiles(this.state.sid,fieldname,val).then(
                    response => {
                        //window.open(API_URL + 'files/' + this.state.sid + '/' + fieldname + '/' +val);
                    },
                    error => {

                    }
                );
            }          
           
        }
        this.myFunction=()=> {
            this.props.history.push("/");
          }
    }

    render() {

        const {
            fileInfos,
        } = this.state;

        return (

            <div className='prviewcss'>
                
                <div class="position-relative row form-group"><div class="col-lg-6"> 
                <h4>View Submission</h4></div><div class="col-lg-6">
                    <a className="text-align-right" onClick={this.myFunction}> <i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back</a></div>
                    </div>
                <PanelBar>
                    <PanelBarItem expanded={true} title={"Pre-Screening"}>
                        <Col lg="12">
                            <p><strong>Have you undertaken a pre-application consultation for the Super NOFA program?:</strong><br /> {this.state.scrData.pre_app_bool1}</p>
                            <p><strong>Program representative(s):</strong> {this.state.scrData.pre_app_bool2}</p>
                            {/* <p><strong>Do you have a path for environmental approval?:</strong><br /> {this.state.scrData.pre_app_bool3 ? "Yes" : "No"}</p>
                            <p><strong>Is the applicant a city, county, or other local public entry, such as a public housing authority or federally recognized tribal governments within California?:</strong><br /> {this.state.value.pre_app_bool4 ? "Yes" : "No"}</p> */}
                        </Col>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={true} title={"Program Selection"}>
                        <Col lg="12">
                            {/* <p><strong>Programs Selected:</strong><br/></p> */}
                            <p><strong>Program 1</strong><br /> {this.state.scrData.mhp_bool ? "Yes" : "No"}</p>
                            <p><strong>Program 2</strong><br /> {this.state.scrData.iig_bool ? "Yes" : "No"}</p>
                            <p><strong>Program 3</strong><br /> {this.state.scrData.vhhp_bool ? "Yes" : "No"}</p>
                            <p><strong>Program 4</strong><br /> {this.state.scrData.fwhg_bool ? "Yes" : "No"}</p>

                        </Col>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={true} title={"Project Information"}>
                        <Col lg="12">
                            <p><strong>Email: </strong> {this.state.scrData.email}</p>
                            <p><strong>Project Name: </strong> {this.state.scrData.project_name}</p>
                            <p><strong>Project Description: </strong> {this.state.scrData.proj_desc}</p>
                            <p><strong>Street: </strong> {this.state.scrData.project_address}</p>
                            <p><strong>City: </strong> {this.state.scrData.project_city}</p>
                            <p><strong>County: </strong> {this.state.scrData.project_county}</p>
                            {/* <p><strong>State: </strong> {this.state.scrData.proj_state}</p> */}
                            <p><strong>Zip: </strong> {this.state.scrData.project_zip}</p>
                        </Col>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Project Overview"}>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>64. CIP Integral to QIP</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.cip_int_qip ?
                                    <div>
                                        {this.state.value.cip_int_qip.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link"  onClick={(e) => this.downloadFileCtrl(e, 'cip_int_qip',step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>65. Urban Area</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.urban_area ?
                                    <div>
                                        {this.state.value.urban_area.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'urban_area', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>66. Transitional Housing Project</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.transitional_housing ?
                                    <div className='img-css'>
                                        {this.state.value.transitional_housing.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'transitional_housing', step)}>{step}</a>
                                                </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>28a. Indian Country Verification</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.indian_country ?
                                    <div className='img-css'>
                                        {this.state.value.indian_country.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'indian_country', step)}>{step}</a>
                                                </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>8b. Fee Land Verification</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.fee_land ?
                                    <div className='img-css'>
                                        {this.state.value.fee_land.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'fee_land', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>67. NCBD Experience</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.ncbd_exp ?
                                    <div className='img-css'>
                                        {this.state.value.ncbd_exp.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'ncbd_exp', step)}>{step}</a>
                                              </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>68. CBD Experience</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.cdb_exp ?
                                    <div className='img-css'>
                                        {this.state.value.cdb_exp.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'cdb_exp', step)}>{step}</a>
                                              </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>69. ED Experience</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.ed_exp ?
                                    <div className='img-css'>
                                        {this.state.value.ed_exp.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'ed_exp', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>70. SponDev Cont. Agreement</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spondev_cont_agree ?
                                    <div className='img-css'>
                                        {this.state.value.spondev_cont_agree.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spondev_cont_agree', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>71. Project Timeline</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.proj_timeline ?
                                    <div className='img-css'>
                                        {this.state.value.proj_timeline.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'proj_timeline', step)}>{step}</a>
                                              </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>73. Leg Letter</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.leg_letter ?
                                    <div className='img-css'>
                                        {this.state.value.leg_letter.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'leg_letter', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>42. Rehab Description</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.rehab_desc ?
                                    <div className='img-css'>
                                        {this.state.value.rehab_desc.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'rehab_desc', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>43. PNA or CNA</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.pna_cna ?
                                    <div className='img-css'>
                                        {this.state.value.pna_cna.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'pna_cna', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>44. Rent Roll</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.rent_roll ?
                                    <div className='img-css'>
                                        {this.state.value.rent_roll.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'rent_roll', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>72. Tax Credit Reservation</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.tax_reserve ?
                                    <div className='img-css'>
                                        {this.state.value.tax_reserve.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'tax_reserve', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>35. Rural Status Determination</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.rural_status_det ?
                                    <div className='img-css'>
                                        {this.state.value.rural_status_det.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'rural_status_det', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>31. Opportunity Area</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.opp_area_doc ?
                                    <div className='img-css'>
                                        {this.state.value.opp_area_doc.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'opp_area_doc', step)}>{step}</a>
                                               </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>4a. Spon1 Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>4b. Spon1 Authorizing Resolution</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_auth_res ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_auth_res.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_auth_res', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>44c. Spon1 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>4d. Spon1 OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>4e. Spon1 Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>4f. Spon1 Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>4g. Spon1 Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon1_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.spon1_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon1_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5a. Spon2 Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5b. Spon2 Authorizing Resolution</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_auth_res ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_auth_res.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_auth_res', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5c. Spon2 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5d. Spon2 OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5e. Spon2 Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5f. Spon2 Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>5g. Spon2 Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.spon2_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.spon2_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'spon2_tax_exempt' ,step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>


                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6a. Joint Venture Agreement</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.joint_venture ?
                                    <div className='img-css'>
                                        {this.state.value.joint_venture.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'joint_venture', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6b. JV1 Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6c. JV1 Authorizing Resolution</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_auth_res ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_auth_res.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_auth_res', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6d. JV1 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6e. JV1 OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6f. JV1 Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_sig_block.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_sig_block', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6g. JV1 Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>6h. JV1 Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv1_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.jv1_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv1_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7a. JV2 Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7b. JV2 Authorizing Resolution</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_auth_res ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_auth_res.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_auth_res', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7c.JV2 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7d. JV2 OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7c.JV2 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7e. JV2 Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_sig_block.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_sig_block', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7f. JV2 Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>7g. JV2 Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.jv2_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.jv2_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'jv2_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9a. Bwr Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9b. Bwr OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9c. Bwr OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9d. Bwr Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_sig_block.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_sig_block' ,step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9e. Bwr STD 204 Payee Data Record</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_payee_data ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_payee_data.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_payee_data', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9f. Bwr Fi$CAL TIN Form</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.bwr_fical_hcd ?
                                    <div className='img-css'>
                                        {this.state.value.bwr_fical_hcd.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'bwr_fical_hcd', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9g. Bwr EIN Verification</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_ein ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_ein.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_ein', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9h. Bwr Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>9i. Bwr Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.borrower_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.borrower_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'borrower_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>10a. MGP Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.mgp_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.mgp_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'mgp_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>10c. MGP OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.mgp_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.mgp_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'mgp_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>10d. MGP OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.mgp_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.mgp_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'mgp_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>10e. MGP Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.mgp_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.mgp_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'mgp_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>10f. MGP Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.mgp_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.mgp_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'mgp_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>10g. MGP Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.mgp_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.mgp_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'mgp_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>11a. AGP1 Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp1_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.agp1_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp1_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>11c. AGP1 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp1_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.agp1_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp1_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>11d. AGP1 OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp1_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.agp1_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp1_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>11e. AGP1 Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp1_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.agp1_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp1_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>11f. AGP1 Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp1_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.agp1_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp1_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>11g. AGP1 Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp1_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.agp1_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp1_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>12a. AGP2 Cert & Legal Disclosure</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp2_cert_legal ?
                                    <div className='img-css'>
                                        {this.state.value.agp2_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp2_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>12c. AGP2 OrgDoc1, OrgDoc2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp2_org_docs ?
                                    <div className='img-css'>
                                        {this.state.value.agp2_org_docs.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp2_org_docs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>12d. AGP2 OrgChart</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp2_org_chart ?
                                    <div className='img-css'>
                                        {this.state.value.agp2_org_chart.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp2_org_chart', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>12e. AGP2 Signature Block</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp2_sig_block ?
                                    <div className='img-css'>
                                        {this.state.value.agp2_cert_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp2_cert_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>12f. AGP2 Cert of Good Standing</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp2_cert_stand ?
                                    <div className='img-css'>
                                        {this.state.value.agp2_cert_stand.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp2_cert_stand', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>12g. AGP2 Tax-Exempt Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.agp2_tax_exempt ?
                                    <div className='img-css'>
                                        {this.state.value.agp2_tax_exempt.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'agp2_tax_exempt', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>13. Site Control</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.site_control ?
                                    <div className='img-css'>
                                        {this.state.value.site_control.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'site_control', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>14. Preliminary Title Report</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.prelim_title_report ?
                                    <div className='img-css'>
                                        {this.state.value.prelim_title_report.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'prelim_title_report', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>45. Appraisal</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.appraisal ?
                                    <div className='img-css'>
                                        {this.state.value.appraisal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'appraisal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>32. Utility Allowance</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.utility_allowance ?
                                    <div className='img-css'>
                                        {this.state.value.utility_allowance.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'utility_allowance', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>18. Relocation</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.relocation ?
                                    <div className='img-css'>
                                        {this.state.value.relocation.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'relocation', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>47. Env. Report 1</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.env_report_47 ?
                                    <div className='img-css'>
                                        {this.state.value.env_report_47.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'env_report_47', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>48. Env. Report 2</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.env_report_48 ?
                                    <div className='img-css'>
                                        {this.state.value.env_report_48.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'env_report_48', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>49. Env. Report 3</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.env_report_49 ?
                                    <div className='img-css'>
                                        {this.state.value.env_report_49.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'env_report_49', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>50. Env. Report 4</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.env_report_50 ?
                                    <div className='img-css'>
                                        {this.state.value.env_report_50.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'env_report_50', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>51. Env. Report 5</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.env_report_51 ?
                                    <div className='img-css'>
                                        {this.state.value.env_report_51.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'env_report_51', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>52. Env. Report 6</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.env_report_52 ?
                                    <div className='img-css'>
                                        {this.state.value.env_report_52.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'env_report_52', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>15. Article XXXIV Legal Opinion</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.art_xxxiv_legal ?
                                    <div className='img-css'>
                                        {this.state.value.art_xxxiv_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'art_xxxiv_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>16. Article XXXIV Authority</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.art_xxxiv_auth ?
                                    <div className='img-css'>
                                        {this.state.value.art_xxxiv_auth.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'art_xxxiv_auth', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>17. Fair Housing Legal Opinion</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.fair_housing_legal ?
                                    <div className='img-css'>
                                        {this.state.value.fair_housing_legal.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'fair_housing_legal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>63. LOE</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.loe ?
                                    <div className='img-css'>
                                        {this.state.value.loe.split(',').map((step, i) => (
                                            <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e,'loe', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Supportive Service"}>
                        <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>94. LSP List of projects or contracts</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.lsp_list_proj ?
                                    <div>
                                        {this.state.value.lsp_list_proj.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'lsp_list_proj', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>25. LSP NonSpon Contract Basic</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.lsp_nonspon ?
                                    <div>
                                        {this.state.value.lsp_nonspon.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'lsp_nonspon', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>26. NonSpon SS Contract Enhanced</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.nonspon_ss_contract_enhanced ?
                                    <div>
                                        {this.state.value.nonspon_ss_contract_enhanced.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'nonspon_ss_contract_enhanced', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>27. Duty Stmt 1-4</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.duty_stmts ?
                                    <div>
                                        {this.state.value.duty_stmts.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'duty_stmts', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>30. SS Fund Ltr1, SS Fund Ltr2, SS Fund Ltr3, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.ss_fund_ltr ?
                                    <div>
                                        {this.state.value.ss_fund_ltr.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'ss_fund_ltr', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Supportive Housing"}>
                    <FormGroup row>
                            <Col xs="12" lg="4">

                                <p><strong>20. Integration Plan</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.Integration_plan ?
                                    <div>
                                        {this.state.value.Integration_plan.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'Integration_plan', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                       
                            <Col xs="12" lg="4">
                                <p><strong>21. Sponsor SOQ</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.sponsor_soq ?
                                    <div>
                                        {this.state.value.sponsor_soq.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'sponsor_soq', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>22. Property Management SOQ</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.property_soq ?
                                    <div>
                                        {this.state.value.property_soq.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'property_soq', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>23. LSP SOQ</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.lsp_soq ?
                                    <div>
                                        {this.state.value.lsp_soq.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'lsp_soq', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                            <Col xs="12" lg="4">
                                <p><strong>24. LSP Exp Contracts</strong></p>
                            </Col>
                            <Col xs="12" lg="8">

                                {this.state.value.lsp_exp_soq ?
                                    <div>
                                        {this.state.value.lsp_exp_soq.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'lsp_exp_soq', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Sponsor Certification"}>
                        <Col xs="12" lg="4">
                            <p><strong>62. Sponsor Certification LOE</strong></p>
                        </Col>
                        <Col xs="12" lg="8">

                            {this.state.value.spon_cert_loe ?
                                <div>
                                    {this.state.value.spon_cert_loe.split(',').map((step, i) => (
                                        <div key={step}>
                                            <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'spon_cert_loe', step)}>{step}</a>
                                        </div>
                                    ))}
                                </div>
                                : <></>
                            }
                        </Col>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Scoring"}>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>87. Scoring Oportunity Area Map</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.scoring_op_area_map ?
                                    <div>
                                        {this.state.value.scoring_op_area_map.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'scoring_op_area_map', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>88. CES Agreement</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.ces_agree ?
                                    <div>
                                        {this.state.value.ces_agree.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'ces_agree', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>36. Resume Principal</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.resume_principal ?
                                    <div>
                                        {this.state.value.resume_principal.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'resume_principal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>37. SOQ Principal</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.soq_principal ?
                                    <div>
                                        {this.state.value.soq_principal.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'soq_principal', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>38. Cert of Employment</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.cert_employment ?
                                    <div>
                                        {this.state.value.cert_employment.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'cert_employment', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>73. AHDs Cash Flow</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.ahd_cash_flow ?
                                    <div>
                                        {this.state.value.ahd_cash_flow.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'ahd_cash_flow', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>74. Enforceable MA</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.enforce_ma ?
                                    <div>
                                        {this.state.value.enforce_ma.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'enforce_ma', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>75. Bona-fide MA</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.bona_fide_ma ?
                                    <div>
                                        {this.state.value.bona_fide_ma.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'bona_fide_ma', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>56. Const EFC #1, #2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.const_efcs ?
                                    <div>
                                        {this.state.value.const_efcs.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'const_efcs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>57. Perm EFC #1, #2, etc.</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.perm_efcs ?
                                    <div>
                                        {this.state.value.perm_efcs.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'perm_efcs', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>89. FEMA DD</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.fema_dd ?
                                    <div>
                                        {this.state.value.fema_dd.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'fema_dd', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>90. Disaster Housing Plan</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.disaster_housing_plan ?
                                    <div>
                                        {this.state.value.disaster_housing_plan.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'disaster_housing_plan', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>91. Land use app submission</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.land_use_app ?
                                    <div>
                                        {this.state.value.land_use_app.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'land_use_app', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>76. AICP Letter</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.aicp_letter ?
                                    <div>
                                        {this.state.value.aicp_letter.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'aicp_letter', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>89. FEMA DD</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.fema_dd_2 ?
                                    <div>
                                        {this.state.value.fema_dd_2.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'fema_dd_2', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>90. Disaster Housing Plan</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.disaster_housing_plan_2 ?
                                    <div>
                                        {this.state.value.disaster_housing_plan_2.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'disaster_housing_plan_2', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>53. Local Approvals</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.local_approvals ?
                                    <div>
                                        {this.state.value.local_approvals.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'local_approvals', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>33. Operating Subsidy Commitment</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.op_sub_commit ?
                                    <div>
                                        {this.state.value.op_sub_commit.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'op_sub_commit', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>34. Current Contract Rents</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.current_contract_rents ?
                                    <div>
                                        {this.state.value.current_contract_rents.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'current_contract_rents', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>77. Excess or Surplus Land</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.excess_surplus_land ?
                                    <div>
                                        {this.state.value.excess_surplus_land.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'excess_surplus_land', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>58. Adaptive Reuse Narrative</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.adapt_reuse_narr ?
                                    <div>
                                        {this.state.value.adapt_reuse_narr.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'adapt_reuse_narr', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>61. Amenities List</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.amenities_list ?
                                    <div>
                                        {this.state.value.amenities_list.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'amenities_list', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>78. Walkability location map</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.walk_location_map ?
                                    <div>
                                        {this.state.value.walk_location_map.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'walk_location_map', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>60. Amenities-Scaled Distance Map</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.amenities_dist_map ?
                                    <div>
                                        {this.state.value.amenities_dist_map.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'amenities_dist_map', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>92. Reducing barriers plan</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.reducing_barriers_plan ?
                                    <div>
                                        {this.state.value.reducing_barriers_plan.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'reducing_barriers_plan', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>79. Sustainable Strategy</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.sustain_strat ?
                                    <div>
                                        {this.state.value.sustain_strat.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'sustain_strat', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>80. Regional Plan</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.region_plan ?
                                    <div>
                                        {this.state.value.region_plan.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'region_plan', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>93. Transit Priority Area</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.transit_priority_area ?
                                    <div>
                                        {this.state.value.transit_priority_area.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'transit_priority_area', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>81. Green Building Status</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.green_building_stat ?
                                    <div>
                                        {this.state.value.green_building_stat.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'green_building_stat', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>82. Near Electrification</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.near_electrification ?
                                    <div>
                                        {this.state.value.near_electrification.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'near_electrification', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>83. Electric Design</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.electric_design ?
                                    <div>
                                        {this.state.value.electric_design.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'electric_design', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>95. Farmworker Need</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.farmworker_need ?
                                    <div>
                                        {this.state.value.farmworker_need.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'farmworker_need', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>84. Net Density Verification</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.net_density ?
                                    <div>
                                        {this.state.value.net_density.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'net_density', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>78. Walkability location map</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.walk_map ?
                                    <div>
                                        {this.state.value.walk_map.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'walk_map', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>96. Prohousing Designation</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.prohouse_designation ?
                                    <div>
                                        {this.state.value.prohouse_designation.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'prohouse_designation', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>97. Prohousing Application</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.prohouse_app ?
                                    <div>
                                        {this.state.value.prohouse_app.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'prohouse_app', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
                <PanelBar>
                    <PanelBarItem expanded={false} title={"Excel Workbook"}>
                        <FormGroup row>
                            <Col xs="12" lg="4">
                                <p><strong>Excel Workbook</strong></p>
                            </Col>
                            <Col xs="12" lg="8">
                                {this.state.value.workbook ?
                                    <div>
                                        {this.state.value.workbook.split(',').map((step, i) => (
                                            <div key={step}>
                                                <i className="fa fa-file" aria-hidden="true"></i> <a className="link" onClick={(e) => this.downloadFileCtrl(e,'workbook', step)}>{step}</a>
                                            </div>
                                        ))}
                                    </div>
                                    : <></>
                                }
                            </Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
            </div>
        )
    }
}

export default ViewData