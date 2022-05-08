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
import {reactLocalStorage} from 'reactjs-localstorage';

export default function EditStudent() {

  var teacherProfile = reactLocalStorage.getObject('teacherProfile');
  var tID =teacherProfile[0];
  console.log(tID);

  const [teacherName, setteacherName] = useState(teacherProfile[1]);
  const [teacherId, setteacherId] = useState(teacherProfile[2]);
  const [teacherTel, setteacherTel] = useState(teacherProfile[3]);
  const [teacherEmail, setteacherEmail] = useState(teacherProfile[4]);
  const [teacherGrade, setteacherGrade] = useState(teacherProfile[5]);
  const [teacherCenter, setteacherCenter] = useState(teacherProfile[6]);
  const [teacherSubject, setteacherSubject] = useState(teacherProfile[7]);
  const [classType, setclassType] = useState(teacherProfile[8]);
  const [classOrganization, setclassOrganization] = useState(teacherProfile[9]);


  function editTeacher(e)
  {
        e.preventDefault();
        const teacherEdit ={teacherName,tID, teacherTel, teacherEmail, teacherGrade, teacherCenter, teacherSubject, classType, classOrganization}
         
        axios.put("http://localhost:5000/teacher/updateTeacher",teacherEdit).then(() =>{
  
        Swal.fire({  
        title: "Success!",
        text: "Teacher Profile Updating Success!",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"}).then(okay => {
        if (okay) {
          window.location.href = "/Teacher";
        }
        });
  
        
    }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: "Teacher Profile Updating Not Success",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
    }

  return (
    <div className="Pagebg">
        <NavBar/>
        <MDBRow style={{paddingTop: '15%' , marginBottom: '5%'}}>
          <MDBCol sm='3'> </MDBCol>
          <MDBCol sm='6'>
            <MDBCard className=" bg-light">
              <MDBCardBody>
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>TEACHER'S PROFILE</MDBCardTitle>
                
                <div class="mb-3 mt-5">
                    <label  class="form-label">Teacher Name </label>
                    <input class="form-control" disabled value={teacherName}  onChange={(e) =>{
                            setteacherName(e.target.value);
                         }}/>
                </div>  
                
                <div class="mb-3 ">
                  <label  class="form-label">Teacher ID </label>
                    <input class="form-control" disabled value={teacherId} onChange={(e) =>{
                            setteacherId(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3">
                  <label  class="form-label">Telephone Number </label>
                  <NumberFormat format="0## ### ####" disabled value={teacherTel} class="form-control" placeholder="0** *** ****"  onChange={(e) =>{
                            setteacherTel(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3">
                    <label  class="form-label">Email </label>
                    <input class="form-control" disabled value={teacherEmail}  onChange={(e) =>{
                            setteacherEmail(e.target.value);
                         }}/>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Grade </label>
                  <select class="form-select" disabled value={teacherGrade} onChange={(e) =>{
                            setteacherGrade(e.target.value);
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
                  <select class="form-select" disabled value={teacherCenter}  onChange={(e) =>{
                            setteacherCenter(e.target.value);
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
                  <select class="form-select" disabled value={teacherSubject} onChange={(e) =>{
                            setteacherSubject(e.target.value);
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
                  <select class="form-select" disabled value={classType} onChange={(e) =>{
                            setclassType(e.target.value);
                         }} >
                      <option value="">Select Class Type</option>
                      <option value="Theory">Theory</option>
                      <option value="Revision">Revision</option>
                      <option value="Paper">Paper</option>
                    </select>
                </div> 
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Class Organization</label>
                  <select class="form-select" disabled value={classOrganization} onChange={(e) =>{
                            setclassOrganization(e.target.value);
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