import React from 'react';
import { Link } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { useIsAuthenticated } from '@azure/msal-react';
//import { init } from '../../nofa/data';
import nofaServices from '../../services/adminServices';
//import { getUser } from '../../sessionStorage/userStore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
export default function Card(props) {
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  const LoginHandler = () => {
    // console.log("Trying to login via popup")
    try {
      const loginResponse = instance.loginRedirect().then(response => {
        //console.log("Login Response: " + response.json())
      });

      console.log(loginResponse)
    } catch (err) {
      console.log(err);
    }
  }

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
          
          // if (subId !== null) {
         
          //   history.push({
          //     pathname: props.drupalLink 
          //   });

          // }else{

          // }
        },
        error => {
        }
      );
    } else {
      return false;
     }

  }

  // const continueApp = () => {


  // nofaServices.draftValues().then(
  //   response => {
  //     const customer = response.data
  //     customer["pre_app_bool1"] = (customer["pre_app_bool1"]=="1");
  //     customer["pre_app_bool2"] = (customer["pre_app_bool2"]=="1");
  //     customer["pre_app_bool3"] = (customer["pre_app_bool3"]=="1");
  //     customer["pre_app_bool4"] = (customer["pre_app_bool4"]=="1");
  //     sessionStorage.setItem('draftValues', JSON.stringify(customer));
  //     console.log(sessionStorage.getItem("draftValues"))
      
  //   },
  // );
  // }


  return (

    <div className="col-sm-4  p-xs-md transform-scale-1_05--hover transition-0_3">

      <div className=" card card-block text-xs-center">
        <div className="cards-img"><img alt={props.image} src={`/images/${props.image}`} width="100" height="100" /></div>
        <h4 className="card-title">{props.title}</h4>
        <div className="card-text">
          {isAuthenticated ?
            <div>
            <Link to="/" onClick={createApp} className="btn  text-uppercase">Start</Link>
            {/* <Link to={props.drupalLink} onClick={continueApp} className="btn  text-uppercase">Continue</Link> */}
            </div> 
            :
            <Link to="/" onClick={LoginHandler} className="btn  text-uppercase">Start</Link>
          }
        </div>
      </div>
    </div>



  )
}