import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../style/Header.css';

function Header({ type, title }) {
  const [visibleInput, setVisibleInput] = useState(false);
  const [visibleimage, setVisibleImage] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const { location: { pathname } } = history;
    if (pathname === '/explore'
    || pathname === '/explore/foods'
    || pathname === '/explore/foods/ingredients'
    || pathname === '/explore/drinks'
    || pathname === '/explore/drinks/ingredients'
    || pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes') {
      setVisibleImage(false);
    }
  }, [history]);

  return (
    <Container fluid className="navbar__bg fixed-top">
      <Row className="py-2">
        <Col xs="2" className="d-flex justify-content-center align-items-center">
          <Link to="/profile">
            <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
          </Link>
        </Col>
        <Col xs="8" className="d-flex justify-content-center align-items-center">
          <h1 className="header__title" data-testid="page-title">{ title }</h1>
        </Col>
        {visibleimage && (
          <Col
            xs="2"
            className="d-flex justify-content-center align-items-center"
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            onClick={ () => setVisibleInput((prevVisible) => !prevVisible) }
          >
            <img
              src={ searchIcon }
              alt="page-search"
              data-testid="search-top-btn"
            />

          </Col>
        )}
        {visibleInput && (
          <SearchBar type={ type } />
        )}
      </Row>
    </Container>
  );
}

Header.defaultProps = {
  type: '',
  title: '',
};

Header.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
};

export default Header;
