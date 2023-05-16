import * as React from 'react';
import axios from "axios";
import { AzureAD, LoginType, AuthenticationState } from 'react-aad-msal';
import { basicReduxStore } from '../reduxStore';
import { removeUserSession } from '../sessionStorage/userStore';
import { authProvider } from '../authProvider';
import './login.css';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: null,
      sampleType: null,
      logInAuth: null,
      loader: false

    };
    // Change the login type to execute in a Popup
    const options = authProvider.getProviderOptions();
    options.loginType = LoginType.Popup;
    authProvider.setProviderOptions(options);
  }


  render() {
    return (
      <div>
        <AzureAD provider={authProvider} reduxStore={basicReduxStore}>
          {({ accountInfo, login, logout, authenticationState }) => {
            const isInProgress = authenticationState === AuthenticationState.InProgress;
            const isAuthenticated = authenticationState === AuthenticationState.Authenticated;
            const isUnauthenticated = authenticationState === AuthenticationState.Unauthenticated;
            if (isAuthenticated) {
              // const article = { email: accountInfo.account.userName, sub: accountInfo.account.idTokenClaims.sub,first_name: accountInfo.account.name,last_name:"",middle_initial:"" };
              // const headers = {
              //   'Accept': 'application/json',
              //   'Content-Type': 'application/json',
              // };
              // axios.post(`${process.env.REACT_APP_URL}users`, article, { headers })
              //   .then(res => {
              //     sessionStorage.setItem('user', JSON.stringify(res.data));
              //   const user = sessionStorage.getItem('user');
              //   if(user){
              //     this.setState({loader:false})
              //   }else{
              //     this.setState({loader:true})
              //   }
  
              //     //console.log(persons.id);
  
  
              //   }).catch(function (error) {
              //     console.log(error);
              //   });
              return (
                <div  ></div>
              );
            } else if (isUnauthenticated || isInProgress) {
              removeUserSession();

              return (
                <div className="wrapper ">
                  <div id="formContent">
                    <div className=" first">
                    <img src={`/admin/images/hqsft-logo_1.png`} alt="Hcd" />
                      <p>HQ Software Consulting</p>
                    </div>

                    <button onClick={login} type="submit" className=" fourth btn btn-primary"><i className="fa fa-sign-out" aria-hidden="true"></i> Login</button>
                    <div id="formFooter">
                      <a className="underlineHover" >Login to your account.</a>
                    </div>

                  </div>
                </div>



              );
            }
          }}
        </AzureAD>
        {/* <div className="wrapper ">
        <div id="formContent">
          {inProgress === 'none' ?
            <></>
            :
            <div className="loader-wrapper">
              <div className="loader"></div>

            </div>

          }
          
          <div className=" first">
            <img src={`/images/HCD_logo.png`} alt="Hcd" />
            <p>California Department of Housing and Community Development</p>
          </div>

          <button onClick={LoginHandler} type="submit" className=" fourth btn btn-primary"><i className="fa fa-sign-out" aria-hidden="true"></i> Login</button>
          <div id="formFooter">
            <a className="underlineHover" >Login to your account.</a>
          </div>

        </div>
      </div> */}
      </div>
    );
  }
}


export default Login;
