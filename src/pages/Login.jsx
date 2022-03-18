import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../style/Login.css';
import logo from '../images/logoRecipe.png';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const btnValidation = () => {
    const minimal = 6;
    const isValid = email.includes('@')
    && email.includes('.com') && password.length > (minimal);

    if (isValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    btnValidation();
  });

  const handleSubmit = () => {
    const { history } = props;
    history.push('/foods');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <Row
      className="login__page d-flex justify-content-center align-items-center"
      style={ { height: '100vh' } }
    >
      <Col xs="12" className="align-self-end d-flex justify-content-center">
        <Row>
          <Col xs="12"><img className="login__logo" src={ logo } alt="logo" /></Col>
          <Col xs="12"><span className="login__title">Recipe Project</span></Col>
        </Row>
      </Col>
      <Col xs="12" className="align-self-start">
        <form className="mx-5 px-4 d-flex flex-column">
          <input
            type="email"
            data-testid="email-input"
            placeholder="digite seu email"
            className="form-control input__border"
            onChange={ (x) => setEmail(x.target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="******"
            className="my-2 form-control input__border"
            onChange={ (x) => setPassword(x.target.value) }
          />
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ disabled }
            className="btn login__button border"
            onClick={ handleSubmit }
          >
            Enter
          </button>
        </form>
      </Col>
    </Row>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
