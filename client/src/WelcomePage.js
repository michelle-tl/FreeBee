import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Welcome.css';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Page_1 = () => {
  // Declare a new state variable, which we'll call "count"
  const [cityFrom, setCityFrom] = useState(0);
  const [cityTo, setCityTo] = useState(0);
  const [nbrTravellers, setNbrTravellers] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function handleCityFromChange(event) {
    setCityFrom(event.target.value)
  }

  function handleCityToChange(event) {
    setCityTo(event.target.value)

  }

  function handleNbrTravellers(event) {
    setNbrTravellers(event.target.value)
  }

  
  function handleStartDateChange(date){
    setStartDate(date);
  }

  function handleEndDateChange(date){
    setEndDate(date);

  }

  return (
    <div class="welcome-container">
      <div class="form">
        <Form >
          <h2>Explore your next journey.</h2>
          <Form.Group className="form-input" controlId="formBasicFrom">
            <Form.Label>From</Form.Label>
            <Form.Control placeholder="From where?" onChange={handleCityFromChange}/>
          </Form.Group>

          <Form.Group className="form-input"controlId="formBasicTo">
            <Form.Label>To</Form.Label>
            <Form.Control placeholder="Where to?" onChange={handleCityToChange}/>
          </Form.Group>
          <div class="form-date">
          <Form.Group className="form-input" controlId="formBasicBeginning">
            <Form.Label>Date of Beginning</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
            />
          </Form.Group>
          <Form.Group className="form-input" controlId="formBasicArrival">
            <Form.Label>Date of Arrival</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
            />
          </Form.Group>

          </div>
          <Form.Group className="form-input" controlId="exampleForm.ControlSelect1">
            <Form.Label>Number of Travellers</Form.Label>
            <Form.Control as="select" onChange={handleNbrTravellers}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            <Link
              to={{
              pathname: "/page_2",
              state: { 
                cityFrom: cityFrom,
                cityTo: cityTo,
                startDate: startDate.toLocaleDateString("en-US"),
                endDate: endDate.toLocaleDateString("en-US"),
                nbrTravellers: nbrTravellers,
                } // your data array of objects
              }}
              >Explore</Link>
          </Button>     
        </Form>
      </div>
    </div>
  );
}


export default Page_1;
