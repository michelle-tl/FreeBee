import React, { useState } from 'react';

const Page_1 = () => {
  // Declare a new state variable, which we'll call "count"
  const [cityFrom, setCityFrom] = useState(0);

  function handleStatusChange(event) {
    setCityFrom(event.target.value)
  }

  function handleSubmit(event) {
      alert('City From: ' + cityFrom);
      event.preventDefault();
  }

  return (
      <form onSubmit={handleSubmit}>
        <label>
          From City:
          <input type="text" value={cityFrom} onChange={handleStatusChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  );
}

export default Page_1;
