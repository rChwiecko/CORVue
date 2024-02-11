import React, { useState } from 'react';
import PatientList from './PatientList.jsx';
import Navbar from './Navbar';
function App() {
  const [startScreen, setStartScreen] = useState(true)
  return (
    <div>
      {startScreen && (
        <div>
            <div className="Start-Div">
              <h1 className='Start-Text animated-tag'>CORVue.</h1>
              <p className="Text Start-Button" onClick={()=>setStartScreen(false)}>Click to Start</p>
          </div>
        </div>
      )}
      {!startScreen && (
        <div>
            <Navbar/>
            <PatientList/>
        </div>
      )}
      {/* {startScreen && (
        <p>testing</p>
      )}
      {!startScreen && (
            <Navbar/>
            <PatientList/>
      )} */}
    </div>
  )
}
export default App