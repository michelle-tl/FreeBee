import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './TravelItem.css';

const TravelItem = (props) => {

  return (
    <div className='travel-item'>
    {props.place}

    </div>
  )
}

export default TravelItem;
//<img src="yourpic.jpg" style=" width:100%; height:100%;"/>
//    <div className="card-header"></div>
