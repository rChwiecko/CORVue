import React, { useState } from 'react';
import PatientList from './PatientList.jsx';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <PatientList/>
    </div>
  )
}
export default App