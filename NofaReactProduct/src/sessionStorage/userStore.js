// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    if (userStr) return userStr;
    if (userId) return userId;
    
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
  
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('sub');
    sessionStorage.removeItem('submissionStorage');
    sessionStorage.removeItem('submissionId');

    sessionStorage.removeItem('NofaTabName');
    sessionStorage.removeItem('NofaLineItemId');
    sessionStorage.removeItem('NofaTabId');
    sessionStorage.removeItem('NofaId');
    sessionStorage.removeItem('NofaResponceId');
    sessionStorage.removeItem('NofaTitle');

  }
  export const removeUserSession_valid = () => {
     sessionStorage.removeItem('veriableaa');    
  }
  
  
  // set the token and user from the session storage
  export const setUserSession = (token, email,name,sub) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('username', name);
    sessionStorage.setItem('sub', sub);
    
  }