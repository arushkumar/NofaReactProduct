import React, { Component, useState } from 'react';
import { Field,FormElement ,Form } from '@progress/kendo-react-form';
import { FormTextArea, FormNumericTextBox,  FormDropDownList } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import Tabs from './TabComponent/Tabs'
import { required } from './validators';
import MeasureTbl  from  './MeasueTable';
 import {SubAttribute } from "./data";
const API_URL = `${process.env.REACT_APP_URL}` + 'api/test/';
import adminServices from '../services/adminServices'
class PerformanceMeasure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isActive: false,
            RfpResponceId: "",
            datavalue:"", 
            bmpAttributeId:"",
            
            tableValue: "",

            defaultItem: [{ VALUE :"SLECT ",  ID : 1}],
            
           
            PurposeList:[], waterbody:[],LandUse:[],sitecondition:[],implementation:[],
            tmdl:[], bmps:[],bmpsSubAttList:[],sampling:[],
        };

        this._tablenewVal = "";
        this.purposeList = this.purposeList.bind(this);
        this.waterbodyList = this.waterbodyList.bind(this);
        this.LandUseList = this.LandUseList.bind(this);
        this.siteconditionList = this.siteconditionList.bind(this);
        this.implementationList = this.implementationList.bind(this);
        this.tmdlList = this.tmdlList.bind(this);
        this.bpmsList = this.bpmsList.bind(this);
        this.samplingList =this.samplingList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.CheckFunction = this.CheckFunction.bind(this);
        // this.bmpsSubAttList = this.bmpsSubAttList.bind(this);


    }

    CheckFunction = (props) =>{

        console.log("enter in function");
      <MeasureTbl {...props} data = "BMPs" >
          
      </MeasureTbl>
    }

    purposeList =() =>{
        const datavalue ={
            MEASURED_ID:"1"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ PurposeList: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    waterbodyList =() =>{
        const datavalue ={
            MEASURED_ID:"2"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ waterbody: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    LandUseList =() =>{
        const datavalue ={
            MEASURED_ID:"3"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ LandUse: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    siteconditionList =() =>{
        const datavalue ={
            MEASURED_ID:"4"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ sitecondition: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }

    implementationList =() =>{
        const datavalue ={
            MEASURED_ID:"5"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ implementation: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    tmdlList =() =>{
        const datavalue ={
            MEASURED_ID:"6"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ tmdl: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    bpmsList =() =>{
        const datavalue ={
            MEASURED_ID:"7"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ bmps: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    samplingList =() =>{
        const datavalue ={
            MEASURED_ID:"8"
        }
        adminServices.getPreAttNameByMeasureId(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ sampling: list })
                console.log("alldata", list)
            },
            error => {
            }
        );
    }
    
    componentDidMount() {
        const RfpRespId = sessionStorage.getItem('RfpResponceID');          
        this.setState({
            RfpResponceId: RfpRespId,          
        });
        this.purposeList();
        this.waterbodyList();      
        this.LandUseList();
        this.siteconditionList();
        this.implementationList();
        this.tmdlList();
        this.samplingList();
        this.bpmsList();
    }

    handleShow = () => {
        this.setState({
            isActive: true
        })
    }

    handleHide = () => {
        // this.setState({
        //     isActive: false
        // })        
    }

    onClick = (event) => {
        console.log("target", event.target.value.id)      
        console.log("defaultItem", this.state.defaultItem)       
    }

    onClickBmps = (event) => {
        // console.log("targetBMPS", event.target.value.ID)     


        const datavalue ={
            NAME_ID: event.target.value.ID
        }
        
        adminServices.getPreSubAttByName(datavalue).then(
            response => {
                var list = response.data.data;
                this.setState({ bmpsSubAttList: list })
                // console.log("alldata", response.data.data[0].ID)

                var valueUser = {    
                    BMP_Group: this.state.bmps.find(b => b.ID === event.target.value.ID),    
                    BMP_SubGroup: this.state.bmpsSubAttList.find(f => f.ID === list[0].ID)        
                }
                this.setState({defaultItem: valueUser});
            },
            error => {
            }
        );
         
      
    }

    handleSubmit = (dataItem) =>{ 
        //   alert(JSON.stringify(dataItem, null, 2));
        
          this.setState({
            isActive: false
        })
        // console.log("RfpResponceId", dataItem.SubAttribute_Name.ID)
        if(dataItem.SubAttribute_Name){
        this.state.datavalue ={
            Name:"Purpose",
            Att_Name: dataItem.Attribute_Name.NAME,
            Sub_Att_Name: dataItem.SubAttribute_Name.AttName,
            value:dataItem.Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }
        console.log("purpose")
    }
    else if(dataItem.Waterbody_Attribute_Name){
        console.log("waterbody")
        this.state.datavalue ={
            Name:"Waterbody",
            Att_Name: dataItem.Waterbody_Attribute_Name.NAME,
            Sub_Att_Name: dataItem.Waterbody_SubAttribute_Name.AttName,
            value:dataItem.Waterbody_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }
    }
    else if(dataItem.Landuse_Attribute_Name){
        // console.log("land use")
        this.state.datavalue ={
            Name:"Land Use",
            Att_Name: dataItem.Landuse_Attribute_Name.NAME,
            Sub_Att_Name: dataItem.Landuse_SubAttribute_Name.AttName,
            value:dataItem.Landuse_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }
    }
    else if(dataItem.Site_Attribute_Name){        
        this.state.datavalue ={
            Name:"Site Condition",
            Att_Name: dataItem.Site_Attribute_Name.NAME,
            Sub_Att_Name: dataItem.Site_SubAttribute_Name.AttName,
            value:dataItem.Site_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }
    }
    else if(dataItem.Implement_Attribute_Name){       
        this.state.datavalue ={
            Name:"Implementation",
            Att_Name: dataItem.Implement_Attribute_Name.NAME,
            Sub_Att_Name: dataItem.Implement_SubAttribute_Name.AttName,
            value:dataItem.Implement_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }
    }
    else if(dataItem.Tmdl_Phase){       
        this.state.datavalue ={
            Name:"TMDL",
            Att_Name: dataItem.Tmdl_Phase.NAME,
            Sub_Att_Name: dataItem.Stresor.AttName,
            value:dataItem.Tmdl_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }
    }
    else if(dataItem.BMP_Group){ 
        
       
        this.state.datavalue ={
            Name:"BMPs",
            Att_Name: dataItem.BMP_Group.NAME,
            Sub_Att_Name: dataItem.BMP_SubGroup.VALUE,
            value:dataItem.BMP_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        } 
    //    {MeasureTbl("BMPs")}
    // this._tablenewVal = "BMPs"
    // console.log("bmp ", this._tablenewVal) 
      this.CheckFunction()
      
    }
    else if(dataItem.Sampling_Attribute_Name){       
        this.state.datavalue ={
            Name:"Sampling",
            Att_Name: dataItem.Sampling_Attribute_Name.NAME,
            Sub_Att_Name: dataItem.Sampling_SubAttribute_Name.AttName,
            value:dataItem.Sampling_Percentage,
            rfp_responce_id:this.state.RfpResponceId
        }

        
      
    //   console.log("bmp value", this.state.tableValue)
    }
    else{
        this.state.datavalue ={
            Name:"Comments",
            Att_Name: dataItem.Comments,
            Sub_Att_Name: "",
            value:"",
            rfp_responce_id:this.state.RfpResponceId
        }
    }
        adminServices.createPeroformanceMeasure(this.state.datavalue).then(
            response => {
               // alert("saved")
        this.purposeList();
        this.waterbodyList();      
        this.LandUseList();
        this.siteconditionList();
        this.implementationList();
        this.tmdlList();
        this.samplingList();
        this.bpmsList();        
        
            },
            error => {
            }
        );
        }

    render() {

        
        return (

            <div>
                <center><h3>Performance Measurement</h3></center>

                <Tabs>
                    <div label="Purpose">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Purpose"}>
                            
                                {this.state.isActive ?
                                    <div className='' >
                                      <Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement                                        
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                                
                                                <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Attribute_Name"
                                                        data={this.state.PurposeList}
                                                        textField="NAME"
                                                        dataItemKey="ID"   
                                                        label="Attribute Name"                                               
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                                
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="SubAttribute_Name"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        dataItemKey="ID"  
                                                        label = "SubAttribute Name"                                                
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>

                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                               
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                      
                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button primary ={true} onClick={this.handleShow}>
                                            Add Purpose +
                                        </Button>
                                    </div>}

                            </PanelBarItem>
                        </PanelBar>
                        
                        <MeasureTbl data = {"Purpose"}/>

                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="Waterbody">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Waterbody"}>
                                {this.state.isActive ?
                                    <div className='' >

                                      <Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                              
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Waterbody_Attribute_Name"
                                                        data={this.state.waterbody}
                                                        textField="NAME"
                                                        label="Attribute Name"
                                                        dataItemKey="ID"                                                  
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>

                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Waterbody_SubAttribute_Name"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        dataItemKey="ID"  
                                                        label = "Sub Attribute Name"                                                
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>
                                                   
                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Waterbody_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                     

                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add Waterbody +
                                        </Button>
                                    </div>}
                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"Waterbody"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="Land Use">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Land Use"}>
                            {this.state.isActive ?
                                    <div className='' >

<Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                           
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Landuse_Attribute_Name"
                                                        data={this.state.LandUse}
                                                        textField="NAME"
                                                        label = "Attribute Name"
                                                        dataItemKey="ID"                                                  
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                                 
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Landuse_SubAttribute_Name"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        label = "Sub Attribute Name"
                                                        dataItemKey="ID"                                                  
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>
                                                
                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Landuse_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                    
                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add Land Use +
                                        </Button>
                                    </div>}
                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"Land Use"}/>
                        
                    </div>
                    <div label="Site Condition">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Site Condition"}>
                            {this.state.isActive ?
                                    <div className='' >

<Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement
                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                            
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Site_Attribute_Name"
                                                        data={this.state.sitecondition}
                                                        textField="NAME"
                                                        dataItemKey="ID"  
                                                        label="Attribute Name"                                                
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                                    
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Site_SubAttribute_Name"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        label="Sub Attribute Name"
                                                        dataItemKey="ID"                                                  
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>

                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Site_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                    
                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add Site Condition +
                                        </Button>
                                    </div>}
                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"Site Condition"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="Implementation">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Implementation"}>
                            {this.state.isActive ?
                                    <div className='' >

<Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement
                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                              
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Implement_Attribute_Name"
                                                        data={this.state.implementation}
                                                        textField="NAME"
                                                        dataItemKey="ID"   
                                                        label="Attribute Name"                                               
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                                    
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Implement_SubAttribute_Name"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        label="Sub Attribute Name"
                                                        dataItemKey="ID"                                                  
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>

                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Implement_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                 

                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add Implementation +
                                        </Button>
                                    </div>}

                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"Implementation"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="TMDL">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"TMDL"}>
                            {this.state.isActive ?
                                    <div className='' >
                                        
                                      <Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement
                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                         
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Tmdl_Phase"
                                                        data={this.state.tmdl}
                                                        textField="NAME"
                                                        dataItemKey="ID"     
                                                        label = "Tmdl Phase"                                             
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Stresor"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        dataItemKey="ID"   
                                                        label= "Stresor"                                               
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>

                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Tmdl_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                   
                                     
                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add TMDL +
                                        </Button>
                                    </div>}
                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"TMDL"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="BMPs">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"BMPs"}>
                            {this.state.isActive ?
                                    <div className='' >
                                  <Form
                                       initialValues={this.state.defaultItem}
                                       key={JSON.stringify(this.state.defaultItem)}
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement
                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                         
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClickBmps}
                                                        type="text"
                                                        name="BMP_Group"
                                                        data={this.state.bmps}
                                                        textField="NAME"
                                                        dataItemKey="ID"   
                                                        label="BMP Group"                                               
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                                   
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="BMP_SubGroup"
                                                        data={this.state.bmpsSubAttList}
                                                        textField="VALUE"
                                                        dataItemKey="ID"     
                                                        label="BMP Sub Group"                                             
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                        // defaultItem={this.state.defaultItem}
                                                    />
                                                </div>

                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="BMP_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                            
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                   

                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add BMPs +
                                        </Button>
                                    </div>}

                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"BMPs"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="Sampling">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Sampling"}>
                            {this.state.isActive ?
                                    <div className='' >

                                  <Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement
                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                              
                                                 <div className="mb-12">
                                                <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Sampling_Attribute_Name"
                                                        data={this.state.sampling}
                                                        textField="NAME"
                                                        dataItemKey="ID" 
                                                        label="Attribute Name"                                                 
                                                        placeholder="Start typing..."
                                                    />
                                                 </div>
                                                    
                                                <div className="mb-12">
                                               <Field component={FormDropDownList}
                                                        value={this.state.value}
                                                        onChange={this.onClick}
                                                        type="text"
                                                        name="Sampling_SubAttribute_Name"
                                                        data={SubAttribute}
                                                        textField="AttName"
                                                        dataItemKey="ID"   
                                                        label= "Sub Attribute Name"                                               
                                                        placeholder="Start typing..."
                                                        validator={required}
                                                    />
                                                </div>

                                                <div className="mb-12">
                                               <Field component={FormNumericTextBox}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Sampling_Percentage"
                                                        label="Percentage"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />
                                    

                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add Sampling +
                                        </Button>
                                    </div>}
                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"Sampling"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                    <div label="Comments">
                        <PanelBar>
                            <PanelBarItem expanded={true} title={"Comments"}>
                            {this.state.isActive ?
                                    <div className='' >

                                     <Form
                                        onSubmit={this.handleSubmit}
                                         render={(formRenderProps) => (
                                        <FormElement
                                            
                                         >
                                           <fieldset className={"k-form-fieldset"}>
                                                                                                                                      
                                                <div className="mb-12">
                                               <Field component={FormTextArea}
                                                        value={this.state.value}
                                                        type="text"
                                                        name="Comments"
                                                        label="Comments"
                                                        dataItemKey={"id"}
                                                    />
                                               </div>
                                           </fieldset>
                                            <div className="k-form-buttons">
                                               <Button
                                                    primary ={true}
                                                     type={"submit"}
                                                     className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                                                     disabled={!formRenderProps.allowSubmit}
                                                 >
                                                  Submit
                                               </Button>
                                           </div>
                                     </FormElement>
                                     )}
                                     />                                 


                                    </div> : <div className="d-flex align-items-right justify-content-right">
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Add Comments +
                                        </Button>
                                    </div>}
                            </PanelBarItem>
                        </PanelBar>
                        <MeasureTbl data = {"Comments"}/>
                        {/* <FieldArray name="users" component={FormGrid} /> */}
                    </div>
                </Tabs>


            </div>
        )
    }
}
export default PerformanceMeasure