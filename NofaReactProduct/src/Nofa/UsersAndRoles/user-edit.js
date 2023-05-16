import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormTextArea, FormDateInput, FormDateRangePicker, FormDateTimePicker, FormInput,FormAutoComplete } from '../form-components';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../../services/adminServices';
import moment from "moment";
import { useHistory } from "react-router-dom";


const EditUser = (props) => {
    const history = useHistory();
    // const [partyId, setPartyId] = useState(sessionStorage.getItem('PARTIES_ID'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    const [UserID, setUserId] = useState(props.match.params.id);
    const [data, setData] = React.useState();

    const StatusData = [{status: "Blocked", id: 0,},{status: "Active",id: 1,}];

    const handleSubmit = (dataItem) => {

           alert(JSON.stringify(dataItem, null, 2));
        // console.log("partyid", user.PARTIES_ID)
        // var Sdata = moment(dataItem.start_date.start).utc().format('yyyy-MM-DD hh:mm:ss')
        // var Edata = moment(dataItem.start_date.end).utc().format('yyyy-MM-DD hh:mm:ss')
        // console.log("fdata", Sdata)
        // if (UserID == 0) {

        //     const value = {
        //         title: dataItem.title,
        //         desc: dataItem.desc,
        //         start_date: Sdata,
        //         end_date: Edata,
        //         PARTIES_ID: user.PARTIES_ID,
        //         user_id: user.user_Id
        //     }

        //     nofaServices.createNofa(value).then(
        //         response => {

        //             sessionStorage.setItem('NofaId', response.nofaid);
        //             sessionStorage.setItem('NofaTitle', response.nofa_title);

        //             history.push({
        //                 pathname: '/nofa-tab-add' //change link based on what application they selected
        //             });
        //             // setNofa(nofa)
        //         },
        //         error => {
        //         }
        //     );
        // } else {
        //     const value = {
        //         title: dataItem.title,
        //         desc: dataItem.desc,
        //         start_date: dataItem.start_date.start,
        //         end_date: dataItem.start_date.end,
        //         nofa_id: nofaID
        //     }

        //     nofaServices.updateNofaByNofaID(value).then(
        //         response => {
        //             history.push({
        //                 pathname: '/' //change link based on what application they selected
        //             });
        //             // setNofa(nofa)
        //         },
        //         error => {
        //         }
        //     );

        // }
    }

    const backtonofa = () => {

        history.push({
            pathname: '/user-list'
        });
    };

    useEffect(() => {
        // handleSubmit();
        console.log("myval", UserID)
       
       
            const datavalue = {
                user_id: UserID
            }

            nofaServices.getUserByUserId(datavalue).then(
                response => {

                    console.log("data", response.data.data)
                  
                    const userdata = {
                        Email: response.data.data.EMAIL_ID,
                        username: response.data.data.CREATED_BY, 
                         status: response.data.data.STATUS == 0?"Blocked":"Active"                    

                    }
                    setData(userdata);
                    // console.log("statis",data.IsActive )

                },
                error => {

                }
            );
       


    }, [])

    return (
        <div className="container">

            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-bars" aria-hidden="true"></i>  Edit User</h4>
                    </div>
                    <div className="col-lg-3">
                        <a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a></div>
                </div>

            </div>
            <div className="AB434-CSS12 ">
                <div className="AB434-CSS">

                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <Form
                                initialValues={data}
                                key={JSON.stringify(data)}
                                onSubmit={handleSubmit}
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
                                                        name={"Email"}
                                                        component={FormInput}
                                                        label={"Email"}
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>

                                                <Col lg="12">
                                                    <Field
                                                        name={"username"}
                                                        type={"textarea"}
                                                        component={FormInput}
                                                        label={"username"}

                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>

                                                <Col lg="12">
                                                    <Field
                                                        name={"status"}
                                                        component={FormAutoComplete}
                                                        label={"Status"}
                                                        data={StatusData}
                                                        textField={"status"}
                                                        dataItemKey={"id"}
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
export default EditUser