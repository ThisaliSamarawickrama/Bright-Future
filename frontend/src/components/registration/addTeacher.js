import React ,{useState} from 'react';
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


export default function AdTeacher() {

  const d = new Date();
  let studentNum = "T"+d.getFullYear()+""+parseInt((Math.random() * (99999- 10000 + 1)) + 10000);

  const [teacherName, setTeacherName] = useState("");
  const [teacherId, setTeacherID] = useState(studentNum);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherTel, setTeacherTel] = useState("");
  const [teacherGrade, setTeacherGrade] = useState("");
  const [teacherCenter, setTeacherCenter] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [classType, setTeacherClassType] = useState("");
  const [classOrganization, setTeacherClassOrganization] = useState("");


  function submitTeacher(e)
  {
      
      e.preventDefault();
      const teacherReg ={teacherName, teacherId, teacherTel, teacherEmail, teacherGrade, teacherCenter, teacherSubject, classType, classOrganization}
  
        axios.post("http://localhost:5000/teacher/addTeacher",teacherReg).then(() =>{
  
        Swal.fire({  
          title: "Success!",
          text: "Teacher Registration Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            window.location.href = "/Registration";
          }
        });
  
        
    }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: "Teacher Registration Not Success",
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
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>ADD TEACHER</MDBCardTitle>
                
                <div class="mb-3 mt-5">
                    <label  class="form-label">Teacher Name </label>
                    <input class="form-control"  onChange={(e) =>{
                            setTeacherName(e.target.value);
                         }}/>
                </div>  
                
                <div class="mb-3 ">
                  <label  class="form-label">Teacher ID </label>
                    <input class="form-control" disabled value={teacherId} onChange={(e) =>{
                            setTeacherID(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3">
                  <label  class="form-label">Telephone Number </label>
                  <NumberFormat format="0## ### ####" class="form-control" placeholder="0** *** ****"  onChange={(e) =>{
                            setTeacherTel(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3">
                    <label  class="form-label">Email </label>
                    <input class="form-control"  onChange={(e) =>{
                            setTeacherEmail(e.target.value);
                         }}/>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Grade </label>
                  <select class="form-select"  onChange={(e) =>{
                            setTeacherGrade(e.target.value);
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
                  <label for="exampleFormControlInput1" class="form-label">Center </label>
                  <select class="form-select"  onChange={(e) =>{
                            setTeacherCenter(e.target.value);
                         }} >
                      <option value="">Select Center</option>
                      <option value="Indeepa">Indeepa</option>
                      <option value="Sisulka">Sisulka</option>
                      <option value="Montana">Montana</option>
                      <option value="Susipone">Susipone</option>
                    </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Subject </label>
                  <select class="form-select"  onChange={(e) =>{
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
                  <label for="exampleFormControlInput1" class="form-label">Class Type </label>
                  <select class="form-select"  onChange={(e) =>{
                            setTeacherClassType(e.target.value);
                         }} >
                      <option value="">Select Class Type</option>
                      <option value="Theory">Theory</option>
                      <option value="Revision">Revision</option>
                      <option value="Paper">Paper</option>
                    </select>
                </div> 
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Class Organization</label>
                  <select class="form-select"  onChange={(e) =>{
                            setTeacherClassOrganization(e.target.value);
                         }} >
                      <option value="">Select Class Organization</option>
                      <option value="Individual">Individual</option>
                      <option value="Group">Group</option>
                    </select>
                </div> 
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Registration' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={submitTeacher}  >Submit</MDBBtn>
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