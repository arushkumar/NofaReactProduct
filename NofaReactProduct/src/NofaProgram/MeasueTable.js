import React, { useState, useEffect } from 'react';
import adminServices from '../services/adminServices'

function MeasureTable(props) {

  const [RfResponceId, setRfResponceId] = useState(sessionStorage.getItem('RfpResponceID'))
  const [Tabsdata, setTabsdata] = useState([])
  const [loader, setLoader] = useState(false)
  const [PropData, setPropData] = useState(props.data)
  const [completeHeader, setcompleteHeader] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {

    if (PropData) {

      const datavalue = {
        Name: PropData,
        rfp_responce_id: RfResponceId
      }
      adminServices.getPerMeasureListbyMeasureID(datavalue).then(
        response => {
          setLoader(false)
          const PerformanceList = response.data.data
          setTabsdata(PerformanceList)
          //  console.log("dataList",PerformanceList)
          setPropData(null)
        },
        error => {
        }

      );
      if (PropData === "Comments") {
        setcompleteHeader(true)
      }
    }
  }, []);
  const deletePerformance = (Valueid, AttId) => {
    console.log("ids", AttId)

    const datavalue = {
      rfp_responce_value_id: Valueid,
      rfp_responce_att_id: AttId
    }
    adminServices.deletePerformAttAndvalueById(datavalue).then(
      response => {

      },
      error => {
      }

    );

  }

  return (
    <div className="">

      {
        completeHeader ?
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Comment By</th>
                <th>Comment Text</th>
                <th>Operation</th>
              </tr>

            </thead>
            <tbody>
              {Tabsdata.map((val, key) => {
                return (

                  <tr key={key}>
                    <td>{user.CREATED_BY}</td>
                    <td>{val.NAME}</td>
                    <td className='opration2'>
                      <button className='btn btn-danger' onClick={(e) => deletePerformance(val.ID, val.RFP_PERFORMANCE_ATTRIBUTES_ID)} >Delete</button>

                    </td>
                  </tr>


                )
              })}
            </tbody>
          </table> :
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Attribute Name</th>
                <th>Sub Attribute Name</th>
                <th>Percentage</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {Tabsdata.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.NAME}</td>
                    <td>{val.SUB_ATTRIBUTE_NAME}</td>
                    <td>{val.VALUE}</td>
                    <td className='opration2'>
                      <button className='btn btn-danger' onClick={(e) => deletePerformance(val.ID, val.RFP_PERFORMANCE_ATTRIBUTES_ID)} >Delete</button>

                    </td>
                  </tr>

                )
              })}
            </tbody>
          </table>

      }
    </div>

  )

}
export default MeasureTable;