import React, { useState, useEffect }  from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';


const Page_2 = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(undefined);

  // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
     axios.get(`http://localhost:5000/`)
           .then(res => {
               const res_plans = res.data.plans;
               setPlans({ res_plans });
               console.log(res_plans);
           })
       });

  return (
      <Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
  <div>PlansPage page. Data from 1: {props.location.state.cityFrom}</div>
  <div>PlansPage page. Data from 1: {props.location.state.cityTo}</div>
  <div>PlansPage page. Data from 1: {props.location.state.startDate}</div>
  <div>PlansPage page. Data from 1: {props.location.state.endDate}</div>
  <div>PlansPage page. Data from 1: {props.location.state.nbrTravellers}</div>
</Container>
  )
}

/*
<div>Plans page
  <Button variant="primary">
  <Link
      to={{
      pathname: "/page_3",
      state: {plan: 'paris'} // your data array of objects
      }}
      >Buy</Link>
  </Button>
</div>
*/

export default Page_2;
