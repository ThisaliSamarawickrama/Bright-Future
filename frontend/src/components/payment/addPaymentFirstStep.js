import React ,{useState} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

import {reactLocalStorage} from 'reactjs-localstorage';
import Footer from '../footer';
import NavBar from '../main_parts/NavBar';


export default function AddPayment() {

  const d = new Date();
  let month_get = d.getFullYear()+" "+d.toLocaleString('default', { month: 'long' });

  const [name, setStudentName] = useState("");
  const [studentId, setStudentID] = useState("");
  const [grade, setStudentGrade] = useState("");
  const [month, setMonth] = useState(month_get);


  function Next(e)
  {
    reactLocalStorage.setObject("paymentDetailsForNextStep", [name , studentId , grade , month]);
    window.location.href = "/AddPayment";
   
  }

  return (
    <div className="Pagebg">
        <NavBar/>
        <MDBRow style={{paddingTop: '15%'  , marginBottom: '5%'}}>
          <MDBCol sm='3'> </MDBCol>
          <MDBCol sm='6'>
            <MDBCard className=" bg-light">
              <MDBCardBody>
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>ADD PAYMENT</MDBCardTitle>
                
                <div class="mb-3 mt-5">
                  <label  class="form-label">Student Name </label>
                    <input class="form-control"  onChange={(e) =>{
                            setStudentName(e.target.value);
                         }}/>
                </div>  
                <div class="mb-3 ">
                  <label  class="form-label">Student ID </label>
                    <input class="form-control"  onChange={(e) =>{
                            setStudentID(e.target.value);
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
                <div class="mb-3 ">
                  <label  class="form-label">Month </label>
                    <input class="form-control" value={month}  onChange={(e) =>{
                            setMonth(e.target.value);
                         }}/>
                </div>  
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={Next}  >Next</MDBBtn>
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