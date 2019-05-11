import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './TravelItem.css';

const TravelItem = (props) => {

  return (
    <div className='travel-item'>
    <img src="images/Barcelona.png"></img>
{props.place}
    </div>
  )
}

export default TravelItem;
