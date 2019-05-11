import React, { useState, useEffect }  from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Plans.css';
import SearchQueries from './SearchQueries.js';
import TravelItem from './TravelItem'

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
         //console.log(res_plans);
         setPlans({res_plans});
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
          <SuggestionsComponent plans={plans}/>
        </Container>
    </div>
  )
}

const TitleComponent = () =>{
  return(
    <div class="Title">
      <Row className='primar-color'>
        <h1>Some awsome travel plans.</h1>
      </Row>
      <Row >
        <h4>Are you ready for your adventure?!</h4>
      </Row>
    </div>
  )
}

const NewSearchComponent = () =>{
    return(
    <div class="NewSearch">
      <Row>
        <div className='ml-auto mr-3'>text with button -- right
        <Button className='button-primary-color'>Give me more!</Button>
        </div>
      </Row>
    </div>
    )
}

const SuggestionsComponent = (props) => {

    if (props.plans) {
        console.log(props.plans.res_plans);
        const thePlans = props.plans.res_plans;

        const items = []

        for (const [index, value] of thePlans.entries()) {
          items.push(<li key={index}>{value.place}</li>)
        }
        return (
      <div class="Suggestions">
      <Row>
        <div> So this is your cup of tea? We have more that came from! </div>
      </Row>
      <div>
        <Row>
        <Col></Col>
        <Col></Col>
        <Col>
            <ul>
            {items}
            </ul>
        </Col>
        </Row>
      </div>
    </div>
    );
}
return <div/>;

}
/*

{thePlans.map((currentPlan, index) => {
  return <li><TravelItem plan={currentPlan}/></li>
})}
*/

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
