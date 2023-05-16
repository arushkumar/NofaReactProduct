import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormTextArea, FormAutoComplete, FormInput, FormCheckbox } from './form-components';
import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';
import { Link } from "react-router-dom";
const Nofa = () => {
    const [nofa, setNofa] = React.useState([]);
    const [nofatab, setNofatab] = React.useState([]);
    const [nofalineitemtype, setNofalineitemtype] = React.useState([]);

    const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));
    useEffect(() => {
        nofaServices.getNofa().then(
            response => {
                var nofa = response.data.data;
                setNofa(nofa)
            },
            error => {
            }
        );
        nofaServices.getNofalineItemsType().then(
            response => {
                var nofa = response.data.data;
                setNofalineitemtype(nofa)
            },
            error => {
            }
        );
        nofaServices.getNofatabs().then(
            response => {
                var nofa = response.data.data;
                setNofatab(nofa)
            },
            error => {
            }
        );
    }, []);
    return (
        <div className="container">
            <div className="AB434-CSS12 ">
                <div className="row">

                    <div className="col-md-12">
                        <div>
                            <h1 className="headsec">Nofa Line Item</h1>

                        </div>
                    </div>
                </div>
                <div className="AB434-CSS">

                    <div className="row">
                        <div className="col-md-4">
                            <div className="col-md-12">
                                <br />
                            </div>
                            <div className="col-md-12">
                                <div className='startbtn '>
                                    <Link to="/create-nofa" className="btn btn-primary">Create Nofa <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
                                </div>

                            </div>
                            <div className="col-md-12">
                                <div className='startbtn '>
                                    <Link to="/nofa-tabs" className="btn btn-primary">Create Nofa Tabs <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
                                </div>

                            </div>
                            <div className="col-md-12">
                                <div className='startbtn r'>
                                    <Link to="/nofa-line-item-type" className="btn btn-primary">Create Nofa Line Item Type <i className="fa fa-angle-double-right" aria-hidden="true"></i></Link>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-8">
                            <Form
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
                                                        name={nofa.TITLE}
                                                        component={FormAutoComplete}
                                                        label={"Nofa"}
                                                        data={nofa}
                                                        textField={"TITLE"}
                                                        dataItemKey={nofa.ID}
                                                    />
                                                </Col>
                                                <Col lg="12">
                                                    <Field
                                                        name={nofa.TAB_NAME}
                                                        component={FormAutoComplete}
                                                        label={"Nofa Tabs"}
                                                        data={nofatab}
                                                        textField={"TAB_NAME"}
                                                        dataItemKey={nofa.ID}
                                                    />
                                                </Col>
                                                <Col lg="12">
                                                    <Field
                                                        name={nofa.TYPE}
                                                        component={FormAutoComplete}
                                                        label={"Nofa Line Item Types"}
                                                        data={nofalineitemtype}
                                                        textField={"TYPE"}
                                                        dataItemKey={nofa.ID}
                                                    />
                                                </Col>
                                            </FormGroup>
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
                                                        name={"Description"}
                                                        type={"textarea"}
                                                        component={FormTextArea}
                                                        label={"Description1"}

                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>

                                                <Col lg="12">
                                                    <Field
                                                        name={"required"}
                                                        type={"checkbox"}
                                                        component={FormCheckbox}
                                                        label={"Required"}

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