import React from 'react';
import { Link } from 'react-router-dom';

const Error = (err) => {
  return(
    <div id="root">
      <div className="bounds">
        <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error. </p>
          <Link className="button button-secondary" to="/courses">Return to List</Link>
      </div>
    </div>
  )
}

export default Error;
