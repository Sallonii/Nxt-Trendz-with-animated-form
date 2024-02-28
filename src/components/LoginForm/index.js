import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: 'praneetha', password: 'praneetha@2021'}

  componentDidMount() {
    // Load Visme script here
    const script = document.createElement('script')
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js'
    document.body.appendChild(script)
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div
          className="visme_d"
          data-title="Untitled Project"
          data-url="4d7mvg4q-untitled-project?fullPage=true"
          data-domain="forms"
          data-full-page="true"
          data-min-height="100vh"
          data-form-id="28973"
          data-popup-settings='{"enable": true, "delay": 10}'
        />
      </>
    )
  }
}

export default LoginForm
