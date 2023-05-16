import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import nofaServices from '../../services/adminServices';



const usersList = () => {
    const [users, setUserList] = React.useState([]);
    const [show, setShow] = useState(false);
    const [loader, setLoader] = React.useState(true)
    const handleClose = () => setShow(false);
    // const [partyId, setPartyId] = useState(sessionStorage.getItem('PARTIES_ID'));
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'))


    // const handleShow = () => setShow(true);


    const history = useHistory();

    const handleShow = (id) => {

        console.log("user id", id)

        history.push({
            pathname: '/user-edit/' + id//change link based on what application they selected
        });

    }


    const userList = () => {
       

        nofaServices.getUsers().then(
            response => {
                setLoader(false)
                const tab3 = response.data.data;
                setUserList(tab3);

            },
            error => {
            }
        );
    }

    useEffect(() => {
        setTimeout(function () {
            userList();
        }, 1000);


    }, []);
  

    
    const renderHeader = () => {
        let headerElement = ['USER NAME', 'STATUS', 'ROLES', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return users && users.map(({ ID, CREATED_BY,STATUS , USER_ROLE }) => {
            return (
                <tr key={ID}>

                    <td>{CREATED_BY}</td>
                    <td>{STATUS}</td>
                    <td>{USER_ROLE}</td>

                    <td className='opration2'>
                        <button className=" fourth btn btn-primary" onClick={() => handleShow(ID)}><i className="fa fa-edit" aria-hidden="true"></i> Edit</button>
                    </td>
                </tr>
            )
        })
    }

    return (

        <div className="container">


            <div className="row">
                {loader ?
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                    </div>
                    : <></>
                }
            </div>

            <div className="prviewcss">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-list" aria-hidden="true"></i> USERS</h4>
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
export default usersList