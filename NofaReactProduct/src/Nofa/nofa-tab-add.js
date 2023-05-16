import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import nofaServices from '../services/adminServices';
import Swal from 'sweetalert2';
const NofaCreation = () => {
    const [nofa, setNofa] = React.useState([]);
    const [nofTabs, setNofaTab] = React.useState([]);
    const [show, setShow] = useState(false);
    const [categoryShow, setCategoryShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow2 = () => setCategoryShow(true);
    const handleClose2 = () => setCategoryShow(false);
    const [Nofaname, setNofaname] = useState(sessionStorage.getItem('NofaTitle'));
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));
    const [NofaTabIds, setNofaTabIds] = useState(sessionStorage.getItem('NofaTabId'));

    const history = useHistory();

    const handleShow = () => {


        history.push({
            pathname: '/nofa-tabs'
        });
        sessionStorage.removeItem("NofaTabId");

    };
    const getAllTab = () => {
        const Nofadatavalue = {
            "nofa_id": Nofid,
        }
        nofaServices.getNofatabsByNofaId(Nofadatavalue).then(
            response => {
                var nofatab = response.data.data;
                setNofaTab(nofatab)
                console.log(nofa)
            },
            error => {
            }
        );
    }
    useEffect(() => {
        getAllTab()

    }, []);
    const renderHeader = () => {
        let headerElement = ['TAB NAME', 'Operations']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const gotToForm = (id, TITLE) => {

        history.push({
            pathname: '/form'
        });
        // sessionStorage.setItem('NofaId', id);
        sessionStorage.setItem('NofaTabId', id);
        sessionStorage.setItem('NofaTabName', TITLE);
    }
    const deleteTab = (id) => {

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
                    tab_id: id
                }
                nofaServices.deleteNofaTab(value).then(
                    response => {
                        getAllTab()
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



    const gotToFormEdit = (id, TITLE) => {        

        history.push({
            pathname: '/nofa-tabs'
        });
        // sessionStorage.setItem('NofaId', id);
        sessionStorage.setItem('NofaTabId', id);
        sessionStorage.setItem('NofaTabName', TITLE);
        // sessionStorage.setItem('NofaTabName', TITLE);
    }

    const renderBody = () => {
        return nofTabs && nofTabs.map(({ ID, TAB_NAME }) => {
            return (
                <tr key={ID}>
                    {/* <td>{ID}</td> */}
                    <td>{TAB_NAME}</td>

                    <td className='opration2'>
                        <button className=" fourth btn btn-primary" onClick={() => gotToFormEdit(ID, TAB_NAME)}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        <button className=" fourth btn btn-primary" onClick={() => gotToForm(ID, TAB_NAME)}><i className="fa fa-plus" aria-hidden="true"></i> Add Fields</button>
                        <button className=" fourth btn btn-danger" onClick={() => deleteTab(ID)}><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                    </td>


                </tr>
            )
        })
    }
    const backtonofa = () => {

        history.push({
            pathname: '/'
        });
    };
    return (

        <div className="container">

            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-home" aria-hidden="true"></i> {Nofaname}</h4></div><div className="col-lg-3">

                        <a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a>
                        <a className="text-align-right" onClick={handleShow}><i className="fa fa-plus" aria-hidden="true"></i> Add Tab </a>
                    </div>
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
            </div>
            <div>

            </div>

        </div>
    );
};
export default NofaCreation