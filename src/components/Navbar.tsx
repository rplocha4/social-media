import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex flex-col">
      <Link to="/home">Home</Link>
    </div>
  );
}

export default Navbar;
