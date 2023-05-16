import React, { useEffect } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { GridCommandCell, GridDeleteCell } from './gridCommandCell'
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import { Link } from 'react-router-dom'
import nofaServices from '../../services/adminServices';
import './homepage.css';
import { Chart } from 'react-charts'
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
  const [loader, setLoader] = React.useState(false)
  const completeFunction = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.id) {
      nofaServices.completeGridList(user.id, 0)
        .then(({ data: issue }) => {
          // console.log(issue.content)
          setIssue(issue);
          setLoader(true)
        });
    } else {
      return null;
    }
  }
  const inCompleteFunction = () => {
    // const user = JSON.parse(sessionStorage.getItem('user'));
    // if (user && user.id) {
      nofaServices.allSubmissionList()
        .then(({ data: complete }) => {
          setComplete(complete);
          setLoader(true)
        });
    // } else {
    //   return null;
    // }
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
      pathname: '/program/apply' //change link based on what application they selected
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
              pathname: "/program/apply"
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
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  return (
    <div>

      <div className="container">

        <div className="row">
          {loader ?
            <></>
            :
            <div className="loader-wrapper">
              <div className="loader"></div>

            </div>

          }
        </div>
        <div className="row">


        <div className="col-md-12">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3">
              <section className="panel panel-featured-left panel-featured-primary">
                <div className="panel-body">
                  <div className="widget-summary">
                    <div className="widget-summary-col widget-summary-col-icon">
                      <div className="summary-icon bg-primary">
                        <i className="fa fa-file-text-o"></i>
                      </div>
                    </div>
                    <div className="widget-summary-col">
                      <div className="summary">
                        <h4 className="title">Total Submission</h4>
                        <div className="info">
                          <strong className="amount">20</strong>
                          
                        </div>
                      </div>
                      <div className="summary-footer">
                        <a href="#" className="text-muted text-uppercase">view all</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-md-3 col-lg-3 col-xl-3">
              <section className="panel panel-featured-left panel-featured-primary">
                <div className="panel-body">
                  <div className="widget-summary">
                    <div className="widget-summary-col widget-summary-col-icon">
                      <div className="summary-icon bg-primary">
                        <i className="fa fa-align-justify"></i>
                      </div>
                    </div>
                    <div className="widget-summary-col">
                      <div className="summary">
                        <h4 className="title">Completed</h4>
                        <div className="info">
                          <strong className="amount">10</strong>
                        
                        </div>
                      </div>
                      <div className="summary-footer">
                        <a href="#completed" className="text-muted text-uppercase">view all</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-md-3 col-lg-3 col-xl-3">
              <section className="panel panel-featured-left panel-featured-primary">
                <div className="panel-body">
                  <div className="widget-summary">
                    <div className="widget-summary-col widget-summary-col-icon">
                      <div className="summary-icon bg-primary">
                        <i className="fa fa-life-ring"></i>
                      </div>
                    </div>
                    <div className="widget-summary-col">
                      <div className="summary">
                        <h4 className="title">Draft</h4>
                        <div className="info">
                          <strong className="amount">10</strong>
                         
                        </div>
                      </div>
                      <div className="summary-footer">
                        <a href="#draft" className="text-muted text-uppercase">view all</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-md-3 col-lg-3 col-xl-3">
              <section className="panel panel-featured-left panel-featured-primary">
                <div className="panel-body">
                  <div className="widget-summary">
                    <div className="widget-summary-col widget-summary-col-icon">
                      <div className="summary-icon bg-primary">
                        <i className="fa fa-file-text-o"></i>
                      </div>
                    </div>
                    <div className="widget-summary-col">
                      <div className="summary">
                        <h4 className="title">Recent Submission</h4>
                        <div className="info">
                          <strong className="amount">5</strong>
                         
                        </div>
                      </div>
                      <div className="summary-footer">
                        <a href="#" className="text-muted text-uppercase">view all</a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      </div>

        <div className="row padding-10">
          <div className="col-lg-4 col-md-4 col-sm-12 sidebar-page-container">
            <PanelBar>
              <PanelBarItem expanded={true} title={"Recent Submission"}>
                <div className="sidebar">
                  <div className="sidebar-widget sidebar-post">

                    <div className="post-inner">
                      <div className="carousel-inner-data">
                        <ul>
                          <li>
                            <div className="post">
                              <div className="post-date"><p>06</p><span>july</span></div>

                              <h6><a href="#">Anil (14)</a></h6>
                              <div className="file-box"><i className="fa fa-calendar" aria-hidden="true"></i><p>2021-12-29</p></div>
                            </div>
                          </li>
                          <li>
                            <div className="post">
                              <div className="post-date"><p>25</p><span>April</span></div>

                              <h6><a href="#">Anil (15)</a></h6>
                              <div className="file-box"><i className="fa fa-calendar" aria-hidden="true"></i><p>2021-12-29</p></div>
                            </div>
                          </li>
                          <li>
                            <div className="post">
                              <div className="post-date"><p>05</p><span>Jan</span></div>

                              <h6><a href="#">Anil (16)</a></h6>
                              <div className="file-box"><i className="fa fa-calendar" aria-hidden="true"></i><p>2021-12-29</p></div>
                            </div>
                          </li>
                          <li>
                            <div className="post">
                              <div className="post-date"><p>06</p><span>July</span></div>

                              <h6><a href="#">Anil (17)</a></h6>
                              <div className="file-box"><i className="fa fa-calendar" aria-hidden="true"></i><p>2021-12-29</p></div>
                            </div>
                            <div className="post">
                              <div className="post-date"><p>06</p><span>July</span></div>

                              <h6><a href="#">Anil (18)</a></h6>
                              <div className="file-box"><i className="fa fa-calendar" aria-hidden="true"></i><p>2021-12-29</p></div>
                            </div>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </PanelBarItem>
            </PanelBar>


          </div>
          <div className="col-lg-8  sidebar-page-container">
            <PanelBar>
              <PanelBarItem expanded={true} title={"Recent Submission"}>
                <div
                  style={{
                    width: '100%',
                    height: '370px'
                  }}
                >
                  <Chart data={data} axes={axes} />
                </div>
              </PanelBarItem>
            </PanelBar>

          </div>
        </div>



        <div className="row">

          <div className="col-lg-12">

          </div>
          <div id='draft'> </div>
          <PanelBar>
            <PanelBarItem expanded={true} title={"User Submission List"}>

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
                <Column field="created_by" title="User" />
                <Column field="created_date" title="Created" width="250px" />
                <Column
                  width="150px"
                  field="draft"
                  //  filter="boolean"
                  filterable={false}
                  title="Status"
                  cell={(props) => (
                    <td>
                      {props.dataItem.draft ? <a className='incom' >Incompleted</a> : <a  className='comple'>Completed</a>}
                    </td>


                  )}
                />
                <Column
                  width="100px"
                  field="1"
                  //  filter="boolean"
                  filterable={false}
                  title="Action"
                  cell={(props) => (
                    <td>
                      <Link to={"/program/Admin/view/" + props.dataItem.id} className="k-primary k-custom-button k-button k-grid-edit-command">View</Link>
                    </td>
                  )}
                />

              </Grid>
            </PanelBarItem>
          </PanelBar>
          <div id='completed'> </div>
          {/* <PanelBar>
            <PanelBarItem expanded={false} title={"Completed"}>

              <Grid pageable={true} sortable={true} filterable={false} style={{ height: "" }}
                data={filterBy(issue.slice(page1.skip, page1.take + page1.skip), filter1)}
                filter={filter1}
                onFilterChange={(e) => setFilter1(e.filter)}
                skip={page1.skip}
                take={page1.take}
                total={issue.length}
                pageable={true}
                onPageChange={pageChange1}
                className='grid1'
                onItemChange={itemChange}
                editField={editField}

              >
                <Column field="id" title="id" width="150px" />
                <Column field="created_by" title="created_by" />
                <Column field="created_date" title="Created date" width="250px" />

                <Column
                  width="80px"
                  field="locked"
                  //  filter="boolean"
                  filterable={false}
                  title="locked"
                  cell={(props) => (
                    <td>
                      {props.dataItem.locked ? <a ><i className="fa fa-lock" aria-hidden="true"></i></a> : <a onClick={(e) => submissionDataLocked(e, props.dataItem.id)}><i className="fa fa-unlock" aria-hidden="true"></i></a>}
                    </td>


                  )}
                />

                <Column
                  width="100px"
                  field="1"
                  //  filter="boolean"
                  filterable={false}
                  title="Action"
                  cell={(props) => (
                    <td>
                      <Link to={"/nofa/submission/view/" + props.dataItem.id} className="k-primary k-custom-button k-button k-grid-edit-command">View</Link>
                    </td>
                  )}
                />

              </Grid>
            </PanelBarItem>
          </PanelBar> */}

        </div>

      </div>
    </div>
  )
}

export default GridList