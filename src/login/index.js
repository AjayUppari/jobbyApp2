import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginCredentials = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginCredentials),
    }

    const fetchResult = await fetch(url, options)
    const jsonData = await fetchResult.json()
    const jwtToken = jsonData.jwt_token

    if (fetchResult.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/')
    } else if (fetchResult.status === 400) {
      this.setState({errorMsg: jsonData.error_msg})
    }
  }

  render() {
    const {errorMsg} = this.state
    console.log(errorMsg)

    return (
      <div className="loginContainer">
        <form onSubmit={this.onLogin} className="loginCard">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="inputItem">
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={this.onChangeUsername}
              placeholder="Username"
              className="loginInputs"
              type="text"
              id="username"
            />
          </div>
          <div className="inputItem">
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.onChangePassword}
              placeholder="Password"
              className="loginInputs"
              type="password"
              id="password"
            />
          </div>
          <button className="loginButton" type="submit">
            Login
          </button>
          <p className="errorMsg">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
