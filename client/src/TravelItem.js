import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const TravelItem = (props) => {

  return (
    <div className='travel-item'>
    this is a travel item, plan: {props.plan}
    </div>
  )
}

export default TravelItem;
