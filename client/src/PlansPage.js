import React, { useState, useEffect }  from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

console.log(plans);
  return (
      <div>{plans}</div>
  )
  /*
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
</Container>
*/
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
