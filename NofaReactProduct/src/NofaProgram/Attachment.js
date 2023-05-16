import React, { Component, useState } from 'react';
import axios from 'axios';
import { Field } from '@progress/kendo-react-form';
import { FormUpload, FormInput, FormAutoComplete } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Attachments } from './data';
import { Col, FormGroup } from 'reactstrap';
import { required } from './validators';
import { ProgressBar } from 'react-bootstrap';
const API_URL = `${process.env.REACT_APP_URL}`;
import adminServices from '../services/adminServices'


class Attachment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // value: [],
            value: {
                text: "Optional Attachment - Optional Attachment",
                id: 1
            },
            RfpResponceId: "",
            selectedFile: null,
            progress: '',
            filename: "",
            loader: false


        };
    }

    onChange = (event) => {
        this.setState({
            value: event.target.value,
        });
        console.log("show value", JSON.stringify(this.state.value))
    }

    componentDidMount() {
        const RfpResponceId = sessionStorage.getItem('RfpResponceID');
        this.setState({
            RfpResponceId: RfpResponceId,
        });
        if (RfpResponceId === null || RfpResponceId === '') {

        } else {
            this.getFile = () => {
                this.setState({
                    loader: true,
                });
                adminServices.getAttachementFile(RfpResponceId).then(
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
            this.deleteFileCtrl = (e) => {
                e.preventDefault()
                this.setState({
                    loader: true,
                });
               
                adminServices.deleteAttachements(RfpResponceId).then(
                    response => {
                        // window.open(API_URL + 'files/' + this.state.sid + '/' + fieldname + '/' +val);
                        this.getFile();
                        this.setState({
                            loader: false,
                        });
                    },
                    error => {

                    }
                );
            }
        }
    }
    onFileUpload = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        axios.post(`${process.env.REACT_APP_URL}` + 'attachements/createAttachementFile?id=' + this.state.RfpResponceId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
                console.log(data);
               
                this.setState({ progress: Math.round((100 * data.loaded) / data.total) })
                console.log(data.total);
            },
        })


    };

    onFileChange = event => {       
        this.setState({ selectedFile: event.target.files[0] });

    };
    
    render() {    
        return (
            <div>
                <div className="row">
                    {this.state.loader ?
                        <div className="loader-wrapper">
                            <div className="loader"></div>

                        </div>
                        :
                        <></>

                    }
                </div>
                <center><h3>Attachments</h3></center>
               

                <PanelBar>
                    <PanelBarItem expanded={true} title={"Pre-Submission Attachments"}>

                        <FormGroup row>
                            <Col xs="12" lg="6">
                                <Field component={FormAutoComplete}
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    type="text"
                                    name="project_attach"
                                    label="Attachment"
                                    textField="text"
                                    dataItemKey="id"
                                    data={Attachments}
                                    placeholder="Start typing..."

                                />
                            </Col>
                            <Col xs="12" lg="6">
                                <Field component={FormInput}
                                    type="text"
                                    name="attach_title"
                                    label="Attachment Title"
                                />
                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Col xs="12" lg="6">
                                <input type="file" onChange={this.onFileChange} />
                                {this.state.progress && <ProgressBar now={this.state.progress} label={`${this.state.progress}%`} />}
                                {this.state.filename ?
                                    <div className='filebord'>

                                        <div >
                                            <i className="fa fa-file" aria-hidden="true"></i>
                                            <a onClick={(e) => this.downloadFileCtrl(e, this.state.filename)} className="link"  >{this.state.filename}</a>
                                            <button className='close' onClick={(e) => this.deleteFileCtrl(e)}><i className="fa fa-close" aria-hidden="true"></i></button>
                                        </div>

                                    </div>
                                    : <></>
                                }
                            </Col>

                            <Col xs="12" lg="3"> <button className='k-button k-primary' onClick={this.onFileUpload}>Upload</button></Col>
                        </FormGroup>
                    </PanelBarItem>
                </PanelBar>
            </div>
        )
    }
}
export default Attachment