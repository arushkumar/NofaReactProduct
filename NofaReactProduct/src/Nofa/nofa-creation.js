import React, { useState, useEffect } from "react";


import { useHistory } from "react-router-dom";

import adminServices from '../services/adminServices';
import moment from "moment";


const NofaCreation = () => {
    const [nofa, setNofa] = React.useState([]);
    const [show, setShow] = useState(false);
    const [loader, setLoader] = React.useState(true)
    const handleClose = () => setShow(false);
   
    const user = JSON.parse(sessionStorage.getItem('user'));


    // const handleShow = () => setShow(true);


    const history = useHistory();

    const handleShow = (id, tit) => {
       
        history.push({
            pathname: '/nofa' //change link based on what application they selected
        });
        sessionStorage.setItem("NofaId", id)
        sessionStorage.setItem("Nofa", tit)
      
    }

    const handleSubmit = (dataItem) => {

        // alert(JSON.stringify(dataItem, null, 2));

        adminServices.createNofa(dataItem).then(
            response => {

                sessionStorage.setItem('NofaId', response.nofaid);
                sessionStorage.setItem('NofaTitle', response.nofa_title);
                // alert("Nofa saved successfully")

                //window.location.href = "/faast/nofaDB";
                history.push({
                    pathname: '/form' //change link based on what application they selected
                });
                // setNofa(nofa)
            },
            error => {
            }
        );
    }

    const UploadNofa = () => {
        // console.log("partyid", user.PARTIES_ID)

        // const datavalue = {
        //     partiesid: user.PARTIES_ID
        // }

        adminServices.getNofa().then(
            response => {
                setLoader(false)
                var nofa = response.data.data;
                setNofa(nofa)

                // console.log("goor")
            },
            error => {
            }
        );

    }
   
    useEffect(() => {

        setTimeout(function () {
            
            const user = JSON.parse(sessionStorage.getItem('user'));
            console.log(user)
            UploadNofa();
        }, 1000);


    }, []);

    const gotToPrivileges = (id, TITLE) => {

        history.push({
            pathname: '/privileges/'+id
        });
        sessionStorage.setItem('NofaId', id);
        sessionStorage.setItem('NofaTitle', TITLE);
    }
    const gotToGridTab = (id, TITLE) => {

        const datavalue = {
            "tab_name": "",
            "nofa_id": id,
            // "TAB_SEQUENCE": item.TAB_SQUENCE,
        }

        nofaServices.createNofaTabwithNofa(datavalue).then(
            response => {
                sessionStorage.setItem('NofaId', id);
                sessionStorage.setItem('NofaTitle', TITLE);
                history.push({
                    pathname: '/nofa-grid-tab'
                });
                // }

            },
            error => {
            }
        );
        // sessionStorage.setItem('NofaId', id);
        // sessionStorage.setItem('NofaTitle', TITLE);
    }
    // var mydate = new Date('2022-03-18T03:29:00.000Z');
    // var str = mydate.toString("yyyy-MM-DD hh:mm:ss");
    // alert(str);

    const renderHeader = () => {
        let headerElement = ['TITLE', 'START DATE', 'END DATE', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    // const column = Object.keys(nofa[0]);
    // const renderHeader =()=>{
    
    //     return column.map((data)=>{
    //         return <th key={data}>{data}</th>
    //     })
    // }
    const renderBody = () => {
        return nofa && nofa.map(({ ID, TITLE, START_DATE, END_DATE }) => {
            return (
                <tr key={ID}>

                    <td>{TITLE}</td>
                    <td>{moment(START_DATE).utc().format('DD-MM-yyyy hh:mm:ss')}</td>
                    <td>{moment(END_DATE).utc().format('DD-MM-yyyy hh:mm:ss')}</td>
                    {/* <td>{users && users.map(({ IDs, STATUS }) => {
                        return (
                            <div key={IDs}>{STATUS}</div>
                        )
                    })}</td> */}
                    <td className='opration2'>
                        <button className=" fourth btn btn-primary" onClick={() => handleShow(ID, TITLE)}><i className="fa fa-eye" aria-hidden="true"></i> View Results</button>                      
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
                        <h4><i className="fa fa-list" aria-hidden="true"></i> LIST OF NOFAS </h4></div>
                   
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