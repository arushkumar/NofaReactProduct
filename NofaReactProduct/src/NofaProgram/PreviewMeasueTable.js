import React, {  useState , useEffect} from 'react';
import adminServices from '../services/adminServices'

function MeasureTable(props) {

  const[RfResponceId, setRfResponceId] = useState(sessionStorage.getItem('RfpResponceID'))
  const[Tabsdata, setTabsdata] = useState([])
  const [loader, setLoader] =  useState(false)
  const [PropData, setPropData] = useState(props.data)
  const [completeHeader , setcompleteHeader] = useState(false)
  const user = JSON.parse(sessionStorage.getItem('user'));
    
   useEffect(() =>{
    
    if(PropData){  
    
    const datavalue ={          
      Name:PropData,
      rfp_responce_id:RfResponceId
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
  if(PropData === "Comments"){
    setcompleteHeader(true)
  }
    }
   })
     

    return(
        <div className="">      
     
      { 
        completeHeader ?
        <table className='table table-striped'>
        <tr>
          <th>Comment By</th>         
          <th>Comment Text</th>     
         
        </tr>
        {Tabsdata.map((val, key) => {
          return (
            <tr key={key}>
              <td>{user.CREATED_BY}</td>
              <td>{val.NAME}</td>     
             
            </tr>
          )
        })}
      </table>:
        <table className='table table-striped'>
        <tr>
          <th>Attribute Name</th>
          <th>Sub Attribute Name</th>
          <th>Percentage</th>          
         
        </tr>
        {Tabsdata.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.NAME}</td>
              <td>{val.SUB_ATTRIBUTE_NAME}</td>  
              <td>{val.VALUE}</td>              
             
            </tr>
          )
        })}
      </table>        

       }  
    </div>

    )

}
export default MeasureTable;