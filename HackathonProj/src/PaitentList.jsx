import React, {useState, useEffect} from 'react'
import './index.css'
import ryanImage from './assets/Ryan.jpg'
function PatientList(){
    const [isThirdDivVisible, setThirdDivVisible] = useState(false);
    const [CADPhoto, setCADPhoto] = useState(null)
    const [selectedPic, setselectedPic] = useState(null)
    const [currID, setCurrID] = useState(null);
    const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);
    const handleClick = (id) => (event) => {
      event.preventDefault();
      setIsFirstDivVisible(!isFirstDivVisible);
      setCurrID(id);
    };
    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        setThirdDivVisible(!isThirdDivVisible)
        if (file) {
            setselectedPic(file)
        } else {
            setselectedPic(null)
        }
    }
    useEffect(() => {
        if (selectedPic) {
          // Create a URL for the selected file
          const url = URL.createObjectURL(selectedPic);
          setCADPhoto(url);
    
          // Cleanup function to revoke the object URL
          return () => {
            URL.revokeObjectURL(url);
          };
        }
      }, [selectedPic]);
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
                            <p className="Item-Text">John Doe</p>
                            <p className="Item-Text">Patient ID: {}</p>
                            <p className="Item-Text"><a href="" onClick={handleClick(1)}>Link</a></p>
                        </li>
                        <li id="pid2" className="Patient-item">
                            <p className="Item-Text">Jane Smith</p>
                            <p className="Item-Text">Patient ID: {}</p>
                            <p className="Item-Text"><a href="" onClick={handleClick(2)}>Link</a></p>
                        </li>
                        <li id="pid3" className="Patient-item">
                            <p className="Item-Text">Alex Johnson</p>
                            <p className="Item-Text">Patient ID: {}</p>
                            <p className="Item-Text"><a href="" onClick={handleClick(3)}>Link</a></p>
                        </li>
                        <li id="pid4" className="Patient-item">
                            <p className="Item-Text">Emily Davis</p>
                            <p className="Item-Text">Patient ID: {}</p>
                            <p className="Item-Text"><a href="" onClick={handleClick(4)}>Link</a></p>
                        </li>
                    </ul>
                </div>
            )}

            {(!isFirstDivVisible && !isThirdDivVisible) && (
                <div className='Patient-Tab'>
                    <div className='Patient-Tab-Header Patient-Tab-Header-Text'>
                        <a onClick={handleClick(null)}>Back</a>
                        <p>Ryan Chwiecko</p>
                        <p>Age</p>
                    </div>
                    <div className='Patient-Tab-Container-Collection'>
                        <div className='Patient-Tab-Subcontainer'>
                            <p>Text</p>
                            <ul className='list-container'>
                                <li>
                                    <p></p>
                                </li>
                                <li>
                                    <p>b:0.88</p>
                                </li>
                                <li>
                                    <p>c:0.55</p>  
                                </li>
                                <li>
                                    <p>d:10</p>
                                </li>
                            </ul>
                        </div>
                        <input type="file" accept="image/png" id="input-file" onChange={handleImageChange}/>
                        <label className='button ' htmlFor="input-file">CAD Analyze</label>
                        {/* <button className='button'>CAD Analyze</button> */}
                        <div className='Patient-Tab-Subcontainer'>
                            <p>Text</p>
                            <ul className='list-container'>
                                <li>
                                    <p>a:142</p>
                                </li>
                                <li>
                                    <p>b:0.88</p>
                                </li>
                                <li>
                                    <p>c:0.55</p>  
                                </li>
                                <li>
                                    <p>d:10</p>
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            )}
            {(!isFirstDivVisible && isThirdDivVisible && (
                <div className='Results-Container'>
                    <div className='Patient-Tab-Header Results-Header'>
                        <p>Results for Ryan</p>
                    </div>
                    <div className='Results'>
                        <div className='P-Info-Tab'>
                            <ul>
                                <li className='Info-List-Item'>
                                    Name: Ryan
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
                            <img className = 'Result-Img'src={ryanImage} alt="Pic" />
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