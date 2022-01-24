import { useState, useEffect } from 'react';
import { Alert, FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
};

export default function Register() {
  const [values, setValues] = useState(initialState);

  // global context and useNavigate later

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {values.showAlert && <Alert />}
        {/* name field */}
        <FormRow
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
          labelText='Name'
        />
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
          labelText='Email'
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
          labelText='Password'
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  );
}
