import React, { useState } from 'react';
import PatientList from './PaitentList';
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