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

  var studentProfile = reactLocalStorage.getObject('studentProfile');
 
  var sID =studentProfile[0];
  console.log(sID);
  const [name, setStudentName] = useState(studentProfile[2]);
  const [studentNum, setStudentID] = useState(studentProfile[1]);
  const [studentAddress, setStudentAddress] = useState(studentProfile[6]);
  const [contactNumber, setStudentTel] = useState(studentProfile[3]);
  const [grade, setStudentGrade] = useState(studentProfile[4]);
  const [parentContactNumber, setStudentParentTel] = useState(studentProfile[5]);


  function editStd(e)
  {

        e.preventDefault();
        const studentEdit ={ name , sID ,studentAddress , contactNumber , grade , parentContactNumber}
         
        axios.put("http://localhost:5000/student/updateStudent",studentEdit).then(() =>{
  
        Swal.fire({  
        title: "Success!",
        text: "Student Profile Updating Success!",
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
          text: "Student Profile Updating Not Success",
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
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>EDIT STUDENT</MDBCardTitle>
                
                <div className="mb-3 mt-5">
                  <label  className="form-label">Student Name </label>
                    <input className="form-control" value={name}  onChange={(e) =>{
                            setStudentName(e.target.value);
                         }}/>
                </div>  
                <div className="mb-3 ">
                  <label  className="form-label">Student ID </label>
                    <input className="form-control" disabled value={studentNum} onChange={(e) =>{
                            setStudentID(e.target.value);
                         }}/>
                </div> 
                <div className="mb-3 ">
                  <label  className="form-label">Student Address </label>
                    <input className="form-control" value={studentAddress}  onChange={(e) =>{
                            setStudentAddress(e.target.value);
                         }}/>
                </div> 
                <div className="mb-3">
                  <label  className="form-label">Telephone Number </label>
                  <NumberFormat format="0## ### ####" value={contactNumber} className="form-control" placeholder="0** *** ****"  onChange={(e) =>{
                            setStudentTel(e.target.value);
                         }}/>
                </div> 
                <div className="mb-3">
                  <label  className="form-label">Grade </label>
                  <select className="form-select"  value={grade} onChange={(e) =>{
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
                <div className="mb-3">
                  <label  className="form-label">Parent Phone Number </label>
                  <NumberFormat format="0## ### ####" value={parentContactNumber} className="form-control" placeholder="0** *** ****"   onChange={(e) =>{
                            setStudentParentTel(e.target.value);
                         }}/>
                </div>  
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={editStd}  >EDIT</MDBBtn>
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