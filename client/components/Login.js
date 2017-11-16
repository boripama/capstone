import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'





// <div>
// <form onSubmit={handleSubmit} name={name}>
//   <div>
//     <label htmlFor="email"><small>Email</small></label>
//     <input name="email" type="text" />
//   </div>
//   <div>
//     <label htmlFor="password"><small>Password</small></label>
//     <input name="password" type="password" />
//   </div>
//   <div>
//     <button type="submit">{displayName}</button>
//   </div>
//   {error && error.response && <div> {error.response.data} </div>}
// </form>
// <a href="/auth/google">{displayName} with Google</a>
// </div>
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div className="loginForm" style={{height: '100%'}}>
    <Grid
      textAlign="center"
      style={{ height: '450px'}}
      verticalAlign="middle"
    >
      <Grid.Column style= {{ maxWidth: 450}}>
        <Header as="h2" color="blue" textAlign="center">
        {displayName}
        </Header>
        <Form onSubmit={evt => handleSubmit(evt)} name={name} size={"large"}>
          <Segment stacked style={{ height: '225px', width: '400px'}}>
          <Form.Input
          style={{width: '150px'}}
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          type="text"
          name="email"
          />
          <Form.Input 
          style={{width: '150px'}}
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="password"
          />
          <Button style={{width: '200px', margin: '0 auto'}}color="green" fluid size="large">
          {displayName}
        </Button>
        <Message href="/auth/google" style={{ top: '24px' }}>
          <Icon name="google" size="large" />Google {displayName}

        </Message>
        </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    </div>
  )
}

        
       
       

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => ({
    handleSubmit: (evt) => {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName));
    },
  });


export const Login = connect(mapLogin, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
