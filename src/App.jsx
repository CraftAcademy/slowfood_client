import React, { Component } from 'react'
import Menu from "./components/Menu";
import Login from "./components/Login";


class App extends Component {
  state = {
    authenticated: false
  }

  render() {
    let login
    this.state.authenticated ? (
      login = (
        <p id="message">You are currently logged in as {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
      )
    ) : (
      login = (
        <Login 
          setAuthenticated={() => this.setState({authenticated: true})}
        />
      )
    )

    return (
      <>
        {login}
        <h1>Slowfood</h1>
        <Menu 
          authenticated={this.state.authenticated}
        />
      </>
    )
  }
}

export default App;
