import React, { useState, useEffect }  from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Plans.css';
import SearchQueries from './SearchQueries.js';

import axios from 'axios';
//axios.defaults.withCredentials = true;


const Page_2 = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [plans, setPlans] = useState();
  const [selectedPlan, setSelectedPlan] = useState(undefined);

   useEffect(() => {
       const fetchData = async () => {
         /*const res = await axios.get(
             `http://localhost:5000/initiate`,
         );*/
         const initUrl = `http://localhost:5000/initiate`;
         const data = {from:'Stockholm', to:'Gothenburg'};
         const res = await axios.post(initUrl, data)

         //const res_plans = res.data.plans;
         console.log(res.data);
         //setPlans({ res_plans });
     };
       fetchData();
     }, []);

// {props.location.state.cityFrom} - {props.location.state.cityTo}
console.log(plans);
  return (
      <div class="plans-container">
        <SearchQueries></SearchQueries>
        <Container>
          <Row>
            <h1>Some awsome travel plans.</h1>
          </Row>
          <Row>
            <h4>Are you ready for your adventure?!</h4>
          </Row>
          <Row>
            <NewSearchComponent/>
          </Row>
          <Row>
            <div> So this is your cup of tea? We have more that came from! </div>
          </Row>
          <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
          </Row>
        </Container>
    </div>
  )

}

const NewSearchComponent = () =>{
    return(
    <div>text with button -- right</div>
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
