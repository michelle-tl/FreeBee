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

         const res_plans = res.data.plans;
         console.log(res_plans);
         //setPlans({ res_plans });
     };
       fetchData();
     }, []);

// {props.location.state.cityFrom} - {props.location.state.cityTo}
console.log(plans);
  return (
      <div class="plans-container">
        <SearchQueries query={props.location.state}></SearchQueries>
        <Container>
          <TitleComponent/>
          <NewSearchComponent/>
          <SuggestionsComponent/>
          <Button variant="secondary">
            <a href='/page_3'>Next Page</a>
            </Button>
        </Container>
    </div>
  )
}

const TitleComponent = () =>{
  return(
    <div class="title">
        <h1 class="primar-color">Some awsome travel plans.</h1>
        <h4>Are you ready for your adventure?!</h4>
    </div>
  )
}

const NewSearchComponent = () =>{
    return(
    <div class="NewSearch">
        <div className="">Didn't find a journey of your dreams?</div>
        <div className=''>No worries!</div>
        <Button className='button-primary-color'>Give me more!</Button>
    </div>
    )
}

const SuggestionsComponent = () => {
  return (
    <div class="Suggestions">
    <Row>
      <div class="Sug-Title">So this is your cup of tea? </div>
      <div class="Sug-Title">We have more that came from! </div>
    </Row>
    <div class="Sugg-List">
      <Row>
      <Col>      
        <Button size="sm">Explore similar</Button>
        <div>1 out of 3</div>
      </Col>
      <Col>      
        <Button size="sm">Explore similar</Button>
        <div>2 out of 3</div>
      </Col>
      <Col>      
        <Button size="sm">Explore similar</Button>
        <div>3 out of 3</div>
      </Col>
      </Row>
    </div>
  </div>
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
