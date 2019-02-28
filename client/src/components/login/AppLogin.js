import React from 'react'
import './AppLogin.css'
import { connect } from 'unistore/react'
import { actions } from '../../stores-and-actions'
import { Form, Input, Button, CardImg } from 'reactstrap'
import Logo from '../../assets/images/logo.png'

const AppLogin = ({ username, password, changePassword, changeUsername, login }) => {
  return (
    <>
      <div className="app-login-body">
        <div className="app-login-container">
          <div className="app-login" >
            <CardImg className="app-login-logo" width="50%" src={Logo} alt="Card image cap" />
            <Form className="app-login-form text-center">
              <h3 className="app-login-heading">Administrator</h3>
              <Input onChange={changeUsername} value={username} className="app-login-input" type="text" placeholder="Email" />
              <br />
              <Input onChange={changePassword} value={password} className="app-login-input" type="password" placeholder="Password" />
              <br />
              <Button onClick={login} className="app-login-btn">LOGIN</Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default connect(['username', 'password'], actions)(AppLogin) 
