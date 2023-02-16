import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/me">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <main className='form-signin w-100 m-auto text-center p-5'>
        <h2 className='h3 mb-3 fw-normal'>Please Log in</h2>
        <form onSubmit={handleFormSubmit}>
          <div className='form-floating p-1'>
          <input
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          </div>
          <div className='form-floating p-1'>
          <input
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          </div>
          <div className='p-1'>
      <Link to="/signup">
        Click here to Signup Instead
      </Link>
      </div>
          <button type="submit" className='w-40 btn btn-lg btn-primary'>
            Submit
          </button>
        </form>
      </main>
    );
  };

  return (
      <div>
        {renderForm()}
        {error && <div>{error.message}</div>}
        
      </div>
  );
};

export default Login;
