import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './TravelItem.css';

import barcelona from '../images/Barcelona.png'
import brussels from '../images/Brussels.png'
import copenhagen from '../images/Copenhagen.png'
import paris from '../images/Paris.png'
import marseille from '../images/Masrseille.png'
import rotterdam from '../images/Rotterdam.png'
import strasburg from '../images/strasburg.png'
import london from '../images/London.png'
import madrid from '../images/Madrid.png'

const TravelItem = (props) => {
    // TODO make case instead
    const imgX = (place) =>{
        if(place =='BARCELONA CITY (Spain)'){
            return barcelona;
        }
        if(place =='MARSEILLE ST CHARLES (France)'){
            return marseille;
        }
        if(place =='PARIS (France)'){
            return paris;
        }
        if(place =='LONDON (United Kingdom)'){
            return london;
        }
        if(place =='MADRID CITY (Spain)'){
            return madrid;
        }
        if(place =='ROTTERDAM CENTRAAL (Netherlands)'){
            return rotterdam;
        }
        if(place =='LONDON (United Kingdom)'){
            return london;
        }
        if(place =='STRASBOURG (France)'){
            return strasburg;
        }else{
            // some default picture
            return paris;
        }
    }

  return (
    <div className='travel-item'>
    {props.place}
    <div className="card-header">
    <img src={imgX(props.place)} />
    </div>
    </div>
  )
}

export default TravelItem;
