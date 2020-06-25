import React, {useState} from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constant';
import { useHistory, withRouter } from 'react-router';

const Login = withRouter(({history}) => {

  const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!){
      signup(email: $email, password: $password, name: $name){
        token
      }
    }
  `;

  const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!){
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleInput = input => e => {
    switch (input) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const handleLogin = () => {
    setLogin(!login);
  }

  const _confirm = async data  => {
    console.log(data);
    const {token} = login ? data.login : data.signup;
    _saveUserData(token);
    history.push('/');
  }

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  return(
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Signup'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input 
            value={name}
            onChange={handleInput('name')}
            type="text"
            placeholder="Your Name"
          />
        )}
          <input 
            value={email}
            onChange={handleInput('email')}
            type="text"
            placeholder="Your email address"
          />
          <input 
            value={password}
            onChange={handleInput('password')}
            type="password"
            placeholder="Choose a safe password"
          />
      </div>
      <div className="flex mt3">
        <Mutation 
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{email, password, name}}
          onCompleted={data =>{return _confirm(data)}}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}

        </Mutation>
        <div className="pointer button" onClick={handleLogin}>
          {login ? 'need to create an account' : 'already have an account'}
        </div>
      </div>
    </div>
  )

})

export default Login;
