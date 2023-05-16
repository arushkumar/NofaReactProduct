import React, { useState } from "react";
import {
  BrowserRouter as Router, Route
} from "react-router-dom";
// import homepage from './Home/Index';
import { AzureAD, LoginType, AuthenticationState } from 'react-aad-msal';
import { basicReduxStore } from './reduxStore';
import { removeUserSession } from './sessionStorage/userStore';
import { authProvider } from './authProvider';
import Login from './Login/Index';
import NofaCreation from './Nofa/nofa-creation';
// import Nofalineitem from './Nofa/nofa-line-items';
 import Organizations from './NofaProgram/form-List';
 import NofaProgram from './NofaProgram/main'
 import OrgPreview from './NofaProgram/preview'
 import Agreement from './NofaAgreement/nofa-agreement'
// import Nofatab from './Nofa/nofaTabs';
// import NofalineitemType from './Nofa/nofa-line-item-type';
// import NofaquestionType from './Nofa/nofa-question-type';
// import NofaDB from './NofaDB/main'
// import UserList from './Nofa/UsersAndRoles/user-list'
// import UserEdit from './Nofa/UsersAndRoles/user-edit'
// import UserRoles from './Nofa/UsersAndRoles/user-roles'
// import NofaList from './Nofa/nofa-list'
// import NofaTabAdd from './Nofa/nofa-tab-add'
// import gridTab from './Nofa/gridTest/grid-tab'
// import privileges from './Nofa/UsersAndRoles/nofa-privileges'
class Navigation extends React.Component {
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
      <Router basename="/admin">
        <div className="navcss">
          <div className="container-fluid">
            <div className="App1">
              <AzureAD provider={authProvider} reduxStore={basicReduxStore}>
                {({ accountInfo, login, logout, authenticationState }) => {
                  const isInProgress = authenticationState === AuthenticationState.InProgress;
                  const isAuthenticated = authenticationState === AuthenticationState.Authenticated;
                  const isUnauthenticated = authenticationState === AuthenticationState.Unauthenticated;
                  {/* <Route path="/" exact component={homepage} /> */ }
                  if (isAuthenticated) {
                    return (
                      <div>
                       
                        {/* <Route path="/admin" exact component={NofaCreation} /> */}
                        <Route path="/" exact component={NofaCreation} />
                        <Route path="/nofa" exact component={Organizations} />
                        <Route path="/apply" exact component={NofaProgram} />
                        <Route path="/apply/edit/:id" exact component={NofaProgram} />
                        <Route path="/apply/preview/:id" exact component={OrgPreview} />
                        <Route path="/agreement/create/:name" exact component={Agreement} />

                        {/* <Route path="/nofaDB" exact component={NofaDB} /> */}
                        {/* <Route path="/form" exact component={NofaList} /> */}
                        {/*
                        <Route path="/nofa-line-items" exact component={Nofalineitem} />
                        <Route path="/nofa-tabs" exact component={Nofatab} />
                        <Route path="/nofa-line-item-type" exact component={NofalineitemType} />
                        <Route path="/nofa-question-type" exact component={NofaquestionType} />
                        <Route path="/nofa-tab-add" exact component={NofaTabAdd} />
                        <Route path="/nofa-grid-tab" exact component={gridTab} />
                        <Route path="/user-list" exact component={UserList} />
                        <Route path="/user-edit/:id" exact component={UserEdit} />
                        <Route path="/user-roles" exact component={UserRoles} />
                        <Route path="/privileges/:id" exact component={privileges} /> */}

                      </div>
                    )
                  } else if (isUnauthenticated || isInProgress) {
                    removeUserSession();
                    return (
                    <>
                      <Route path="/admin/" exact component={Login} />
                      <Route path="/" exact component={Login} />
                    </>
                    )
                  }  else {
                    removeUserSession();
                    return (
                    <>
                      <Route path="/admin/" exact component={Login} />
                      <Route path="/" exact component={Login} />
                    </>
                    )
                  }

                }}
              </AzureAD>
            </div>
          </div>
        </div>
      </Router>

    );
  }
}



export default Navigation;