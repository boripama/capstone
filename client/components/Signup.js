
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'


/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

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
        <Form onSubmit={evt => handleSubmit(displayName, evt)} name={name} size={"large"}>
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
          <Icon name="google" size="large" />{displayName} with Google

        </Message>
        </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    </div>
  )
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => ({
    handleSubmit: (name, evt) => {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
});

export const Signup = connect(mapSignup, mapDispatch)(AuthForm)


AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
