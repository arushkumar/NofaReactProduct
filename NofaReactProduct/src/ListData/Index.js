import React, { useEffect } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { GridCommandCell, GridDeleteCell } from './gridCommandCell'
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Link } from 'react-router-dom'
import nofaServices from '../services/adminServices';
import './homepage.css';

import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
// import { useMsal } from '@azure/msal-react'
// import { useIsAuthenticated } from '@azure/msal-react';

const editField = "inEdit";
const deleteField = "inDelete";
const initialFilter1 = {
  logic: "and",
  filters: [
    {
      field: "created_by",
      operator: "contains",
      value: "",
    },
  ],
};
const initialDataState1 = {
  skip: 0,
  take: 10,
};
const initialFilter2 = {
  logic: "and",
  filters: [
    {
      field: "created_by",
      operator: "contains",
      value: "",
    },
  ],
};
const initialDataState2 = {
  skip: 0,
  take: 10,
};
function GridList() {
  // const { instance, accounts, inProgress } = useMsal()
  // const isAuthenticated = useIsAuthenticated()
  // const LoginHandler = () => {
  //   // console.log("Trying to login via popup")
  //   try {
  //     const loginResponse = instance.loginRedirect().then(response => {
  //       console.log("Login Response: " + response.json())
  //     });

  //     console.log(loginResponse)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const history = useHistory();
  const [filter1, setFilter1] = React.useState(initialFilter1);
  const [filter2, setFilter2] = React.useState(initialFilter2);
  const [page1, setPage1] = React.useState(initialDataState1);
  const [page2, setPage2] = React.useState(initialDataState2);
  const [issue, setIssue] = React.useState([])

  const [complete, setComplete] = React.useState([])
  const [loader, setLoader] = React.useState(true)
  const completeFunction = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.id) {
      nofaServices.completeGridList(user.id, 0)
        .then(({ data: issue }) => {
          // console.log(issue.content)
          setIssue(issue);
          setLoader(false)
        });
    } else {
      return null;
    }
  }
  const inCompleteFunction = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.id) {
      nofaServices.inCompleteGridList(user.id, 1)
        .then(({ data: complete }) => {
          setComplete(complete);
          //setLoader(false)
        });
    } else {
      return null;
    }
  }
  // const submissionDataLocked = async (e,val) => {
  //   console.log(val);
  //   nofaServices.submissionLocked( val)
  //     .then((res) => {
  //       completeFunction();
  //     });

  // }
  useEffect(() => {
    setTimeout(function () {
      setLoader(false)
      completeFunction();
      inCompleteFunction();
    }, 3000);

  }, []);
  const pageChange1 = (event) => {
    setPage1(event.page);
  };
  const pageChange2 = (event) => {
    setPage2(event.page);
  };
  const enterEdit = (dataItem) => {
    sessionStorage.setItem('submissionId', dataItem.id);
    history.push({
      pathname: '/faast/apply' //change link based on what application they selected
    });
  };
  const enterDelete = (dataItem) => {
    Swal.fire({
      title: 'Delete Application ' + dataItem.id + '?',
      text: 'Are you sure you want to delete your application? This can not be undone.',
      icon: 'question',
      denyButtonText: 'Delete',
      showConfirmButton: false,
      showCancelButton: true,
      showDenyButton: true,

    }).then((result) => {
      if (result.isDenied) {
        nofaServices.deleteDraftListData(dataItem.id).then(
          response => {
            // window.scrollTo(0, 0)
            inCompleteFunction();


          },
          error => {

          }
        );
      }

    });


  };
  const itemChange = (event) => {
    // console.log("item", issue)
    const newData = issue.map((item) =>
      item.id === event.dataItem.id
        ? { ...item, [event.field || ""]: event.value }
        : item
    );
    setIssue(newData);
  };
  const CommandCell = (props) => (
    <GridCommandCell
      {...props}
      edit={enterEdit}
      editField={editField}
    />
  );
  const deleteCell = (props) => (
    <GridDeleteCell
      {...props}
      delete={enterDelete}
      deleteField={deleteField}

    />
  );


  const createApp = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const email = sessionStorage.getItem('email');
    const username = sessionStorage.getItem('username');
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date);
    if (email && user.id) {

      const init = {
        "created_by": username,
        "created_date": date,
        "email": email,
        "userId": user.id,
        "locked": false,
        "draft": true

      }
      nofaServices.createApplication(init).then(
        (res) => {
          console.log(res.id)
          //sessionStorage.setItem('submissionStorage', JSON.stringify(res));
          sessionStorage.setItem('submissionId', res.id);
          const subId = sessionStorage.getItem('submissionId');

          if (subId !== null) {

            history.push({
              pathname: "/faast/apply"
            });

          } else {

          }
        },
        error => {
        }
      );
    } else {
      return false;
    }

  }
  const createOrg = () => {

    history.push({
      pathname: "/organization/create"
    });
  }

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
        <div className="row">

          <div className="col-lg-12">

          </div>

          <PanelBar>
            <PanelBarItem expanded={true} title={"Drafts"}>

              <Grid pageable={true} sortable={true} filterable={false}
                data={filterBy(complete.slice(page2.skip, page2.take + page2.skip), filter2)}
                filter={filter2}
                onFilterChange={(e) => setFilter2(e.filter)}
                skip={page2.skip}
                take={page2.take}
                total={complete.length}
           
                onPageChange={pageChange2}
                className='grid2'
                toolbar={"excel"}

              >
                <Column field="id" title="ID" width="100px" />
                <Column field="created_by" title="Username" />
                <Column field="project_name" title="Project Name" />
                <Column field="created_date" title="Created Date" width="250px" />
                <Column filterable={false} title="Edit" cell={CommandCell} width="50px" />
                <Column filterable={false} title="Delete" cell={deleteCell} width="60px" />

              </Grid>
            </PanelBarItem>
          </PanelBar>
          <PanelBar>
            <PanelBarItem expanded={false} title={"Completed"}>

              <Grid pageable={true} sortable={true} filterable={false} style={{ height: "" }}
                data={filterBy(issue.slice(page1.skip, page1.take + page1.skip), filter1)}
                filter={filter1}
                onFilterChange={(e) => setFilter1(e.filter)}
                skip={page1.skip}
                take={page1.take}
                total={issue.length}           
                onPageChange={pageChange1}
                className='grid1'
                onItemChange={itemChange}
                editField={editField}

              >
                <Column field="id" title="ID" width="150px" />
                <Column field="created_by" title="Username" />
                <Column field="project_name" title="Project Name" />
                <Column field="created_date" title="Created date" width="250px" />

                {/* <Column
              width="80px"
              field="locked"
              //  filter="boolean"
              filterable={false}
              title="locked"
              cell={(props) => (
                <td>
                  {props.dataItem.locked ? <a ><i className="fa fa-lock" aria-hidden="true"></i></a> : <a onClick={(e) => submissionDataLocked(e,props.dataItem.id)}><i className="fa fa-unlock" aria-hidden="true"></i></a>}
                </td>


              )}
            /> */}

                <Column
                  width="100px"
                  field="1"
                  //  filter="boolean"
                  filterable={false}
                  title="Action"
                  cell={(props) => (
                    <td>
                      <Link to={"/program/submission/view/" + props.dataItem.id} className="k-primary k-custom-button k-button k-grid-edit-command">View</Link>
                    </td>
                  )}
                />

              </Grid>
            </PanelBarItem>
          </PanelBar>
          <div className="row">

            <div className="col-md-12 col-lg-12 col-xl-12">
              <div className='startbtn'>
                <button onClick={createApp} className="btn btn-primary">Start Form FAAST Application <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GridList