import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormCheckbox, FormUpload, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { required } from './validators';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
const API_URL_TEST = `${process.env.REACT_APP_URL}` + 'api/test/';
class OrgInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false,value:""};
   
    this.handleChange = this.handleChange.bind(this);
    
  };

   handleChange(){
     this.setState({
       checked:!this.state.checked
     })   }
     componentDidMount() {
     
     nofaServices.getOrganizationFile(this.props.peramid).then(
      response => {
          var ad = response.data;
          this.setState({ value: ad })
          console.log(ad)

      },
      error => {

      }
  );
  this.downloadFileCtrl = (e, fieldname, val) => {

    nofaServices.downloadOrgFiles(this.props.peramid, fieldname, val).then(
      response => {
        //window.open(API_URL_NEW + 'files/' + this.state.sid + '/' + fieldname + '/' +val);
       
      },
      error => {

      }
    );
  }


    }
  // Handle the input change

render(){
  const peramid = this.props.peramid 
 
return (

  <div>
    <PanelBar>
      <PanelBarItem expanded={true} title={"Organization Info"}>
        <FormGroup row>

          <Col lg="6">
            <Field
              component={FormInput}
              id={"name"}
              key={"name"}
              type="text"
              name="name"
              label="Organization Name"
              validator={required} />
          </Col>
          {/* <Col lg="6">
              <Field 
                component={FormDropDownList}
               
                type="select"
                name="org_type"
                label="Organization Type"
                validator={required} />
            </Col> */}

        </FormGroup>
        <FormGroup row>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"address"}
              key={"address"}
              type="text"
              name="address"
              label="Street Address"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"county"}
              key={"county"}
              type="text"
              name="county"
              label="County"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"city"}
              key={"city"}
              type="text"
              name="city"
              label="City"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"state"}
              key={"state"}
              type="text"
              name="state"
              label="State"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"zip"}
              key={"zip"}
              type="text"
              name="zip"
              label="ZIP"
            />
          </Col>
        </FormGroup>
      </PanelBarItem>
    </PanelBar>

    <PanelBar>
      <PanelBarItem expanded={true} title={"Contact"}>
        <FormGroup row>

          <Col lg="6">
            <Field
              component={FormInput}
              id={"contact_email"}
              key={"contact_email"}
              type="text"
              name="contact_email"
              label="Email"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"contact_name"}
              key={"contact_name"}
              type="text"
              name="contact_name"
              label="Name"
            />
          </Col>

        </FormGroup>
        <FormGroup row>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"contact_title"}
              key={"contact_title"}
              type="text"
              name="contact_title"
              label="Title"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}
              id={"contact_phone"}
              key={"contact_phone"}
              type="text"
              name="contact_phone"
              label="Phone No"
            />
          </Col>


        </FormGroup>
      </PanelBarItem>
    </PanelBar>
    <Field
      id={"alt_contact"}
      key={"alt_contact"}
      component={FormCheckbox}
      onChange={this.handleChange}
      type="checkbox"
      name="alt_contact"
      label="Alternative Contact"
      checked={this.state.checked}
    />
    {this.state.checked ?
      <PanelBar>
      <PanelBarItem expanded={true} title={"Alternative Contact"}>
        <FormGroup row>
        
          <Col lg="6">
            <Field
              component={FormInput}

              type="text"
              name="alt_contact_email"
              label="Email"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}

              type="text"
              name="alt_contact_name"
              label="Name"
            />
          </Col>

        </FormGroup>
        <FormGroup row>
          <Col lg="6">
            <Field
              component={FormInput}

              type="text"
              name="alt_contact_title"
              label="Title"
            />
          </Col>
          <Col lg="6">
            <Field
              component={FormInput}

              type="text"
              name="alt_contact_phone"
              label="Phone No"
            />
          </Col>


        </FormGroup>
      </PanelBarItem>
    </PanelBar>

      : null}
    <PanelBar>
      <PanelBarItem expanded={true} title={"Organizational Document for Locality"}>
        <FormGroup row>
          <Col xs="12" lg="6">
            <Field
              key={"cert_legal_disc"}
              id={"cert_legal_disc"}
              name="cert_legal_disc"
              component={FormUpload}
              label="Certification & Legal Disclosure"
              batch={true}
              defaultFiles={[]}
              multiple={true}
              withCredentials={false}
              saveUrl={API_URL_TEST + "organization/"+peramid+"/cert_legal_disc"}
            />
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
          <Col xs="12" lg="6">
            <Field
              key={"resolution"}
              id={"resolution"}
              name="resolution"
              component={FormUpload}
              label="Resolution"
              batch={true}
              defaultFiles={[]}
              multiple={true}
              withCredentials={false}
              saveUrl={API_URL_TEST + "organization/"+peramid+"/resolution"}
            />
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
      </PanelBarItem>
    </PanelBar>
  </div>
)
    }
  

}

export default OrgInfo