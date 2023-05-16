import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { MyGridCommandCell } from "./myGridComponent";
import { useHistory } from "react-router-dom";
// import { insertItem, getItems, updateItem, deleteItem } from "./services";
import nofaServices from '../../services/adminServices'
import Swal from 'sweetalert2';
const editField = "inEdit";

const gridTab = () => {
    const [data, setData] = React.useState([]);
    const [datanew, setDataNew] = React.useState([]);
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));
    const [NofName, setNofaName] = useState(sessionStorage.getItem('NofaTitle'));
    const history = useHistory();
    const [loader, setLoader] = React.useState(true)

    const TabList = () => {

        const datavalue = {
            nofa_id: Nofid
        }

        nofaServices.getNofatabsByNofaId(datavalue).then(
            response => {
                setLoader(false)
                const tab3 = response.data.data;
                setData(tab3);
                setDataNew(tab3)
                console.log("grid tab", tab3)
            },
            error => {
            }
        );
    }

    React.useEffect(() => {
        TabList();
    }, []);

    const backtonofaTab = () => {

        history.push({
            pathname: '/'
        });
    };

    const generateId = (data) => {
        const library = data;

        if (!library || (library && library.length === 0)) {
            return <div className="nodata">No Result</div>
        }
        return library.reduce((acc, lib) => {
            const libMax = Math.max(acc, lib.TAB_SQUENCE)
            // console.log("libMax",libMax)
            return libMax > acc ? libMax : acc
        }, 0)
    }

    const insertItem = (item) => {
        setLoader(true)
        item.TAB_SQUENCE = generateId(data) + 1;

        console.log("insert", item.TAB_SQUENCE)

        const datavalue = {
            "TAB_NAME": item.TAB_NAME,
            "nofa_id": Nofid,
            "TAB_SEQUENCE": item.TAB_SQUENCE,
        }

        nofaServices.createNofaTab(datavalue).then(
            response => {
                TabList();

            },
            error => {
            }
        );

    }

    const deleteItem = (item) => {
        
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
                    "TAB_NAME": "",
                    "tab_id": item.ID,
                }
                setLoader(true)
                nofaServices.deleteNofaTab(datavalue).then(
                    response => {
                        TabList()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )

                    },
                    error => {
                    }
                ); // TabList();



            } else {
                TabList()
            }

        })

    }

    const updateItem = (item) => {
        // console.log("Update", item)
        setLoader(true)
        const datavalue = {
            "TAB_NAME": item.TAB_NAME,
            "tab_id": item.ID,
        }
        nofaServices.updateTabNameByTabId(datavalue).then(
            response => {
               
                TabList();
            },
            error => {
            }
        );

    }


    const remove = dataItem => {
        const newData = deleteItem(dataItem);
        setData(newData);
    };

    const add = dataItem => {
        dataItem.inEdit = true;
        dataItem.ig = 0;
        const newData = insertItem(dataItem);
        setData(newData);
    };

    const element = dataItem => {
        // dataItem.inEdit = false;
        console.log("Add Element")
        history.push({
            pathname: '/form'
        });
        // sessionStorage.setItem('NofaId', id);
        sessionStorage.setItem('NofaTabId', dataItem.ID);
        sessionStorage.setItem('NofaTabName', dataItem.TAB_NAME);
    };

    const update = dataItem => {
        
        dataItem.inEdit = false;
        const newData = updateItem(dataItem);
        setData(newData);
    }; // Local state operations


    const discard = () => {
        const newData = [...data];
        newData.splice(0, 1);
        setData(newData);
    };

    const cancel = dataItem => {
        // console.log("cancel", dataItem.ID)
        const originalItem = datanew.find(p => p.ID === dataItem.ID);
        // console.log("originalItem",originalItem.ID)
        const newData = data.map(item => item.ID === originalItem.ID ? originalItem : item);
        // console.log("newData",newData)
        setData(newData);
    };

    const enterEdit = dataItem => {
        setData(data.map(item => item.ID === dataItem.ID ? {
            ...item,
            inEdit: true
        } : item));
    };

    const itemChange = event => {
        const newData = data.map(item => item.ID === event.dataItem.ID ? {
            ...item,
            [event.field || '']: event.value
        } : item);
        setData(newData);
    };

    const addNew = () => {
        const newDataItem = {
            inEdit: true,
            Discontinued: false
        };
        setData([newDataItem, ...data]);
    };

    const CommandCell = props =>
    (
        <MyGridCommandCell
            {...props}
            edit={enterEdit}
            remove={remove}
            element={element}
            add={add}
            discard={discard}
            update={update}
            cancel={cancel}
            editField={editField}
        />
    );

    return <div className="container">
        {loader ?
            <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
            : <></>
        }
        <div className="prviewcss">
            <div className="position-relative row form-group">
                <div className="col-lg-9">
                    <h4><i className="fa fa-home" aria-hidden="true"></i> {NofName}</h4>
                </div>
                <div className="col-lg-3">
                    <a className="text-align-right" onClick={backtonofaTab}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a></div>
            </div>

        </div>
        <div className="AB434-CSS12 ">

            <div className="AB434-CSS">

                <div className="row">
                    <div className="col-md-12 ">
                        <Grid id="employee" class="table" pageable={false} data={data} onItemChange={itemChange} editField={editField} >
                            <GridToolbar>
                                <div className="opration2">
                                    <button title="Add new" className="fourth btn btn-primary" onClick={addNew}>
                                        <i className="fa fa-plus" aria-hidden="true"></i> Add New Tab
                                    </button>
                                </div>

                            </GridToolbar>
                            <Column field="TAB_SQUENCE" title="SEQUENCE" width="120px" editable={false} />
                            <Column field="TAB_NAME" title="TAB NAME" />

                            <Column cell={CommandCell} title="OPERATIONS" width="400px" />
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

// ReactDOM.render(<App />, document.querySelector("my-app"));
export default gridTab