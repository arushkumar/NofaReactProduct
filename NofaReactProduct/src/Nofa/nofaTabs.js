import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormTextArea, FormDropDownList, FormAutoComplete, FormInput } from './form-components';
import { Col, FormGroup } from 'reactstrap';
import { useHistory } from "react-router-dom";
import nofaServices from '../services/adminServices';




const NofaTabs = (props) => {

    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));
    const [NofName, setNofaName] = useState(sessionStorage.getItem('NofaTitle'));
    const [TabId, setTabId] = useState(sessionStorage.getItem('NofaTabId'));
    const [user, setUser] = React.useState();
    const [tabSequence, setTabSequence] = React.useState();
    const [seqname, setseqname] = useState()
   



    // const seqData = [{text: "1", id: 1,},{text: "2",id: 2,},{text: "3",id: 3,}]
    const seqData = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']


    const TabSequence = () => {

        const dtavalue = {
            nofa_id: Nofid
        }

        nofaServices.getTabSequenceItem(dtavalue).then(
            response => {
                // setLoader(false)
                var tabSeq = response.data.data;
                // console.log("tabSeq", tabSeq)
                setTabSequence(tabSeq);
            },
            error => {

            }
        );
    }
  

    useEffect(() => {
        TabSequence();
        // TabList();

        // console.log("Tabss",TabId)
        if (!TabId) {

        } else {
            const datavalue = {
                "tab_id": TabId
            }

            nofaServices.getTabNameByTabId(datavalue).then(
                response => {
                    // setLoader(false)
                    // const tab = response.data;

                    var seque = response.data.TAB_SQUENCE
                    console.log("dolls", seque)
                    // setseqname(seque)
                    const tab = {
                        TAB_NAME: response.data.TAB_NAME,
                        TAB_SQUENCE: seque,
                    }
                    setUser(tab);

                },
                error => {

                }
            );
        }

    }, []);

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    const handleSubmit = (dataItem) => {
        // alert(JSON.stringify(dataItem, null, 2));
        if (!dataItem.TAB_SQUENCE) {
            alert("Please insert sequence value")

        } else {
            //console.log("sew", dataItem.TAB_SQUENCE)
            if (!TabId) {
                const datavalue = {
                    "TAB_NAME": dataItem.TAB_NAME,
                    "nofa_id": Nofid,
                    //"TAB_SEQUENCE":dataItem.TAB_SEQUENCE,
                    "TAB_SEQUENCE": dataItem.TAB_SQUENCE,
                }

                nofaServices.createNofaTab(datavalue).then(
                    response => {
                        if (response.data.value == "exist") {
                            alert("Already exist sequence")
                        } else {
                            history.push({
                                pathname: '/nofa-tab-add'
                            });
                        }
                    },
                    error => {
                    }
                );
            } else {
                const datavalue2 = {
                    "TAB_NAME": dataItem.TAB_NAME,
                    "tabseq": dataItem.TAB_SQUENCE,
                    "tab_id": TabId,
                    "nofa_id":Nofid
                }

                nofaServices.updateNofaTab(datavalue2).then(
                    response => {
                        if (response.data.value == "exist") {
                            alert("Already exist sequence")
                        } else {
                            history.push({
                                pathname: '/nofa-tab-add'
                            });
                        }
                    },
                    error => {
                    }
                );

             }
        }
    }
    const history = useHistory();
    const backtonofaTab = () => {

        history.push({
            pathname: '/nofa-tab-add'
        });
    };

    return (
        <div className="container">
            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4>{NofName}</h4>
                    </div>
                    <div className="col-lg-3">
                        <a className="text-align-right" onClick={backtonofaTab}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a></div>
                </div>

            </div>
            <div className="AB434-CSS12 ">

                <div className="AB434-CSS">

                    <div className="row">

                        <div className="col-md-8 offset-md-2">
                            <Form
                                initialValues={user}
                                key={JSON.stringify(user)}
                                onSubmit={handleSubmit}
                                render={(formRenderProps) => (
                                    <FormElement

                                    >
                                        <fieldset className={"k-form-fieldset"}>

                                            <FormGroup row>
                                                <Col lg="12">
                                                    <Field
                                                        name={"TAB_NAME"}
                                                        component={FormInput}
                                                        label={"Tab Name"}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col lg="12">
                                                    <Field
                                                        // name={"TAB_SEQUENCE"}
                                                        // component={FormInput}
                                                        // label={"Tab Sequence"}
                                                        // name="TAB_SQUENCE"
                                                        // component={FormDropDownList}
                                                        // label={"TAB_SEQUENCE"}
                                                        // data={tabSequence}
                                                        // textField={"TAB_SQUENCE"}
                                                        // // dataItemKey={nofa.ID}
                                                        // dataItemKey="ID"
                                                        name="TAB_SQUENCE"
                                                        component={FormDropDownList}
                                                        label={"Tab Sequence"}
                                                        data={seqData}
                                                    // value={value}
                                                    // onChange={handleChange}
                                                    //    textField={"TAB_SQUENCE"}                                                           
                                                    //    dataItemKey="TAB_SQUENCE"
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
                </div>
            </div>
        </div>
    );
};
export default NofaTabs