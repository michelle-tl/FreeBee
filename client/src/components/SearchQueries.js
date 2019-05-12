import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import './Welcome.css';
import './SearchQueries.css';

const SearchQueries = (props) => {
  console.log(props)
  return (
    <div class="settings border-top-bottom">
          <Button variant="primary" className="button-primary-color">
            {props.query.cityFrom} -  {props.query.cityTo}
          </Button>
          <Button variant="primary" className="button-primary-color">
            {props.query.startDate} -  {props.query.endDate}
          </Button>
          <Button variant="primary" className="button-primary-color">
            {props.query.nbrTravellers} Travellers
          </Button>
        </div>
  );
}


export default SearchQueries;
