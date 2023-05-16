import React, { useEffect } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import axios from 'axios';
import { Link } from 'react-router-dom'
import adminServices from '../services/adminServices';
import moment from "moment";
import '../ListData/homepage.css';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const editField = "inEdit";

function FormList() {

    const history = useHistory();
    
    const [issue, setIssue] = React.useState([])
    const [loader, setLoader] = React.useState(false)
    const NofaId = sessionStorage.getItem('NofaId');
    const Nofa = sessionStorage.getItem('Nofa');
    // const sports = [{ text: "Basketball", id: 1,},{ text: "Football", id: 2,}, { text: "Tennis", id: 3,},]
    // const [state, setState] = React.useState({ value: {text: "Football", id: 2,}, });

    const completeFunction = () => {
        // console.log("complte func", NofaId)
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (NofaId) {
            const datavalue = {
                nofa_id: NofaId
            }
             
            setLoader(true)
            adminServices.getOrganizationByNofaId(datavalue)
                .then(({ data: issue }) => {
                   
                    
                     for (var i in issue.data) {
                        let x = issue.data[i];
                        var date= moment(x.START_DATE).utc().format('yyyy-MM-DD hh:mm:ss')
                        x.date = date                                           
                    }                   
                    
                    setIssue(issue);
                    setLoader(false)
                    console.log(issue.data)
                });
        } else {
            return null;
            console.log("nofa id", datavalue)
        }
    }
   

    useEffect(() => {
        setTimeout(function () {            
            completeFunction();
        }, 1000);

    }, []);   
    const itemChange = (event) => {
        
        const newData = issue.map((item) =>
            item.id === event.dataItem.id
                ? { ...item, [event.field || ""]: event.value }
                : item
        );
        setIssue(newData);
    };

    const blockOrganization = (orgId) =>{
        //  console.log("party id", partyId)

         axios.post(`${process.env.REACT_APP_URL}` + 'organization/desableApplicantOrg/' + orgId, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            
          
        })
        setTimeout(function () {            
            completeFunction();
        }, 1000);
    }
  
    const handleChange = (event) => {
        setState({
          value: event.target.value,
        });
        console.log("drop", state)
      };
    const backtonofa = () => {

        history.push({
            pathname: '/'
        });
    };
    return (
        <div>

            <div className="container">
                <div className="row">
                    {loader ?
                        <div className="loader-wrapper">
                            <div className="loader"></div>

                        </div>
                        :
                        <></>

                    }
                </div>
                <div className="prviewcss margin_css">
                <div className="position-relative row form-group">
                    <div className="col-lg-9">
                        <h4><i className="fa fa-home" aria-hidden="true"></i> {Nofa}</h4></div>
                        <div className="col-lg-3">

                        <a className="text-align-right" onClick={backtonofa}><i className="fa fa fa-angle-double-left" aria-hidden="true"></i> Back </a>
                       
                    </div>
                </div>
                <div className="row">                      
                            <Grid pageable={true} sortable={true} filterable={false} style={{ height: "" }}                               
                                data={issue}                               
                                id='employee' className="table"
                                onItemChange={itemChange}
                                editField={editField}                            >
                                <Column field="ID" title="ID" width="70px" />
                                <Column field="NAME" title="PROJECT NAME" />
                                <Column field="CREATED_BY" title="CREATED BY" />
                                <Column field="date" title="CREATED DATE" width="150px" />
                                <Column
                                    width="250px"                                                                
                                    filterable={false}
                                    title="OPERATIONS"
                                    cell={(props) => (
                                        <td className='button_css'>
                                               <Link to={"/apply/edit/" + props.dataItem.ORG_PARTY_ID} className=" btn btn-primary"><i className="fa fa-edit" aria-hidden="true"></i>  </Link>                                         
                                               <Link to={"/apply/preview/" + props.dataItem.ORG_PARTY_ID} className=" btn btn-primary"><i className="fa fa-eye" aria-hidden="true"></i>  </Link>
                                               <Link to={"/agreement/create/"+ props.dataItem.NAME } className=" btn btn-primary"><i className="fa fa-eye" aria-hidden="true"></i> Award </Link>
                                               {/* <button className=' btn btn-danger' onClick={ () => blockOrganization(props.dataItem.ID)}><i className="fa fa-ban" aria-hidden="true"></i> </button> */}
                                        </td>                                    
                                    )}
                                />
                                                            
                            </Grid>                       

                </div>
                </div>
            </div>
        </div>
    )
}

export default FormList