import React from 'react';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';

const LoginReg = (props) => {
  const { user, setUser} = props;

  return (
    <div>
      <Login user={user} setUser={setUser} />
      <hr />
      <RegisterUser />
    </div>
  )
}

export default LoginReg;
