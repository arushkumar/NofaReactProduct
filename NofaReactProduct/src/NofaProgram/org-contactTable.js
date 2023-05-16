import React, { useState, useEffect } from 'react';
import adminServices from '../services/adminServices'
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal'
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormTextArea,  FormInput } from './form-components';
import { Col, FormGroup, Table, Button } from 'reactstrap';

function OrgContactTable(props) {

  const [RfResponceId, setRfResponceId] = useState(sessionStorage.getItem('RfpResponceID'))
  const [Tabsdata, setTabsdata] = useState([])
  const [loader, setLoader] = useState(false)
  const [PropData, setPropData] = useState(props.tabledata) 
  const [showContactForm, setshowContactForm] = useState(false)
  const [contactData, setcontactData] = useState([])
  const user = JSON.parse(sessionStorage.getItem('user'));
  const[contactType, setcontactType]= useState()
  const[EmptyOperation ,setEmptyOperation] = useState(false)

  useEffect(() => {
    if (PropData) {
      if(PropData === "PreviewContactList"){
         setEmptyOperation(true)
         ContactTable(); 
      }
      else if(PropData == 'PreviewCooperatingList'){
        setEmptyOperation(true)
        CooperatingTable();
      }
      else if (PropData === "ContactList") {
        setEmptyOperation(false)
           ContactTable();      
           
      }else{
          console.log("cooprating ")
          setEmptyOperation(false)
          CooperatingTable();
      }
    }
  }, []);

const ContactTable = () =>{
  const datavalue = {      
    rfp_responce_id: RfResponceId
  }
  adminServices.getAllProjectContactbyRespID(datavalue).then(
    response => {
      setLoader(false)
      const ContactList = response.data.data
      setTabsdata(ContactList)
      //  console.log("dataList",PerformanceList)
      setPropData(null)
    },
    error => {
    }

  );
}
const CooperatingTable = () =>{
  const datavalue = {      
    rfp_responce_id: RfResponceId
  }
  adminServices.getAllCoopratingContactbyRespID(datavalue).then(
    response => {
      setLoader(false)
      const ContactList = response.data.data
      setTabsdata(ContactList)
      //  console.log("dataList",PerformanceList)
      setPropData(null)
    },
    error => {
    }

  );

}

  const deleteContactAndCooperating = (Valueid) => {
    console.log("ids", Valueid)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
        const datavalue = {
          Party_Id: Valueid,     
        }
        adminServices.DeleteProjectContactbyPartyID(datavalue).then(
          response => {
            // console.log("foi", response.data.data.TYPE)
            if (response.data.data.TYPE == "PROJECT_CONTACT"){
              ContactTable()
            }else{
              CooperatingTable()
            }
                  
                  Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                  )


                  // setNofa(nofa)
              },
              error => {
              }
          );
      }
  })
   

  }

  const editContactAndCooperating = (Valueid) =>{
    console.log("ids", Valueid)

    const datavalue = {
      Party_Id: Valueid,     
    }
    adminServices.getContAndCoopratingByPartyId(datavalue).then(
      response => {
     
          var valueUser = { 
            id: response.data.data.ID,       
            org_name: response.data.data.NAME,    
            first_name: response.data.data.FIRST_NAME,    
            last_name: response.data.data.LAST_NAME,    
            email: response.data.data.EMAIL_ADDRESS,    
            phone: response.data.data.PHONE_NUMBER,    
        }        
        setcontactData(valueUser);
        setcontactType(response.data.data.TYPE)     
            
          },
          error => {
          }
      );
     
    setshowContactForm(true)
  }
  const handleCloseForm = () =>{
    setshowContactForm(false)

  }
  const handleSubmitForm=(dataItem) =>{  

    if(contactType == 'PROJECT_CONTACT'){
      const RfpID = sessionStorage.getItem('RfpID');
    const datavalue = {
      org_name: dataItem.org_name,
      first_name: dataItem.first_name,
      last_name: dataItem.last_name,
      email: dataItem.email,
      phone: dataItem.phone,
      management_role_type: "PROJECT_CONTACT",
      rfp_id: RfpID,
      rfp_responce_id: RfResponceId,
      Person_party_id: dataItem.id
    }
    adminServices.createContact(datavalue).then(
      res => {
        // alert("Update Successfully")
        setshowContactForm(false)
        ContactTable();
        
        // setLoader(false)
      },
      error => {
      }
    );

    }else{
      const RfpID = sessionStorage.getItem('RfpID');
      const datavalue = {
        org_name: dataItem.org_name,
        first_name: dataItem.first_name,
        last_name: dataItem.last_name,
        email: dataItem.email,
        phone: dataItem.phone,
        management_role_type: "PROJECT_COOPERATING",
        rfp_id: RfpID,
        rfp_responce_id: RfResponceId,
        Person_party_id: dataItem.id
      }
      adminServices.createCooperating(datavalue).then(
        res => {
          // alert("Update Successfully")
          setshowContactForm(false)
          CooperatingTable();
          // setLoader(false)
        },
        error => {
        }
      );
  
    }

    
  }

  return (
    <div className="">      
      { 
        !EmptyOperation ?
       <div>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Organization Name</th>
                <th> Name</th>
                <th>Email</th>
                <th>PHONE NO</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {Tabsdata.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.NAME}</td>
                    <td>{val.FIRST_NAME} {val.LAST_NAME} </td>
                    <td>{val.EMAIL_ADDRESS}</td>
                    <td>{val.PHONE_NUMBER}</td>
                    <td className='opration2'>
                      {/* <button className='btn btn-primary' onClick={(e) => editContactAndCooperating(val.ID)} >Edit</button> */}
                      {/* <i className="fa fa-edit" onClick={(e) =>editContactAndCooperating(val.ID) } aria-hidden="true"></i> */}
                      <a href="javascript:{}" className='btn btn-primary' onClick={(e) =>editContactAndCooperating(val.ID) } aria-hidden="true"> Edit </a>
                      <a href="javascript:{}" className='btn btn-danger' onClick={(e) => deleteContactAndCooperating(val.ID)} aria-hidden="true"> Delete </a>
                      {/* <button className='btn btn-danger' onClick={(e) => deleteContactAndCooperating(val.ID)} >Delete</button> */}

                    </td>
                   
                  </tr>
                  
                )
              })}
            </tbody>
          </table>  
          </div> : 
      <div>
        <table className='table table-striped'>
            <thead>
              <tr>
                <th>Organization Name</th>
                <th> Name</th>
                <th>Email</th>
                <th>PHONE NO</th>
               
              </tr>
            </thead>
            <tbody>
              {Tabsdata.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.NAME}</td>
                    <td>{val.FIRST_NAME} {val.LAST_NAME} </td>
                    <td>{val.EMAIL_ADDRESS}</td>
                    <td>{val.PHONE_NUMBER}</td>                   
                   
                  </tr>
                  
                )
              })}
            </tbody>
          </table> 
          </div>       
    
      }

     <Modal show={showContactForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
           <Modal.Title> Contact </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="row">
            <div className="col-md-10 offset-md-1">
                <Form
                    onSubmit={handleSubmitForm}                    
                    initialValues={contactData}
                    key={JSON.stringify(contactData)}
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
                                            name={"org_name"}
                                            // type={"textarea"}
                                            component={FormInput}
                                            label={"Organization Name"}

                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col lg="6">
                                        <Field
                                            name={"first_name"}
                                            // type={"textarea"}
                                            component={FormInput}
                                            label={"First Name"}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <Field
                                            name={"last_name"}
                                            // type={"textarea"}
                                            component={FormInput}
                                            label={"Last Name"}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col lg="6">
                                        <Field
                                            name={"phone"}
                                            // type={"textarea"}
                                            component={FormInput}
                                            label={"Phone"}
                                        />
                                    </Col>
                                    <Col lg="6">
                                        <Field
                                            name={"email"}
                                            // type={"textarea"}
                                            component={FormInput}
                                            label={"Email"}
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
export default OrgContactTable