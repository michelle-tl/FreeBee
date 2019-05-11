import React, { useState } from 'react';

const Page_3 = (props) => {
  // Declare a new state variable, which we'll call "count"
  const [cityFrom, setCityFrom] = useState(0);

  console.log(props);
  return (
      <div>Checkout page. Plan: {props.plan}</div>
  );
}

export default Page_3;
