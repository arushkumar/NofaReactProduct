import React, { useEffect, useState } from 'react';
import './ab434.css';
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";

import NofaItems from "./nofaLineItems";
import Nofa from "./nofa";
import NofaTab from "./nofaTab";
// import NofaType from "./nofaLineItemType";
import NofaFile from "./nofaFiles";
import NofaQues from './nofaQuestions'
import NofaLineItemPartyType from './nofaLineItemPartyType'
import { useHistory } from "react-router-dom";
import nofaServices from '../services/adminServices';
// import ContactList from './programSelection';
import Swal from 'sweetalert2';

function App(props) {

  // window.scrollTo({ top: 0, behavior: 'smooth' })

  // const Title = JSON.parse(sessionStorage.getItem('NofaTitle'));
  const [step, setStep] = React.useState(0);
  const bb = "" ;
  const history = useHistory();
  const [orientation, setOrientation] = React.useState("vertical");
  const [steps, setSteps] = React.useState([
  
    {
      label: "NOFA Tab",
      isValid: undefined,
    },
    {
      label: "NOFA Line Items",
      isValid: undefined,
    },
    {
      label: "NOFA Files",
      isValid: undefined,
    },
    {
      label: "NOFA Questions",
      isValid: undefined,
    },
    {
      label: "NOFA Line Item Party Type",
      isValid: undefined,
    },


  ]);
  const [loader, setLoader] = React.useState(false)
  const [formState, setFormState] = React.useState({});
  const [org, setOrg] = React.useState();

  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;

  //  console.log(form);
  //  console.log(customer);
  /*****************************/
  const handleChange = React.useCallback(
    (event) => {
      setStep(() => event.value);
    },
    [step, setStep],
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
  const isPreviousStepsValid =
    steps
      .slice(0, step)
      .findIndex((currentStep) => currentStep.isValid === false) === -1;

  const onStepSubmit = React.useCallback(
    (event) => {

      const { isValid, values } = event;
      const currentSteps = steps.map((currentStep, index) => ({
        ...currentStep,
        isValid: index === step ? isValid : currentStep.isValid,
      }));
      setSteps(currentSteps);
      if (!isValid) {
        return;
      }
      setStep(() => Math.min(step + 1, lastStepIndex));
      setFormState(values);

      console.log("form value", values)
      //  console.log("single1 value", values.nofa.ID)
      // console.log("single2 value", values.nofatab.ID)

      if (isPreviousStepsValid && isValid) {     

       

       
         if (step === 0) {
          nofaServices.createNofaTab(values).then(
            response => {
              alert("Nofa Tab saved successfully")

            },
            error => {
            }
          );

        }
        else if (step === 1) {
          const datavalue = {
            "name": values.name,
            "discription" : values.discription,
            "nofa_id": values.nofa.ID,
            "nofa_tab_id": values.nofatab.ID,
            "nofa_line_item_typeid": values.nofaLineItemType.ID,
            "required": '0'             
          }
          nofaServices.createNofaLineItem(datavalue).then(
            res => {
              console.log("send Id",res.NofaLineItemId)
              sessionStorage.setItem('NofaLineItemId', res.NofaLineItemId);
              sessionStorage.setItem('NofaResponceId', res.NofaResponceId);
              alert("Nofa Tab saved successfully")

            },
            error => {
            }
          );
        }
        else if(step === 2){
          const NofaLineItemid = JSON.parse(sessionStorage.getItem('NofaLineItemId'));
          const datavalue2 = {
            "file_title": values.file_title,
            "nofa_line_item_id" : NofaLineItemid,           
          }

          nofaServices.createNofaFile(datavalue2).then(
            res => {            
              sessionStorage.setItem('NofafileID', res.nofafileId);             
              alert("Nofa Tab saved successfully")

            },
            error => {
            }
          );

        }
        else if(step === 3){
          const NofaLineItemid = JSON.parse(sessionStorage.getItem('NofaLineItemId'));
          console.log(values.nofaQues)
          
          if(values.nofaQues === undefined){
              bb = "dgfd";
          }else{
             bb = values.nofaQues.ID;
          }
          // const datavalue3 = {
          //   "ques": values.ques,            
          //   "nofa_line_item_id": NofaLineItemid,
          //   "ques_type_id":values.nofaQuesType.ID,
          //   "ques_id":bb,
           
          // }
          
          // nofaServices.createNofaQuestions(datavalue3).then(
          //   res => {             
          //     alert("Nofa Line Item party  saved successfully")

          //   },
          //   error => {
          //   }
          // );

        }
        else{
          const NofaLineItemid = JSON.parse(sessionStorage.getItem('NofaLineItemId'));
          const datavalue4 = {
            "nofa_line_item_party_type": values.nofa_line_item_party_type,
            "nofa_line_item_party_desc" : values.nofa_line_item_party_desc,
            "nofa_line_item_id": NofaLineItemid,
            "category":"Person",
           
          }
          nofaServices.createNofaLineItemParty(datavalue4).then(
            res => {             
              alert("Nofa Line Item party  saved successfully")

            },
            error => {
            }
          );

        }
      

      }
    },
    [steps, isLastStep, isPreviousStepsValid, step, lastStepIndex]
  );
  const onPrevClick = React.useCallback(
    (event) => {
      event.preventDefault();
      setStep(() => Math.max(step - 1, 0));
    },
    [step, setStep],
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  return (
    <div className="container">
      <div className="AB434-CSS12">


        <div className="row">

          <div className="col-md-12">
            <div>
              <h1 className="headsec">Setup Nofa</h1>

            </div>
          </div>
        </div>
        <div className="AB434-CSS">
          <div className="row">

            <div className="col-md-3">
              <Stepper onChange={handleChange} value={step} items={steps} orientation={orientation} />
            </div>

            <div className="col-md-9">
              <Form
                initialValues={org}
                key={JSON.stringify(org)}
                onSubmitClick={onStepSubmit}
                render={(formRenderProps) => (
                  <div className="button-bootm"
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <FormElement>                      
                      {step === 0 && <NofaTab />}
                      {step === 1 && <NofaItems />}
                      {step === 2 && <NofaFile />}
                      {step === 3 && <NofaQues 
                      //  NofaTit={formRenderProps.valueGetter("Title")}
                      />}
                      {step === 4 && <NofaLineItemPartyType />}
                      

                      {/* {step === 0 && <OrgInfo
                        peramid={props.match.params.id}
                      />}
 {Nofa === 1 && <Nofa />} */}
                      <span
                        style={{
                          marginTop: "40px",
                        }}
                        className={"k-form-separator"}
                      />
                      <div
                        style={{
                          justifyContent: "space-between",
                          alignContent: "center",
                        }}
                        className={"k-form-buttons k-buttons-end"}
                      >
                        <span
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          Step {step + 1} of 5
                        </span>
                        <div className="btn123">

                          {step !== 0 ? (
                            <Button
                              style={{
                                marginRight: "16px",
                              }}
                              onClick={onPrevClick}
                            >
                              Previous
                            </Button>
                          ) : undefined}
                          <Button
                            primary={true}
                            disabled={!formRenderProps.allowSubmit}

                            onClick={formRenderProps.onSubmit}
                          >
                            {isLastStep ? "Submit" : "Next"}
                          </Button>
                        </div>
                      </div>
                    </FormElement>
                  </div>
                )}
              />
            </div>

          </div>

        </div>


      </div>


    </div>
  );
};
export default App;