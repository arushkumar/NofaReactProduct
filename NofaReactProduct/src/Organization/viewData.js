import React, { Component } from 'react';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices'
const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';

class ViewData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isDisabled: false,
            loader: false,
            fileData: "",
            orgid:""
        };
    }
    componentDidMount() {

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user === null) {

        } else {
            nofaServices.getOrganization(user.id)
                .then(({ data: complete }) => {
                    const valuedata = complete[0]
                    const orid = valuedata.id;
                    console.log(orid);
                    this.setState(valuedata);
                    this.setState({orgid:orid});
                    this.setState({ loader: true })
                    //console.log(valuedata);
                    if(orid){
                        nofaServices.getOrganizationFile(orid).then(
                            response => {
                                var ad = response.data;
                                this.setState({ value: ad })
                                console.log(ad)
            
                            },
                            error => {
            
                            }
                        );
                        this.downloadFileCtrl = (e, fieldname, val) => {

                            nofaServices.downloadOrgFiles(orid, fieldname, val).then(
                              response => {
                                //window.open(API_URL_NEW + 'files/' + this.state.sid + '/' + fieldname + '/' +val);
                               
                              },
                              error => {
                        
                              }
                            );
                          }
                    }else{
                        null
                    }
                    
                });

               
           
        }


    }
    createOrg = (e, val) => {

        this.props.history.push("/organization/" + val + "/edit");
    }
    render() {
        return (
            <div className='container'>
                <div className="row">
                    {this.state.loader ?
                        <></>
                        :
                        <div className="loader-wrapper">
                            <div className="loader"></div>

                        </div>

                    }
                </div>
                <div className='prviewcss'>
                    <FormGroup row>
                        <Col lg="6"> <h4>View Organization</h4></Col>
                        <Col lg="6">


                            <a className='text-align-right' onClick={(e) => this.createOrg(e, this.state.id)}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</a></Col>
                    </FormGroup>

                    <PanelBar>
                        <PanelBarItem expanded={true} title={"General Information"}>
                            <Col lg="12">
                                <p><strong>Organization Name:</strong> {this.state.name}</p>
                                <p><strong>Steet Address:</strong> {this.state.address}</p>
                                <p><strong>State:</strong> {this.state.state}</p>
                                <p><strong>County:</strong> {this.state.county}</p>
                                <p><strong>City:</strong> {this.state.city}</p>
                                <p><strong>Zip:</strong> {this.state.zip}</p>


                            </Col>
                        </PanelBarItem>
                    </PanelBar>

                    <PanelBar>
                        <PanelBarItem expanded={false} title={"Contact"}>
                            <Col lg="12">
                                <p><strong>Email:</strong> {this.state.contact_email}</p>
                                <p><strong>Name:</strong> {this.state.contact_name}</p>
                                <p><strong>Title:</strong> {this.state.contact_title}</p>
                                <p><strong>Phone No:</strong> {this.state.contact_phone}</p>

                            </Col>
                        </PanelBarItem>
                    </PanelBar>
                    <PanelBar>
                        <PanelBarItem expanded={false} title={"Alternative Contact"}>
                            <Col lg="12">
                                <p><strong>Email:</strong> {this.state.alt_contact_email}</p>
                                <p><strong>Name:</strong> {this.state.alt_contact_name}</p>
                                <p><strong>Title:</strong> {this.state.alt_contact_title}</p>
                                <p><strong>Phone No:</strong> {this.state.alt_contact_phone}</p>



                            </Col>
                        </PanelBarItem>
                    </PanelBar>
                    <PanelBar>
                        <PanelBarItem expanded={false} title={"Organizational Document for Locality"}>
                            <Col lg="12">
                                <FormGroup row>
                                    <Col xs="12" lg="4">

                                        <p><strong>Certification & Legal Disclosure</strong></p>
                                    </Col>
                                    <Col xs="12" lg="8">
                                        {this.state.value.cert_legal_disc ?
                                            <div className='img-css'>
                                                {this.state.value.cert_legal_disc.split(',').map((step, i) => (
                                                    <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'cert_legal_disc', step)} download>{step}</a>
                                                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'cert_legal_disc', step)} className="deleteButton">
                                                            <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                                                ))}
                                            </div>
                                            : <></>}

                                    </Col>
                                </FormGroup>




                            </Col>
                            <Col lg="12">
                                <FormGroup row>
                                    <Col xs="12" lg="4">

                                        <p><strong>Resolution</strong></p>
                                    </Col>
                                    <Col xs="12" lg="8">
                                        {this.state.value.resolution ?
                                            <div className='img-css'>
                                                {this.state.value.resolution.split(',').map((step, i) => (
                                                    <div className='img-css2' key={step}><i className="fa fa-file" aria-hidden="true"></i> <a onClick={(e) => this.downloadFileCtrl(e, 'resolution', step)} download>{step}</a>
                                                        <button type="button" onClick={(e) => this.deleteFileCtrl(e, 'resolution', step)} className="deleteButton">
                                                            <span aria-label="Remove" title="Remove" className="k-icon k-delete k-i-x"></span></button></div>
                                                ))}
                                            </div>
                                            : <></>}

                                    </Col>
                                </FormGroup>




                            </Col>
                        </PanelBarItem>
                    </PanelBar>
                </div>
            </div>
        )
    }
}
export default ViewData