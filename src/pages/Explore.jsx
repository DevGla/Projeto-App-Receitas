import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Explore.css';
import ExploreCard from '../components/ExploreCard';

function Explore() {
  return (
    <div className="mt-5 pt-5">
      <Header title="Explore" />
      <Row>
        <Col xs="12" className="card">
          <Link
            className="btn w-100 shadow mb-5 bg-body rounded "
            to="/explore/foods"
            data-testid="explore-foods"
          >
            <ExploreCard
              title="Explore Foods"
              image="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"
            />
          </Link>
        </Col>
        <Col xs="12">
          <Link
            className="btn w-100 shadow mb-5 bg-body rounded"
            to="/explore/drinks"
            data-testid="explore-drinks"
          >
            <img
              src="https://www.cidademarketing.com.br/marketing/wp-content/uploads/2021/09/paodeacucar_drinks-640x428.jpg"
              className="card-img-top explore-img"
              alt="..."
              height="170px"
            />
            <div className="card-body  py-2">
              Explore Drinks
            </div>
          </Link>
          {/* <Link
            className="btn w-100"
            to="/explore/drinks"
            data-testid="explore-drinks"
          >
            Explore Drinks
          </Link> */}
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Explore;
