import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Page_2 = () => {
  // Declare a new state variable, which we'll call "count"
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);

  return (
      <div>Plans page
        <Button variant="primary">
            <Link to={{
              pathname: '/page_3',
              state: {
                plan: 'paris'
              }
            }}>Buy Plan
            </Link>
        </Button>
      </div>
  );
}

export default Page_2;
