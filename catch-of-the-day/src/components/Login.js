import React from 'react';
import PropTypes from 'prop-types'

class Login extends React.Component {
  render() {
    return (
      <nav>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory.</p>
        <button
          className="github"
          onClick={() => this.props.authenticate("Github")}
        >
          Login with GitHub
        </button>
      </nav>
    )
  }
}

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
