import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    <form>
      <input
        type="email"
        data-testid="email-input"
        onChange={ (x) => setEmail(x.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ (x) => setPassword(x.target.value) }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
