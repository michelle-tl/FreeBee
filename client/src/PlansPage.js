import React, { useState, useEffect }  from 'react';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Plans.css';
import SearchQueries from './SearchQueries.js';
import TravelItem from './TravelItem'
import axios from 'axios';

const Page_2 = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [plans, setPlans] = useState();
  const [selectedPlan, setSelectedPlan] = useState(undefined);
  const [graph, setGraph] = useState(undefined);


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

  // handler for button -- fetches new plans
  const handleIteration = (e, plan) => {

      const fetchNewPlans = async () => {
          console.log('in iterator');

        const initUrl = `http://localhost:5000/iterate`;
        const data = {plan: plan}; //graph: graph.res_graph,
        const res = await axios.post(initUrl, data);

         const res_plans = res.data.plans;
         const res_graph = res.data.graph;
         console.log(res_graph);
         setPlans({res_plans});
         setGraph({res_graph});
    };
      fetchNewPlans();
  }

  // the travel suggestions
  // TODO: add information about each travel
  const SuggestionsComponent = (props) => {

      if (props.plans) {
          var plan_0 = props.plans.res_plans[0];
          var plan_1 = props.plans.res_plans[1];
          var plan_2 = props.plans.res_plans[2];

          const items_0 = []
          for (const [index, value] of plan_0.entries()) {
            items_0.push(<TravelItem place={value.place}/>)
          }
          const items_1 = []
          for (const [index, value] of plan_1.entries()) {
            items_1.push(<TravelItem place={value.place}/>)
          }
          const items_2 = []
          for (const [index, value] of plan_2.entries()) {
            items_2.push(<TravelItem place={value.place}/>)
          }

          return (
              <div class="Suggestions">
              <Row>
                <div class="Sug-Title">So this is your cup of tea? </div>
                <div class="Sug-Title">We have more that came from! </div>
              </Row>

              <div class="Sugg-List">

                    <Row>
                    <Col>
                      <Button size="sm" onClick={(e) => handleIteration(e, plan_0)}>Explore similar</Button>
                      <div>{items_0}</div>
                    </Col>
                    <Col>
                      <Button size="sm">Explore similar</Button>
                      <div><ul>{items_1}</ul></div>
                    </Col>
                    <Col>
                      <Button size="sm">Explore similar</Button>
                      <div><ul>{items_2}</ul></div>
                    </Col>
                    </Row>
              </div>
            </div>
      );
      }else{
          return <div/>
      }
  }

// 'component did mount'
// TODO update to fetch the correct input
   useEffect(() => {
       const fetchData = async () => {

         const initUrl = `http://localhost:5000/initiate`;
         const data = {from:'LONDON (United Kingdom)', to:'BARCELONA CITY (Spain)'};
         const res = await axios.post(initUrl, data)

         const res_plans = res.data.plans;
         const res_graph = res.data.graph;
         setPlans({res_plans});
         setGraph({res_graph});
     };
       fetchData();
     }, []);

 // Container for all the plans with buttons etc
  return (
      <div class="plans-container">
        <SearchQueries query={props.location.state}></SearchQueries>
        <Container>
          <TitleComponent/>
          <NewSearchComponent/>
          <SuggestionsComponent plans={plans}/>
          <Button variant="secondary">
            <a href='/page_3'>Next Page</a>
            </Button>
        </Container>
    </div>
  )
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
