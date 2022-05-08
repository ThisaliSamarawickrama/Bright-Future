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


export default function AdminDash() {

  const d = new Date();
  let studentNum = "ST"+d.getFullYear()+""+parseInt((Math.random() * (99999- 10000 + 1)) + 10000);

  const [name, setStudentName] = useState("");
  const [studentId, setStudentID] = useState(studentNum);
  const [studentAddress, setStudentAddress] = useState("");
  const [contactNumber, setStudentTel] = useState("");
  const [grade, setStudentGrade] = useState("");
  const [parentContactNumber, setStudentParentTel] = useState("");


  function submitStd(e)
  {

      e.preventDefault();
      const stdReg ={  name, studentNum, studentAddress, contactNumber, grade, parentContactNumber}
  
        axios.post("http://localhost:5000/student/add",stdReg).then(() =>{
  
        Swal.fire({  
        title: "Success!",
        text: "Student Registration Success!",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"}).then(okay => {
        if (okay) {
          window.location.href = "/Student";
        }
        });
  
        
    }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: "Student Registration Not Success",
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
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>ADD STUDENT</MDBCardTitle>
                
                <div class="mb-3 mt-5">
                  <label  class="form-label">Student Name </label>
                    <input class="form-control"  onChange={(e) =>{
                            setStudentName(e.target.value);
                         }}/>
                </div>  
                <div class="mb-3 ">
                  <label  class="form-label">Student ID </label>
                    <input class="form-control" disabled value={studentId} onChange={(e) =>{
                            setStudentID(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3 ">
                  <label  class="form-label">Student Address </label>
                    <input class="form-control"  onChange={(e) =>{
                            setStudentAddress(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3">
                  <label  class="form-label">Telephone Number </label>
                  <NumberFormat format="0## ### ####" class="form-control" placeholder="0** *** ****"  onChange={(e) =>{
                            setStudentTel(e.target.value);
                         }}/>
                </div> 
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Grade </label>
                  <select class="form-select"  onChange={(e) =>{
                            setStudentGrade(e.target.value);
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
                    </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Parent Phone Number </label>
                  <NumberFormat format="0## ### ####" class="form-control" placeholder="0** *** ****"   onChange={(e) =>{
                            setStudentParentTel(e.target.value);
                         }}/>
                </div>  
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={submitStd}  >Submit</MDBBtn>
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