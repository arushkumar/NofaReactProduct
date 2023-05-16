import  React , {useState} from 'react';
import axios from "axios";
import { AzureAD, LoginType, AuthenticationState } from 'react-aad-msal';
import { basicReduxStore } from './reduxStore';
import { removeUserSession } from './sessionStorage/userStore';
import { authProvider } from './authProvider';

class SampleAppButtonLaunch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountInfo: null,
      sampleType: null,
      logInAuth: null,
      loader:false

    };
    // Change the login type to execute in a Popup
    const options = authProvider.getProviderOptions();
    // const [partyId, setPartyId] = useState(sessionStorage.getItem('PARTIES_ID'));

    options.loginType = LoginType.Popup;
    authProvider.setProviderOptions(options);
  }

  render() {
    return (
      <AzureAD provider={authProvider} reduxStore={basicReduxStore}>
        {({ accountInfo, login, logout, authenticationState }) => {
          const isInProgress = authenticationState === AuthenticationState.InProgress;
          const isAuthenticated = authenticationState === AuthenticationState.Authenticated;
          const isUnauthenticated = authenticationState === AuthenticationState.Unauthenticated;
          if (isAuthenticated) {
   
         
            const article = { email: accountInfo.account.userName, sub: accountInfo.account.idTokenClaims.sub,first_name: accountInfo.account.name,last_name:"",middle_initial:"" };
            const headers = {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            };
           
            const user = JSON.parse(sessionStorage.getItem('user'));
            if(user){}else{
              axios.post(`${process.env.REACT_APP_URL}users`, article, { headers })
              .then(res => {
             
                sessionStorage.setItem('user', JSON.stringify(res.data));              
                     
              const user = JSON.parse(sessionStorage.getItem('user'));
             
              // console.log("User",user)
              if(user){
                this.setState({loader:false})
                 window.location.reload();
              }else{
                this.setState({loader:true})
                  }              
              }).catch(function (error) {
                console.log(error);
              });
            }
           
           
            return (
              <React.Fragment>


                <ul className="navul">
                  <li><div className="Logincss " onClick={logout}>Logout</div></li>
                  <li><div className="Logincss " ><i className="fa fa-user-o" aria-hidden="true"></i> {accountInfo.account.userName}</div></li>

                </ul>


                {/* <GetAccessTokenButton provider={authProvider} />
                <GetIdTokenButton provider={authProvider} /> */}
              </React.Fragment>
            );
          } else if (isUnauthenticated || isInProgress) {
            removeUserSession();

            return (


              <ul className="navul">
                {/* <li><div className="Logincss " onClick={login} disabled={isInProgress}>Login</div></li> */}


              </ul>

            );
          }
        }}
      </AzureAD>
    );
  }
}
export default SampleAppButtonLaunch;