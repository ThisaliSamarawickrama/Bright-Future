import React ,{useState , useEffect} from 'react';
import {
  MDBTable,
  MDBIcon,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBBtn,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import {reactLocalStorage} from 'reactjs-localstorage';
import NavBar from '../main_parts/NavBar';
import Footer from '../footer';

export default function Payment() {
  function goToPaymentPage() {
    window.location.href="./AddPaymentFirst";
  }
    
  const [AllPayment,setAllPayment] = useState([]);
  const [searchStudentId,setStudentId] = useState([]);

  useEffect(() => {
            axios.get('http://localhost:5000/payment/allPayment')
            .then(res => setAllPayment(res.data))
            .catch(error => console.log(error));
  },[]);

  function edit(_id,name,grade,month){
    reactLocalStorage.setObject("paymentForEdit", [_id,name,grade,month]);
    window.location.href = "/EditPaymentFirst";
  }

  function ViewPayment(_id,cardName, cardNumber, studentID, Holder, cvv, amount, expireDate, name, grade, month, timeStamp){
    reactLocalStorage.setObject("ViewPayment", [_id,cardName, cardNumber, studentID, Holder, cvv, amount, expireDate, name, grade, month, timeStamp]);
    window.location.href = "/ViewPayment";
  }



  function deletePayment(id)
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are You Sure?',
      text: "Do You Want To Delete Payment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/payment/deletePayment/"+id).then(() =>{
          Swal.fire({  
              title: "Success!",
              text: "Payment Delete",
              icon: 'success',
              confirmButtonText: "OK",
              type: "success"})
  
      }).catch((err)=>{
          Swal.fire({  
              title: "Error!",
              text: "Payment Not Delete",
              icon: 'error',
              confirmButtonText: "OK",
              type: "success"})
      })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Deleting cancel',
          'error'
        )
      }
    })
  }

  function search(){
    
    axios.get('http://localhost:5000/payment/allPayment/'+searchStudentId)
    .then(res => setAllPayment(res.data))
    .catch(error => console.log(error));
  }


  function close(){
    setStudentId("");
    axios.get('http://localhost:5000/payment/allPayment')
    .then(res => setAllPayment(res.data))
    .catch(error => console.log(error));
  }
  return (
    <div className="Pagebg">
       <NavBar/>
       <div style={{paddingTop: '10%'}} ></div>
       <MDBCard className='mb-3 pt-5 shadow-0 container bg-transparent text-center mt-5 text-uppercase' >
        <h3 style={{letterSpacing:'2px'}}>Payments Details</h3>
       </MDBCard>
    <div style={{marginBottom:'10%'}}>
    <MDBCard className='text-white container  p-4'>
         <h5 className="text-muted"><u>Payments Panel</u></h5>
          <div class="input-group mb-3 mt-5">
              <input type="text" class="form-control" placeholder="Select student id"  onChange={(e) =>{
                            setStudentId(e.target.value);
                         }}/>
              <button class="btn btn-dark shadow-0" onClick={search} type="button" id="button-addon2">Search</button>
              <button class="btn btn-dark shadow-0" onClick={close} type="button" id="button-addon2">Close</button>
          </div>
         <div className='text-end'>
            <MDBBtn color='dark' href='./AdminDashboard' size='sm' outline className='shadow-0 me-1' >
                    Back
            </MDBBtn>
            <MDBBtn className='mx-2 shadow-0' outline  size='sm' color='success' onClick={goToPaymentPage}> Add New Payment </MDBBtn>
         </div>
     
        <MDBTable hover className='mt-2'>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>Student Id</th>
              <th scope='col'>Full Name</th>
              <th scope='col'>Grade</th>
              <th scope='col'>Month</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Payment ID</th>
              <th scope='col'>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
                {AllPayment.map((payment,key) => (
									
                  <tr>
                    <td>{payment.studentID}</td>
                    <td>{payment.name}</td>
                    <td>{payment.grade}</td>
                    <td>{payment.month}</td>
                    <td>{payment.amount}</td>
                    <td>{payment._id}</td>
                    <td>
                      <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deletePayment(payment._id)}><MDBIcon fas icon="trash" /></button>&nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-dark btn-sm d-letter-spacing shadow-0" onClick={()=>edit(
                                        payment._id,
                                        payment.name,
                                        payment.grade,
                                        payment.month
                                       
                                        )}><MDBIcon fas icon="pen-fancy" /></button>&nbsp;&nbsp;   
                      <button type="button" class="btn btn-outline-warning btn-sm d-letter-spacing shadow-0" onClick={()=>ViewPayment(
                                        payment._id,
                                        payment.cardName,
                                        payment.cardNumber,
                                        payment.studentID,
                                        payment.Holder,
                                        payment.cvv,
                                        payment.amount,
                                        payment.expireDate,
                                        payment.name,
                                        payment.grade,
                                        payment.month,
                                        payment.timeStamp
                                     
                                        )}><MDBIcon fas icon="info" /></button>&nbsp;&nbsp;            
                    </td>
                  </tr>
              ))}
          </MDBTableBody>
        </MDBTable>
    </MDBCard>
    </div>
    <Footer/>
    </div>
  );
}