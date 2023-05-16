import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { FormTextArea, FormDropDownList, FormInput, FormCheckbox } from './form-components';
import { Col, FormGroup, Table, Button } from 'reactstrap';
import nofaServices from '../services/adminServices';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal'
import { useHistory } from "react-router-dom";


const Nofa = () => {

    const history = useHistory();

    const [showCategory, setShowCategory] = useState(false);
    const handleCloseCategory = () => setShowCategory(false);
    const [loader, setLoader] = React.useState(true)
    const handleShow1 = () => setShowCategory(true);
    const handleShow2 = () => setShow(true);
    const [showElement, setShowelement] = useState(false);
    const [showTabElement, setShowTabelement] = useState(false);

    const handleShowElement = () => {
        setShowelement(true);
        //  sessionStorage.removeItem('NofaLineItemId');
        setUser("")
        setID("")

    }
    const handleCloseElement = () => setShowelement(false);

    const [nofaData, setNofaData] = React.useState([]);

    const [tabCataegory, setTabCategory] = React.useState([]);
    const [nofalineitemtype, setNofalineitemtype] = React.useState([]);
    const [Nofaname, setNofaname] = useState(sessionStorage.getItem('NofaTitle'));
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));
    const [NofaTabIds, setNofaTabIds] = useState(sessionStorage.getItem('NofaTabId'));
    const [TabName, setTabname] = useState(sessionStorage.getItem('NofaTabName'));
    const [ElementID, setElementID] = useState(sessionStorage.getItem('NofaLineItemId'));
    const [user, setUser] = React.useState();
    const [item, setItemtype] = React.useState();

    const seqData = ['textbox', 'checkbox', 'radio']

    const [Idd, setID] = useState()

    const getAllCategory = () => {
        const datavalueSub = {
            "tabid": NofaTabIds,
        }
        // console.log("TABID",NofaTabIds)
        nofaServices.getNofaTabSubCategory(datavalueSub).then(
            response => {
                var category = response.data.data;
                setTabCategory(category)
                // console.log(nofa)
            },
            error => {
            }
        );
    }
    const getNofalineItem = () => {
        const datavalueforElement = {
            "nofa_id": Nofid,
            "tabid": NofaTabIds
        }
        nofaServices.getNofaItemByNofaIdNofaTabId(datavalueforElement).then(
            response => {
                setLoader(false)
                const tabsdata = response.data.data;
                setNofaData(tabsdata);


            },
            error => {
            }
        );
    }
    useEffect(() => {
        getNofalineItem();
        nofaServices.getNofalineItemsType().then(
            response => {
                var nofa = response.data.data;
                //console.log('list');
                setNofalineitemtype(nofa)
            },
            error => {
            }
        );

        getAllCategory();


        handleShow3();

    }, []);


    const handleShow3 = (tabid, tabname) => {
        setShowTabelement(true);

    };

    const handleSubmitCategory = (dataItem) => {

        const datavalue = {
            "tab_category": dataItem.tab_category,
            "tab_category_desc": dataItem.tab_category_desc,
            "tabid": NofaTabIds,

        }
        nofaServices.creatTabSubCategory(datavalue).then(
            response => {
                handleCloseCategory();
                // alert("Sub category added")
                getAllCategory();
            },
            error => {
            }
        );
    }
    const handleSubmitElement = (dataItem) => {

        setLoader(true)

        if (Idd === "") {
            console.log("insert",dataItem.required)
            const datavalue = {
                "name": dataItem.title,
                "discription": dataItem.Description,
                "nofa_id": Nofid,
                "nofa_line_item_typeid": dataItem.itemtype.ID,
                "tab_sub_cat_id": (!dataItem.itemSubtype) ? "" : dataItem.itemSubtype.ID,
                "required": (dataItem.required === undefined)? "0":"1",                
                "nofa_tab_id": NofaTabIds
            }

            nofaServices.createNofaLineItem(datavalue).then(
                response => {
                    // handleClose();
                    sessionStorage.setItem('NofaLineItemId', response.NofaLineItemId);
                    sessionStorage.setItem('NofaResponceId', response.NofaResponceId);
                    // alert("Nofa Tab saved successfully")
                    handleCloseElement();
                    getNofalineItem();
                },
                error => {
                }
            );
        } else {
            console.log("update")
            const datavalue = {
                "elementName": dataItem.title,
                "description": dataItem.Description,
                "nofa_line_item_typeid": dataItem.itemtype.ID,
                "tab_sub_cat_id": (!dataItem.itemSubtype) ? "" : dataItem.itemSubtype.ID,
                "required": dataItem.required,
                "element_id": Idd
            }

            nofaServices.updateElementByTabID(datavalue).then(
                response => {

                    handleCloseElement();
                    getNofalineItem();
                    // sessionStorage.removeItem('NofaLineItemId');
                },
                error => {
                }
            );
        }


    };

    const gotToForm = (id, TITLE) => {

        console.log("add")

        sessionStorage.setItem('NofaLineItemId', id);
        setID(id)
        setShowelement(true);

        const datavalue = {
            "Element_id": id
        }
        setLoader(true)
        nofaServices.getElementByLineItemid(datavalue).then(
            response => {
            setLoader(false)
                var Element = response.data.data;
                console.log("checked",Element.REQUIRED)
                // const initalElementValue = nofalineitemtype.find(f => f.ID === Element.NOFA_LINE_ITEM_TYPE_ID);

                let valueUser = {
                    title: Element.NAME,
                    Description: Element.Description,
                    itemtype: nofalineitemtype.find(f => f.ID === Element.NOFA_LINE_ITEM_TYPE_ID),
                    itemSubtype: (!Element.TAB_SUB_CATEGORY_ID) ? "" : tabCataegory.find(x => x.ID === Element.TAB_SUB_CATEGORY_ID),
                    required : (Element.REQUIRED === 1)? true : false 

                }
                setUser(valueUser);
            },
            error => {

            }
        );


    }
    const backtonofa = () => {

        history.push({
            pathname: '/nofa-grid-tab'
        });
    };
    const deleteElement = (id) => {

        console.log("delete id", id)

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
                const value = {
                    element_id: id
                }
                setLoader(true)
                nofaServices.deleteElementByID(value).then(
                    response => {
                        getNofalineItem()
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
    // const handleChange = event => {
    //     setValue(event.value);
    //   };


    const renderHeader = () => {
        let headerElement = ['element', 'TYPE', 'REQUIRED', 'OPERATIONS']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return nofaData && nofaData.map(({ ID, ELEMENT_NAME, ITEM_TYPE, REQUIRED }) => {
            return (
                <tr key={ID}>
                    {/* <td>{ID}</td> */}
                    <td>{ELEMENT_NAME}</td>
                    <td>{ITEM_TYPE}</td>
                    <td>{REQUIRED === 0 ? "No" : "Yes"}</td>
                    <td className='opration2'style={{
          width: "275px",
        }}>
                        <button className=" fourth btn btn-primary" onClick={() => gotToForm(ID)}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>


                        <button className=" fourth btn btn-danger" onClick={() => deleteElement(ID)}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                    </td>
                </tr>
            )
        })
    }


    return (

        <div className="container">
             {loader ?
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
            : <></>
        }
            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-10">
                        <h4 className="title-css"><i className="fa fa-home" aria-hidden="true"></i> {Nofaname}<span> <i className="fa fa-arrow-right" aria-hidden="true"></i> {TabName}</span></h4></div>
                    <div className="col-lg-2">
                        <a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a></div>
                </div>
                {/* <div>{nofaTabId}</div> */}
            </div>
            <div className="maintab">

                <div className="row">
                    <div className="col-md-6">
                        <div className="add-link-css">
                            <Button onClick={handleShowElement} className="btn btn-primary"><i className="fa fa-plus" aria-hidden="true"></i> Add Element </Button>

                            <Button onClick={handleShow2} className="btn btn-primary"><i className="fa fa-plus" aria-hidden="true"></i> Add Files</Button>
                        </div>
                    </div>


                </div>
                {showElement ?
                    <div className="AB434-CSS">
                        <div className="row">
                            <div className="col-md-12">
                                <Form
                                    initialValues={user}
                                    key={JSON.stringify(user)}
                                    onSubmit={handleSubmitElement}
                                    render={(formRenderProps) => (
                                        <FormElement

                                        >
                                            <fieldset className={"k-form-fieldset"}>
                                                <FormGroup row>
                                                    <Col lg="5">
                                                        <Field
                                                            // name={nofa.TYPE}
                                                            name="itemtype"
                                                            component={FormDropDownList}
                                                            label={"Line Item Type"}
                                                            data={nofalineitemtype}

                                                            textField={"TYPE"}
                                                            // onChange={handleChange}
                                                            value={item}
                                                            // dataItemKey={nofa.ID}
                                                            dataItemKey="ID"
                                                        />
                                                    </Col>
                                                    <Col lg="5">

                                                        <Field
                                                            // name={nofa.TYPE}
                                                            name="itemSubtype"
                                                            component={FormDropDownList}
                                                            label={"Tab Sub Category"}
                                                            data={tabCataegory}
                                                            textField={"TYPE"}
                                                            // dataItemKey={nofa.ID}
                                                            dataItemKey="ID"
                                                        />
                                                    </Col>

                                                    <Col lg="2">
                                                        <div className="add-link-css">
                                                            <div>Add Caregory</div>
                                                            <Button onClick={handleShow1} className="btn btn-primary">+ Add  Sub Cetegory </Button>
                                                        </div>
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

                                                    <Col lg="12">
                                                        <Field
                                                            name={"Description"}
                                                            type={"textarea"}
                                                            component={FormTextArea}
                                                            label={"Description"}

                                                        />
                                                    </Col>
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
                                            <div className=" btn123 margin-right-5">
                                                <button className=" fourth btn btn-primary"
                                                    type={"submit"}

                                                    disabled={!formRenderProps.allowSubmit}
                                                >
                                                    Submit
                                                </button>
                                                <button className=" fourth btn btn-primary"
                                                    type={"button"}
                                                    onClick={handleCloseElement}

                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </FormElement>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    : <div></div>
                }
                {/* ********************************************Add sub Category ********************************/}
                <div className="AB434-CSS">
                    <Modal show={showCategory} onHide={handleCloseCategory} centered>
                        <Modal.Header closeButton>
                            <Modal.Title> TAB SUB CATEGORY</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-10 offset-md-1">
                                    <Form
                                        onSubmit={handleSubmitCategory}
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
                                                                name={"tab_category"}
                                                                // type={"textarea"}
                                                                component={FormInput}
                                                                label={"Name"}

                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                    <FormGroup row>
                                                        <Col lg="12">
                                                            <Field
                                                                name={"tab_category_desc"}
                                                                // type={"textarea"}
                                                                component={FormTextArea}
                                                                label={"Description"}
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


                <div className="AB434-CSS">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <table id='employee' className="table">
                                <thead>
                                    <tr>{renderHeader()}</tr>
                                </thead>
                                <tbody>
                                    {renderBody()}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>


                <div>




                </div>
            </div>
        </div>
    );
};
export default Nofa