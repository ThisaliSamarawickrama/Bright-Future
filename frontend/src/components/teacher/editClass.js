import React ,{useState , useEffect} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import Footer from '../footer';
import NavBar from '../main_parts/NavBar';
import {reactLocalStorage} from 'reactjs-localstorage';

export default function EditClass() {

  var classEdit = reactLocalStorage.getObject('classEdit');
  var id =classEdit[0];
  const [teacherName, setTeacherName] = useState(classEdit[2]);
  const [subject, setTeacherSubject] = useState(classEdit[1]);
  const [grade, setGrade] = useState(classEdit[3]);
  const [day, setDay] = useState(classEdit[4]);
  const [classDuration, setClassDuration] = useState(classEdit[6]);

  function editClass(e)
  {
      
      e.preventDefault();
      const classEdit ={id, subject,grade, day,classDuration}
  
        axios.put("http://localhost:5000/class_teacher/updateClass",classEdit).then(() =>{
  
        Swal.fire({  
          title: "Success!",
          text: "Class Updating Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            window.location.href = "/TeacherDash";
          }
        });
  
        
    }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: "Class Updating Not Success",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
    }

  return (
    <div className="Pagebg">
        <NavBar/>
        <MDBRow style={{paddingTop: '15%'  , marginBottom: '5%'}}>
          <MDBCol sm='3'> </MDBCol>
          <MDBCol sm='6'>
            <MDBCard className=" bg-light">
              <MDBCardBody>
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>EDIT CLASS</MDBCardTitle>
                
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Subject </label>
                  <select class="form-select"  defaultValue={subject} onChange={(e) =>{
                            setTeacherSubject(e.target.value);
                         }} >
                      <option value="">Select Subject</option>
                      <option value="Maths">Maths</option>
                      <option value="Science">Science</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="English">English</option>
                      <option value="Tamil">Tamil</option>
                      <option value="ICT">ICT</option>
                      <option value="History">History</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label  class="form-label">Teacher Name </label>
                    <input type="text" class="form-control" value={teacherName} onChange={(e) =>{
                            setTeacherName(e.target.value);
                    }} />
                </div>  
                
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Grade </label>
                  <select class="form-select" defaultValue={grade} onChange={(e) =>{
                            setGrade(e.target.value);
                         }} >
                      <option value="">Select Grade</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                    </select>
                </div>
                
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Class Day </label>
                  <select class="form-select" defaultValue={day}  onChange={(e) =>{
                            setDay(e.target.value);
                         }} >
                      <option value="" selected>Select Day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label  class="form-label">Class Duration </label>
                     <NumberFormat format="##:##" defaultValue={classDuration} className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="Min : Seconds"  onChange={(e) =>{
                                setClassDuration(e.target.value);
                            }}/>
                </div>  
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={editClass}  >Edit</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='3'> </MDBCol>
        </MDBRow>
      <Footer/>       
    </div>
  );
}