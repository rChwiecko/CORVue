import React, {useState, useEffect} from 'react'
import './index.css'
import ryanImage from './assets/Ryan.jpg'
import patientData from './Data/PatientData.json'
function findPatientById(patientId) {
    return patientData.patients.find((patient) => patient.id === patientId.toString());
  }
function PatientList(){
    const [isThirdDivVisible, setThirdDivVisible] = useState(false);
    const [CADPhoto, setCADPhoto] = useState(null)
    const [selectedPic, setselectedPic] = useState(null)
    const [currID, setCurrID] = useState(null);
    const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);
    const patient1 = findPatientById("1");
    const patient2 = findPatientById("2");
    const patient3 = findPatientById("3");
    const patient4 = findPatientById("4");
    const obj = currID ? findPatientById(currID) : null;
    const [result, setResult] = useState('');
    const handleClick = (id) => (event) => {
      event.preventDefault();
      setIsFirstDivVisible(!isFirstDivVisible);
      setCurrID(id);
    };
    const handleImageUpload = event => {
        setThirdDivVisible(!isThirdDivVisible)
        const data = new FormData();
        data.append('file', event.target.files[0]);
    
        fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          body: data,
        })
          .then(response => response.json())
          .then(data => {
            setResult(data.result);
          })
          .catch(error => {
            console.error(error);
          });
      };
    return(
        <div>
              {(isFirstDivVisible && !isThirdDivVisible) && (
                <div className='Patient-Container'>
                    <ul>
                        <li id="List-Header" className='Patient-item List-Header'>
                            <p className='Header-Text'>Name</p>
                            <p className='Header-Text'>Patient ID</p>
                            <p className='Header-Text Far-Right'>Access Link</p>
                        </li>
                        <li id="pid1" className="Patient-item">
                            <p className="Item-Text">{patient1.name}</p>
                            <p className="Item-Text">{patient1.id}</p>
                            <p className="Item-Text"><a href="#" onClick={handleClick("1")}>Link</a></p>
                        </li>
                        <li id="pid2" className="Patient-item">
                            <p className="Item-Text">{patient2.name}</p>
                            <p className="Item-Text">{patient2.id}</p>
                            <p className="Item-Text"><a href="#" onClick={handleClick("2")}>Link</a></p>
                        </li>
                        <li id="pid3" className="Patient-item">
                            <p className="Item-Text">{patient3.name}</p>
                            <p className="Item-Text">{patient3.id}</p>
                            <p className="Item-Text"><a href="#" onClick={handleClick("3")}>Link</a></p>
                        </li>
                        <li id="pid4" className="Patient-item">
                            <p className="Item-Text">{patient4.name}</p>
                            <p className="Item-Text">{patient4.id}</p>
                            <p className="Item-Text"><a href="#" onClick={handleClick("4")}>Link</a></p>
                        </li>
                    </ul>

                </div>
            )}

            {(!isFirstDivVisible && !isThirdDivVisible) && (
                <div className='Patient-Tab'>
                    <div className='Patient-Tab-Header Patient-Tab-Header-Text'>
                        <a onClick={handleClick(null)}>Back</a>
                        <p>{obj.name}</p>
                        <p>Age: {obj.age}</p>
                    </div>
                    <div className='Patient-Tab-Container-Collection'>
                        <div className='Patient-Tab-Subcontainer'>
                            <ul className='list-container'>
                                <li>
                                    <p>Name: {obj.name}</p>
                                </li>
                                <li>
                                    <p>Height: {obj.height}</p>
                                </li>
                                <li>
                                    <p>Weight: {obj.weight}</p>  
                                </li>
                                <li>
                                    <p>DOB: {obj.dob}</p>
                                </li>
                            </ul>
                        </div>
                        <input type="file" accept="image/png" id="input-file" onChange={handleImageUpload}/>
                        <label className='button ' htmlFor="input-file">CAD Analyze</label>
                        <div className='Patient-Tab-Subcontainer'>
                            <ul className='list-container'>
                                <li>
                                    <p>BF%: {obj['bf%']}</p>
                                </li>
                                <li>
                                    <p>BP: {obj.bp}</p>
                                </li>
                                <li>
                                    <p>Heartrate: {obj.hr}</p>  
                                </li>
                                <li>
                                    <p>SPO2: {obj.spo2}</p>
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            )}
            {(!isFirstDivVisible && isThirdDivVisible && (
                <div className='Results-Container'>
                    <div className='Patient-Tab-Header Results-Header'>
                        <p>Results for {obj.name}</p>
                    </div>
                    <div className='Results'>
                        <div className='P-Info-Tab'>
                            <ul>
                                <li className='Info-List-Item'>
                                    <p>Result: {result}</p>
                                </li>   
                                <li className='Info-List-Item'>
                                    Age: 19
                                </li>
                                <li className='Info-List-Item'>
                                    other: yada
                                </li>
                                <li className='Info-List-Item'>
                                    other: yada
                                </li>
                                <li className='Info-List-Item'>
                                    other: yada
                                </li>
                                <li className='Info-List-Item'>
                                    other: yada
                                </li>
                            </ul>
                        </div>
                        <div className='Image-Info'>
                            <img className = 'Result-Img'src={result} alt="Pic" />
                            <div className='Info-Container'>
                                <p>Lorem Ipsum</p>
                            </div>
                        </div>
                        <div className='Regression'>
                            <div className='P-Info-Tab'>
                                <p>Lorem</p>
                            </div>
                            <div className='P-Info-Tab Regression-Additional'>
                                <p>Lorem</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PatientList