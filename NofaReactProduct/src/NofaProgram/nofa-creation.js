import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import nofaServices from '../services/adminServices';
import moment from "moment";


const NofaCreation = () => {
    const [nofa, setNofa] = React.useState([]);
    const [show, setShow] = useState(false);
    const [loader, setLoader] = React.useState(false)
    const handleClose = () => setShow(false);

    const user = JSON.parse(sessionStorage.getItem('user'));


    // const handleShow = () => setShow(true);


    const history = useHistory();

    const gotToNofa = (id, tit) => {
        setLoader(true)


        // sessionStorage.setItem('NofaId',id)
        sessionStorage.removeItem('RfpID')
        sessionStorage.removeItem('RfpResponceID')

        const NofaId = sessionStorage.getItem('NofaId');
        const Createdby = sessionStorage.getItem('username');

        const datavalue = {
            "name": Createdby,
            "title": '',
            "description": '',
            "watershed": '',
            "county": '',
            "responsible_water_board": '',
            "latitude": "34.08515",
            "longitude": "-118.05502",
            "nofa_id": NofaId,
            "party_id": ''
        }
        nofaServices.createApplicantOrg(datavalue).then(
            res => {
                setLoader(true)
                sessionStorage.setItem('RfpResponceID', res.RfpResponceID);
                sessionStorage.setItem('RfpID', res.RfpID);
                // alert("Organization Created successfully",res)
                const datavalue1 = {
                    first_name: "",
                    last_name: "",
                    phone: "",
                    fax: "",
                    email: "",
                    rfp_responce_id: res.RfpResponceID,
                    management_role_type: "PROJECT DIRECTOR",
                }
                nofaServices.createProjectManagement(datavalue1).then(
                    res => {
                        setLoader(false)
                        //alert("Created Successfully")

                    },
                    error => {
                    }
                );
                const datavalue2 = {
                    first_name: "",
                    last_name: "",
                    phone: "",
                    fax: "",
                    email: "",
                    rfp_responce_id: res.RfpResponceID,
                    management_role_type: "PROJECT MANAGER",
                }
                nofaServices.createProjectManagement(datavalue2).then(
                    res => {
                        setLoader(false)
                        //alert("Created Successfully")

                    },
                    error => {
                    }
                );

                const datavalue3 = {
                    rfp_responce_id: res.RfpResponceID,
                }
                nofaServices.createQuestionnaireAllRecord(datavalue3).then(
                    res => {
                        setLoader(false)

                        //alert("Created Successfully")

                    },
                    error => {
                    }
                );
                history.push({
                    pathname: "/apply"//change link based on what application they selected
                });

            },
            error => {
            }
        );









    }


    const gotToEditNofa = (id, title) => {
        sessionStorage.setItem('NofaId', id);
        sessionStorage.setItem('Nofa', title);

        nofaServices.getRfpId().then(
            res => {

                console.log(res.data.ID)
                sessionStorage.setItem('RfpID', res.data.ID);
                // alert("Organization Created successfully",res)
                history.push({
                    pathname: "/nofa-submission" //change link based on what application they selected
                });

            },
            error => {
            }
        );


    }

    const UploadNofa = () => {
        sessionStorage.setItem('RfpID', 12);
        setLoader(true)
        nofaServices.getNofa().then(
            response => {
                setLoader(false)
              
                var nofa = response.data.data;
                setNofa(nofa)              
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
        }, 100);


    }, []);



    const renderHeader = () => {
        let headerElement = ['TITLE', 'START DATE', 'END DATE', 'Operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return nofa && nofa.map(({ ID, TITLE, START_DATE, END_DATE }) => {
            return (
                <tr key={ID}>

                    <td>{TITLE}</td>
                    <td>{moment(START_DATE).utc().format('yyyy-MM-DD hh:mm:ss')}</td>
                    <td>{moment(END_DATE).utc().format('yyyy-MM-DD hh:mm:ss')}</td>

                    <td className='opration2' >
                        <button className=" fourth btn btn-primary" onClick={() => gotToNofa(ID, TITLE)}><i className="fa fa-plus" aria-hidden="true"></i> Apply</button>
                        <button className=" fourth btn btn-primary" onClick={() => gotToEditNofa(ID, TITLE)}><i className="fa fa-eye" aria-hidden="true"></i> View Form</button>
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
                        <h4><i className="fa fa-list" aria-hidden="true"></i>  NOFAS </h4></div>
                    {/* <div className="col-lg-3">
                        <a className="text-align-right" onClick={() => handleShow("0")}><i className="fa fa-plus" aria-hidden="true"></i> Add NOFA </a>
                       
                    </div> */}
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