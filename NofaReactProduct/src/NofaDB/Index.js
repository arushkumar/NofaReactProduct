import React, { useEffect } from 'react';
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { GridCommandCell } from './gridCommandCell'
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";
import nofaServices from '../services/adminServices';
import './homepage.css';
import { useHistory } from "react-router-dom";
const editField = "inEdit";


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

  const history = useHistory();

  const [filter2, setFilter2] = React.useState(initialFilter2);
  const [page2, setPage2] = React.useState(initialDataState2);
  const [issue, setIssue] = React.useState([])

  const [complete, setComplete] = React.useState([])
  const [loader, setLoader] = React.useState(false)
  const orgFunction = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.id) {
      nofaServices.getOrganization(user.id)
        .then(({ data: complete }) => {


          setComplete(complete);
          setLoader(true)
        });
    } else {
      return null;
    }
  }

  useEffect(() => {
    setTimeout(function () {

      orgFunction();
    }, 2000);

  }, []);

  const pageChange2 = (event) => {
    setPage2(event.page);
  };
  const enterEdit = (dataItem) => {

    history.push({
      pathname: '/organization/create/' + dataItem.id //change link based on what application they selected
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
          <PanelBar>
            <PanelBarItem expanded={true} title={"Organization List"}>

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
                <Column field="id" title="id" width="100px" />

                <Column field="name" title="Organization Name" />
                <Column filterable={false} title="Edit" cell={CommandCell} width="50px" />


              </Grid>
            </PanelBarItem>
          </PanelBar>

        </div>
      </div>
    </div>
  )
}

export default GridList