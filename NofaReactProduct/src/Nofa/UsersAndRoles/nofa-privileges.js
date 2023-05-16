import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import nofaServices from '../../services/adminServices';
import Swal from 'sweetalert2';
import { Checkbox } from "@progress/kendo-react-inputs";
const NofaCreation = () => {
    const [nofa, setNofa] = React.useState([]);
    const [nofTabs, setNofaTab] = React.useState([]);

    const [Nofaname, setNofaname] = useState(sessionStorage.getItem('NofaTitle'));
    const [Nofid, setNofId] = useState(sessionStorage.getItem('NofaId'));
    const [loader, setLoader] = React.useState(false)



    const history = useHistory();

    // const handleShow = () => {


    //     history.push({
    //         pathname: '/nofa-tabs'
    //     });
    //     sessionStorage.removeItem("NofaTabId");

    // };
    const getAllTab = () => {
        setLoader(true)
        const Nofadatavalue = {
            "nofa_id": Nofid,
        }
        nofaServices.getNofaTabForPermission(Nofadatavalue).then(
            response => {
                setLoader(false)
                var nofatab = response.data.data;
                for (var i in nofatab) {
                    let x = nofatab[i];
                    var roleid = x.roleid.split(',');
                    console.log("length", roleid.length)
                    if (roleid[0] === '1') {
                        x.ADMINISTRATOR = true
                    } else {
                        x.ADMINISTRATOR = false
                        // x.Anonymous = false
                    }
                    if (roleid.length === 2) {
                        console.log("check 2")
                        if (roleid[1] === '2') {
                            x.Anonymous = true
                        } else {
                            x.Anonymous = false
                            if (roleid[1] === '4') {
                                x.AUTHENTICATED = true
                            } else {
                                x.AUTHENTICATED = false
                            }
                        }
                    }else if(roleid.length === 3){
                        console.log("check 3")
                        if (roleid[1] === '2') {
                            x.Anonymous = true
                        } else {
                            x.Anonymous = false
                            if (roleid[1] === '4') {
                                x.AUTHENTICATED = true
                            } else {
                                x.AUTHENTICATED = false
                            }
                        }
                        if (roleid[2] === '2') {
                            x.Anonymous = true
                        } else {
                            x.Anonymous = false
                            if (roleid[2] === '4') {
                                x.AUTHENTICATED = true
                            } else {
                                x.AUTHENTICATED = false
                            }
                        }
                    }else{
                        
                    }
                    // if (roleid[1] === '4') {
                    //     x.AUTHENTICATED = true
                    // } else {
                    //     x.AUTHENTICATED = false
                    // }                  

                }

                setNofaTab(nofatab)
                console.log(nofatab)
            },
            error => {
            }
        );
    }
    useEffect(() => {
        getAllTab()

    }, []);


    const handleChangeForAnonymous = (event, id) => {
        // setChecked(event.value);
        setLoader(true)

        if (event.target.value === true) {
            const Nofadatavalue3 = {
                "role_id": 2,
                "tab_id": id
            }
            nofaServices.createRolePrivileges(Nofadatavalue3).then(
                response => {
                    setLoader(false)
                    var nofatab = response.data.data;
                    getAllTab()

                    console.log(nofa)
                },
                error => {
                }
            );
        } else {
            setLoader(true)
            const Nofadatavalue4 = {
                "role_id": 2,
                "tab_id": id
            }
            nofaServices.deleteRolePrivileges(Nofadatavalue4).then(
                response => {
                    setLoader(false)
                    var nofatab = response.data.data;
                    getAllTab()

                    console.log(nofa)
                },
                error => {
                }
            );

        }
    };
    const handleChangeForAuthenticated = (event, id) => {
        // setChecked(event.value);
        setLoader(true)

        if (event.target.value === true) {
            const Nofadatavalue3 = {
                "role_id": 4,
                "tab_id": id
            }
            nofaServices.createRolePrivileges(Nofadatavalue3).then(
                response => {
                    setLoader(false)
                    var nofatab = response.data.data;
                    getAllTab()

                    console.log(nofa)
                },
                error => {
                }
            );
        } else {
            setLoader(true)
            const Nofadatavalue4 = {
                "role_id": 4,
                "tab_id": id
            }
            nofaServices.deleteRolePrivileges(Nofadatavalue4).then(
                response => {
                    setLoader(false)
                    var nofatab = response.data.data;
                    getAllTab()

                    console.log(nofa)
                },
                error => {
                }
            );

        }
    };
    const renderHeader = () => {
        let headerElement = ['TAB NAME', 'ADMINISTRATOR', 'ANONYMOUS USER', 'AUTHENTICATED USER']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderBody = () => {
        return nofTabs && nofTabs.map(({ ID, TAB_NAME, ADMINISTRATOR, AUTHENTICATED, Anonymous }) => {
            return (
                <tr key={ID} className="priv">

                    <td>{TAB_NAME ? TAB_NAME : 'N/A'}</td>
                    <td className='opration2'>
                        {TAB_NAME ? <div>
                            <Checkbox className="fourth"
                                checked={true} disabled
                            // onClick={(e) => gotToFormEdit(ID, TAB_NAME)}
                            />
                        </div>
                            : <div className="fourth"></div>
                        }

                    </td>
                    <td className='opration2' >
                        {TAB_NAME ? <div>
                            <Checkbox className="fourth"
                                checked={Anonymous}
                                onChange={(e) => handleChangeForAnonymous(e, ID)}
                            // label={"Controlled checked"}
                            />
                        </div>

                            : <div></div>
                        }

                    </td>
                    <td className='opration2' >
                        {TAB_NAME ? <div>
                            <Checkbox className="fourth"
                                checked={AUTHENTICATED}
                                onChange={(e) => handleChangeForAuthenticated(e, ID)}
                            />
                        </div>

                            : <div></div>
                        }
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
                        <h4><i className="fa fa-home" aria-hidden="true"></i> PRIVILEGES <span> <i className="fa fa-arrow-right" aria-hidden="true"></i> {Nofaname}</span> </h4></div><div className="col-lg-3">

                        <a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a>
                        {/* <a className="text-align-right" onClick={handleShow}><i className="fa fa-plus" aria-hidden="true"></i> Add Roles </a> */}
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