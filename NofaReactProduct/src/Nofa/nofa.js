import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormTextArea, FormDateInput, FormDateRangePicker, FormDateTimePicker, FormInput } from './form-components';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
import moment from "moment";
import { useHistory } from "react-router-dom";
const Nofa = (props) => {
    const history = useHistory();
    // const [partyId, setPartyId] = useState(sessionStorage.getItem('PARTIES_ID'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    const [nofaID, setNofaId] = useState(props.match.params.id);
    const [nofas, setNofas] = React.useState();

    const handleSubmit = (dataItem) => {

        //    alert(JSON.stringify(dataItem, null, 2));
        console.log("partyid", user.PARTIES_ID)
        var Sdata =  moment(dataItem.start_date.start).utc().format('yyyy-MM-DD hh:mm:ss')
        var Edata =  moment(dataItem.start_date.end).utc().format('yyyy-MM-DD hh:mm:ss')
        console.log("fdata",Sdata)
        if (nofaID == 0) {

            const value = {
                title: dataItem.title,
                desc: dataItem.desc,
                start_date: Sdata,
                end_date: Edata,
                PARTIES_ID: user.PARTIES_ID,
                user_id: user.user_Id
            }

            nofaServices.createNofa(value).then(
                response => {

                    sessionStorage.setItem('NofaId', response.nofaid);
                    sessionStorage.setItem('NofaTitle', response.nofa_title);

                    history.push({
                        pathname: '/nofa-tab-add' //change link based on what application they selected
                    });
                    // setNofa(nofa)
                },
                error => {
                }
            );
        } else {
            const value = {
                title: dataItem.title,
                desc: dataItem.desc,
                start_date: dataItem.start_date.start,
                end_date: dataItem.start_date.end,
                nofa_id: nofaID
            }

            nofaServices.updateNofaByNofaID(value).then(
                response => {
                    history.push({
                        pathname: '/' //change link based on what application they selected
                    });
                    // setNofa(nofa)
                },
                error => {
                }
            );

        }
    }

    const backtonofa = () => {

        history.push({
            pathname: '/'
        });
    };

    useEffect(() => {
        // handleSubmit();
        console.log("myval", nofaID)
        if (nofaID == 0) {
        } else {
            const datavalue = {
                nofa_id: nofaID
            }

            nofaServices.getNofasByNofaId(datavalue).then(
                response => {

                    const Datevalue = {
                        start: new Date(response.data.data.START_DATE),
                        end: new Date(response.data.data.END_DATE),
                    };

                    const nofa = {
                        title: response.data.data.TITLE,
                        desc: response.data.data.DESCRIPTION,
                        start_date: Datevalue,

                    }
                    setNofas(nofa);

                },
                error => {

                }
            );
        }


    }, [])

    return (
        <div className="container">

            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-bars" aria-hidden="true"></i> Create Nofa</h4>
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
                                initialValues={nofas}
                                key={JSON.stringify(nofas)}
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
                                                        name={"title"}
                                                        component={FormInput}
                                                        label={"Title"}
                                                    />
                                                </Col>
                                            </FormGroup>

                                            <FormGroup row>

                                                <Col lg="12">
                                                    <Field
                                                        name={"desc"}
                                                        type={"textarea"}
                                                        component={FormTextArea}
                                                        label={"Description"}

                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>

                                                <Col lg="12">
                                                    <Field
                                                        name={"start_date"}
                                                        type={"textarea"}
                                                        component={FormDateRangePicker}
                                                    // value={Datevalue} show={true}
                                                    // format="dd/MMM/yyyy hh:mm:ss"


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
export default Nofa