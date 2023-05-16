import React, { Component, useState } from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormCheckbox } from './form-components';
// import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
// import { requiredValidator, cardValidator, cvcValidator } from './validators';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
import './report.css';


function Exceltab() {


    const print = () => {
        window.print();
    }

    return (
        <div  className='box-shadow'>

            <div className='hedingtab'>
                <div className="row">

                    <div className="col-lg-3">
                        <div className="logoicon">
                            <img src={`/images/HCD_logo.png`} alt="Hcd" />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <center><h3>DEPARTMENT OF HOUSING & COMMUNITY DEVELOPMENT</h3></center>
                        <center><h4>Division of Financial Assistance </h4></center>
                        <center><h5>Multifamily Housing Program - Round 4 - July 23, 2021 Notice of Funding Availability</h5></center>
                        <center><h5>Application Log and Self-Score Listing, with Tie-Breaker Score </h5></center>
                        <center><h6>Information below has been provided by the applicant. HCD has NOT verified the data.</h6></center>

                    </div>
                    {/* <div className="col-lg-3">
                        <span className="print"
                            onClick={print}>
                            PRINT
                        </span>
                    </div> */}
                </div>
            </div>
            {/* <center><h3>Project Overview</h3></center>
            <p>In order to implement goals and purposes of the Program, the Department may adopt measures to direct funding awards to designated Project types including, but not limited to, Rural Area Projects, Projects located in areas needing additional funding to achieve a reasonable geographic distribution of Program funds, Projects preserving continued affordability, and Projects with specified funding characteristics. MHP §7304</p> */}
            <div className="wrapper tableFixHead">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>App #</th>
                            <th>Project Name</th>
                            <th>Project Address</th>
                            <th>Project city</th>
                            <th>Project County</th>
                            <th>Applicant/Saponcer #1</th>
                            <th>Applicant/Saponcer #2</th>
                            <th>Development Type</th>
                            <th>Tax Credits</th>
                            <th>North / South Rural</th>
                            <th>Senior</th>
                            <th>Self Score</th>
                            <th>Tiebreaker</th>
                            <th>Bonus Point</th>
                            <th>Total Restricted Units</th>
                            <th>Total MHP Assisted Units</th>
                            <th>Total Units</th>
                            <th>MHP Loan amount</th>
                            <th>Total Project Amount</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>1</p>
                            </td>
                            <td>
                                <p>1740 san pablo</p>
                            </td>
                            <td>
                                <p>1740 san pablo avanue</p>
                            </td>

                            <td>
                                <p>Barkely</p>
                            </td>
                            <td>
                                <p>Alameda</p>
                            </td>
                            <td>
                                <p>BRIDGE Housing Corporation</p>
                            </td>
                            <td>
                                <p>NA</p>
                            </td>
                            <td>
                                <p>New Construction</p>
                            </td>
                            <td>
                                <p>4%</p>
                            </td>
                            <td>
                                <p>North</p>
                            </td>
                            <td>
                                <p>No</p>
                            </td>
                            <td>
                                <p>116</p>
                            </td>
                            <td>
                                <p>0.4258</p>
                            </td>
                            <td>
                                <p>1</p>
                            </td>
                            <td>
                                <p>53</p>
                            </td>
                            <td>
                                <p>53</p>
                            </td>
                            <td>
                                <p>54</p>
                            </td>
                            <td>
                                <p>13.341</p>
                            </td>
                            <td>
                                <p>47.5000</p>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Exceltab;