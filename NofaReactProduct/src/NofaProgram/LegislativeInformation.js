import React, { Component, useState } from 'react';
import { Field } from '@progress/kendo-react-form';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import {  FormAutoComplete, FormMultiSelect } from './form-components';

import { Col, FormGroup } from 'reactstrap';
import adminServices from '../services/adminServices';
import { req } from './validators';

const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';



class LegislativeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            value1: [], value2: [], Senate: [], Assembly: [], USCongress: [],

        };
        this.SenateList = this.SenateList.bind(this);
        this.AssemblyList = this.AssemblyList.bind(this);
        this.USCongressList = this.USCongressList.bind(this);
    }
    isCustom(item) {
        return item.id === undefined;
    }

    addKey(item) {
        item.id = new Date().getTime();
    }

    handleChangeSenet = (event) => {
        const FrmValues = event.value;
       
        const RfpResponceId = sessionStorage.getItem('RfpResponceID');
        console.log("responce", RfpResponceId)
        const datavalue ={
           
            rfp_responce_id:RfpResponceId,
            leg_type_id: '3',
            rfp_leg_type_id: '1',
            leg_name:FrmValues
        }
        adminServices.createRfpLegislativeInformation(datavalue).then(
            response => {
              
            },
            error => {
            }
        );

    }

    handleChangeAsm = (event) => {
        const FrmValues = event.value;       
        const RfpResponceId = sessionStorage.getItem('RfpResponceID');

        const datavalue ={
            rfp_responce_id:RfpResponceId,
            leg_type_id: '4',
            rfp_leg_type_id: '1',
            leg_name:FrmValues
        }
        adminServices.createRfpLegislativeInformation(datavalue).then(
            response => {
              
            },
            error => {
            }
        );
    };

    handleChangeUs = (event) => {
        const FrmValues = event.value;       
        const RfpResponceId = sessionStorage.getItem('RfpResponceID');
        console.log("myvalue",event.value )
        const datavalue ={
            rfp_responce_id:RfpResponceId,
            leg_type_id: '2',
            rfp_leg_type_id: '1',
            leg_name:FrmValues
        }
        adminServices.createRfpLegislativeInformation(datavalue).then(
            response => {
                //alert("saved")
            },
            error => {
            }
        );
    };

    SenateList = () => {
       
        adminServices.getSenateDistrict().then(
            response => {
                var list = response.data.data;
                this.setState({ Senate: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    AssemblyList = () => {
      
        adminServices.getAssemblyDistrict().then(
            response => {
                var list = response.data.data;
                this.setState({ Assembly: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    USCongressList = () => {

        adminServices.getUSCongressionalDistrict().then(
            response => {
                var list = response.data.data;
                this.setState({ USCongress: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    componentDidMount() {
        this.SenateList();
        this.AssemblyList();
        this.USCongressList();

    }

    render() {

        
        return (

            <div>
                
                <center><h3>Legislative Information</h3></center>

                <PanelBar>
                    <PanelBarItem expanded={true} title={"Legislative Information"}>

                        <p>The Legislative Information tab displays Senate, Assembly, and US Congressional District based on the latitude and longitude entered on the General Information tab. Additional districts (for larger or multi-site project) can be added using the CTRL+CLICK buttons.</p>

                        <div className="wrapper tableFixHead devbudget">
                            <table className="table overviewtable table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Legislative Information</th>
                                        <th>primary</th>
                                        <th>primary official</th>
                                        <th>Additional District(s)</th>
                                        <th>Additional Official</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Senate District</td>
                                        <td>
                                            <Field component={FormAutoComplete}
                                                type="text"
                                                name="senet_dist"
                                                // label="SenetDist"
                                                onChange={this.handleChangeSenet}
                                                value={this.state.value}
                                                data={this.state.Senate}
                                                textField="NAME"
                                                dataItemKey="ID"
                                                placeholder="Select a Value..."
                                            />
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <Field
                                                name='legislative_value'
                                                data={this.state.Senate}                                               
                                                textField="NAME"
                                                dataItemKey="ID"
                                                allowCustom={true}
                                                component={FormMultiSelect}                                                
                                                validator={req}
                                            />
                                        </td>
                                        <td>
                                            <p>Find Senate District</p>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td>Assembly District</td>
                                        <td>
                                            <Field component={FormAutoComplete}
                                                type="text"
                                                name="assembly_dist"                                               
                                                onChange={this.handleChangeAsm}
                                                value={this.state.value}
                                                data={this.state.Assembly}
                                                textField="NAME"
                                                dataItemKey="ID"
                                                placeholder="Select a Value..."
                                            />
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <Field
                                                name='assembly_value'
                                                data={this.state.Assembly}                                              
                                                textField="NAME"
                                                dataItemKey="ID"
                                                allowCustom={true}
                                                component={FormMultiSelect}
                                              validator={req} 
                                            />
                                        </td>
                                        <td>
                                            <p>	Find Assembly District</p>
                                        </td>

                                    </tr>

                                    <tr>
                                        <td>US Congressional District</td>
                                        <td>
                                            <Field component={FormAutoComplete}
                                                type="text"
                                                name="us_cong_dist"
                                                
                                                onChange={this.handleChangeUs}
                                                value={this.state.value}
                                                data={this.state.USCongress}
                                                textField="NAME"
                                                dataItemKey="ID"
                                                placeholder="Select a Value..."
                                            />
                                        </td>
                                        <td>

                                        </td>
                                        <td>
                                            <Field
                                                name="us_cong_value"
                                                data={this.state.USCongress}
                                                
                                                textField="NAME"
                                                dataItemKey="ID"
                                                allowCustom={true}
                                                component={FormMultiSelect}
                                              validator={req} 
                                            />
                                        </td>
                                        <td>
                                            <p>	Find Assembly District</p>
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
export default LegislativeInfo