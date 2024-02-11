import React, {useState, useEffect} from 'react'
import './index.css'
import patientData from './Data/PatientData.json'
import GetGraph from './GetGraph';
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
        setThirdDivVisible(!isThirdDivVisible);
        const data = new FormData();
        data.append('file', event.target.files[0]);
    
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data here to inspect what the server responded with
            setResult(data.result);
            setCADPhoto(`data:image/jpeg;base64,${data.image}`);
        })
        .catch(error => {
            console.error(error);
        });
    };
    return(
        <div>
              {(isFirstDivVisible && !isThirdDivVisible) && (
                <div className='Patient-Container Div-Boxes'>
                    <div className='Patient-List-Header Patient-Tab-Header-Text'>
                        <p>Patient List</p>
                    </div>
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
                <div className='Patient-Tab Div-Boxes'>
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
            {(!isFirstDivVisible && isThirdDivVisible) && (
                <div className='Results-Container Div-Boxes'>
                <div className='Patient-Health-Bar-Container'>
                    <div className='Patient-Health-Bar'>
                        {/* Patient health info here */}
                        
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>Age:</span> 35</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>Height:</span> 74</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>Weight:</span> 180</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>DOB:</span> 1989-05-15</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>ID:</span> 1</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>BF%:</span> 18</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>BP:</span> 120/80</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>HR:</span> 72</span>
                        <span className='Health-Bar-Text'><span className='Health-Bar-Label'>SPO2:</span> 98</span>
                    </div>
                </div>
                <div className='Results-Main-Body'>
                    <div className='CT-Scan-Container'>
                        {CADPhoto && <img className='CT-Scan-Image' src={CADPhoto} alt="CT Scan" />}
                    </div>
                    <div className='Graph-Container'>
                        <GetGraph id={obj.id}/>
                    </div>
                </div>
                <div className='Patient-Result-Info-Container'>
                    <div className='Patient-Result-Info'>
                        <p>Patient {obj.name} tested {result} for CAD</p>
                    </div>
                </div>
                <h1 className="Start-Button" onClick={()=>{setIsFirstDivVisible(true)
                    setThirdDivVisible(false)
                }}>Home</h1>
            </div>
            )}
        </div>
    )
}

export default PatientList