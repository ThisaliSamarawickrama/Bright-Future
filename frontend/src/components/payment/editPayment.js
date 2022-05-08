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
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditPayment() {

  var paymentForEdit = reactLocalStorage.getObject('paymentForEdit');
  var id =paymentForEdit[0];

  const [name, setStudentName] = useState(paymentForEdit[1]);
  const [grade, setStudentGrade] = useState(paymentForEdit[2]);
  const [month, setMonth] = useState(paymentForEdit[3]);

  function edit(e){
    e.preventDefault();
    const paymentEdit ={name,grade, month, id}
     
    axios.put("http://localhost:5000/payment/updatePayment",paymentEdit).then(() =>{

    Swal.fire({  
        title: "Success!",
        text: "Payment Updating Success!",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"}).then(okay => {
        if (okay) {
          window.location.href = "/Payment";
        }
        });

        
    }).catch((err)=>{

          Swal.fire({  
          title: "Error!",
          text: "Payment Updating Not Success",
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
                <MDBCardTitle className='text-dark text-center text-uppercase' style={{fontSize: '28px'}}>Edit PAYMENT</MDBCardTitle>
                
                <div class="mb-3 mt-5">
                  <label  class="form-label">Student Name </label>
                    <input class="form-control" value={name} onChange={(e) =>{
                            setStudentName(e.target.value);
                         }}/>
                </div>  
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Grade </label>
                  <select class="form-select" defaultValue={grade}  onChange={(e) =>{
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
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                    </select>
                </div>
                <div class="mb-3 ">
                  <label  class="form-label">Month </label>
                    <input class="form-control" value={month}  onChange={(e) =>{
                            setMonth(e.target.value);
                         }}/>
                </div>  
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Payment' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={edit}  >Edit</MDBBtn>
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