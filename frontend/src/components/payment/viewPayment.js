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
import jsPDF from 'jspdf';  
import html2canvas from 'html2canvas'; 

export default function ViewPayment() {
  var ViewPayment = reactLocalStorage.getObject('ViewPayment');
  var id =ViewPayment[0];

  const [cardName, setCardName] = useState(ViewPayment[1]);
  const [cardNumber, setCardNumber] = useState(ViewPayment[2]);
  const [studentID, setStudentID] = useState(ViewPayment[3]);
  const [Holder, setHolder] = useState(ViewPayment[4]);
  const [cvv, setCCV] = useState(ViewPayment[5]);
  const [amount, setAmount] = useState(ViewPayment[6]);
  const [expireDate, setExpireDate] = useState(ViewPayment[7]);
  const [name, setStudentName] = useState(ViewPayment[8]);
  const [grade, setStudentGrade] = useState(ViewPayment[9]);
  const [month, setMonth] = useState(ViewPayment[10]);
  const [timeStamp, settimeStamp] = useState(ViewPayment[11]);


  function Print(){
    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 210;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight );  
        pdf.save("payment id - "+id+".pdf");  
      });  
  }


  return (
    <div className="Pagebg">
        <NavBar/>
        <MDBRow style={{paddingTop: '15%'  , marginBottom: '5%'}}>
          <MDBCol sm='3'> </MDBCol>
          <MDBCol sm='6'>
            <MDBCard className=" bg-light">
              <MDBCardBody>
               
               <div id="pdfdiv">
                <MDBCardTitle className='text-dark text-center text-uppercase' style={{fontSize: '28px'}}>VIEW PAYMENT</MDBCardTitle>
                
                <div class=" mt-5">
                  <label  class="form-label">Student Name : {name}</label>
                </div> 
                <div >
                  <label  class="form-label">Student ID : {studentID}</label>
                </div>  
                <div >
                  <label for="exampleFormControlInput1" class="form-label">Grade : {grade}</label>
                </div>
                <div >
                  <label  class="form-label">Month : {month}</label>
                </div> 
                <div >
                  <label  class="form-label">Amount : RS.{amount}.00</label>
                </div>
                <hr/>

                <div >
                  <label  class="form-label">Card Name : {cardName}</label>
                </div>   
                <div >
                  <label  class="form-label">Card Number : {cardNumber}</label>
                </div>   
                <div >
                  <label  class="form-label">Holder : {Holder}</label>
                </div> 
                <div >
                  <label  class="form-label">CCV : {cvv}</label>
                </div> 
                <div >
                  <label  class="form-label">Expire Date : {expireDate}</label>
                </div>  
                
                </div>
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Payment' className='shadow-0 me-2' >
                    Back
                  </MDBBtn>
                  <MDBBtn href='#' color="success" className='shadow-0' onClick={Print}  >Print</MDBBtn>

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