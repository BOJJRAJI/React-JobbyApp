import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 10})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <form className="my-form" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
          <div className="name-container">
            <label className="name-heading" htmlFor="username">
              USERNAME
            </label>
            <input
              id="username"
              className="name-input"
              placeholder="Username"
              type="text"
              onChange={this.getUsername}
            />
          </div>
          <div className="name-container">
            <label className="name-heading" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              className="name-input"
              placeholder="Password"
              type="password"
              onChange={this.getPassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
