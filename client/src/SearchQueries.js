import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Welcome.css';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Plans.css';

const SearchQueries = () => {
  

  return (
    <div class="settings border-top-bottom">
          <Button variant="primary" >Test
            {/* {props.location.state.cityFrom} - {props.location.state.cityTo} */}
            </Button>     
        </div>
  );
}


export default SearchQueries;
