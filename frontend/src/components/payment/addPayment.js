import React ,{useState} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardTitle,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBIcon
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import Footer from '../footer';
import NavBar from '../main_parts/NavBar';
import {reactLocalStorage} from 'reactjs-localstorage';

export default function AddPayment() {

  const [basicActive, setBasicActive] = useState('tab1');
  
  const [fillActive, setFillActive] = useState('tab1');
  const handleFillClick = (value: string) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  var paymentFisrtStep = reactLocalStorage.getObject('paymentDetailsForNextStep');
  var name =paymentFisrtStep[0];
  var studentID =paymentFisrtStep[1];
  var grade =paymentFisrtStep[2];
  var month =paymentFisrtStep[3];

  const [VisaCardNumber, setVisaCardNumber] = useState("");
  const [VisaCardHolder, setVisaCardHolder] = useState("");
  const [VisaCardExpireDate, setVisaCardExpireDate] = useState("");
  const [VisaCardCCV, setVisaCardCCV] = useState("");
  const [VisaCardAmount, setVisaCardAmount] = useState("");

   
  const [MasterCardNumber, setMasterCardNumber] = useState("");
  const [MasterCardHolder, setMasterCardHolder] = useState("");
  const [MasterCardExpireDate, setMasterCardExpireDate] = useState("");
  const [MasterCardCCV, setMasterCardCCV] = useState("");
  const [MasterCardAmount, setMasterCardAmount] = useState("");

  function payUsingVisa(e){
    e.preventDefault();
    var cardName =  "Visa";
    var cardNumber =  VisaCardNumber;
    var Holder =  VisaCardHolder;
    var cvv =  VisaCardCCV;
    var expireDate =  VisaCardExpireDate;
    var amount =  VisaCardAmount;

    const addPayment ={cardName, cardNumber,studentID, Holder, cvv, expireDate,amount,name,grade, month}

      axios.post("http://localhost:5000/payment/addPayment",addPayment).then(() =>{

      Swal.fire({  
      title: "Success!",
      text: "Payment Success!",
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
        text: "Payment Not Success",
        icon: 'error',
        confirmButtonText: "OK",
        type: "success"})
    })
  }

  function payUsingMaster(e){
    e.preventDefault();
    var class_id =  "1";
    var cardName =  "Master";
    var cardNumber =  MasterCardNumber;
    var Holder =  MasterCardHolder;
    var cvv = MasterCardCCV;
    var expireDate =  MasterCardExpireDate;
    var amount =  MasterCardAmount;
    var studentID = "1";
    const addPayment ={cardName, cardNumber, class_id,studentID, Holder, cvv, expireDate,amount}

      axios.post("http://localhost:5000/payment/addPayment",addPayment).then(() =>{

      Swal.fire({  
      title: "Success!",
      text: "Payment Success!",
      icon: 'success',
      confirmButtonText: "OK",
      type: "success"}).then(okay => {
      if (okay) {
        window.location.href = "/Student_payment";
      }
      });

      
  }).catch((err)=>{

        Swal.fire({  
        title: "Error!",
        text: "Payment Not Success",
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
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>ADD PAYMENT</MDBCardTitle>
                
                <MDBTabs fill className='mb-3 mt-4 square border border-light'>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab1')} style={{padding:'0%'}} active={basicActive === 'tab1'}>
                        <img src='./images/visa.png'  style={{width:'16%'}} alt='...' />
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleFillClick('tab2')} style={{padding:'0%'}} active={basicActive === 'tab2'}>
                        <img src='./images/master.png'  style={{width:'16%'}} alt='...' />
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>

              <MDBTabsContent>
                  <MDBTabsPane  show={fillActive === 'tab1'}>
                    <h5 style={{lineHeight:'0%'}} className='text-start text-black-50 pt-4'>PAY VIA VISA</h5>
                    <hr style={{backgroundColor:'#D7D7D7'}}/>
                    <div className='row'>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Card Number</label>
                            <NumberFormat format="#### #### #### ####"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="0000 0000 0000 0000"  onChange={(e) =>{
                                setVisaCardNumber(e.target.value);
                            }}/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Name Of Card Holder</label>
                            <input type="text" className="form-control" style={{border:'1px solid #D7D7D7'}}  onChange={(e) =>{
                                setVisaCardHolder(e.target.value);
                            }}/>
                          </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Expire Date</label>
                            <NumberFormat format="##/##"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="YY/MM"  onChange={(e) =>{
                                setVisaCardExpireDate(e.target.value);
                            }}/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>CCV</label>
                            <NumberFormat format="###"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="000"  onChange={(e) =>{
                                setVisaCardCCV(e.target.value);
                            }}/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Amount</label>
                            <input type="number" className="form-control" style={{border:'1px solid #D7D7D7'}}  onChange={(e) =>{
                                setVisaCardAmount(e.target.value);
                            }}/>
                          </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
                        Back
                      </MDBBtn>
                      <MDBBtn color="success" onClick={payUsingVisa}  className="shadow-0">PAY NOW <MDBIcon size='1x' fas icon="money-bill"  /></MDBBtn>&nbsp;&nbsp;
                    </div>
                  </MDBTabsPane>
                  <MDBTabsPane  show={fillActive === 'tab2'}>
                    <h5 style={{lineHeight:'0%'}} className='text-start text-black-50 pt-4'>PAY VIA MASTER CARD</h5>
                    <hr style={{backgroundColor:'#D7D7D7'}}/>
                    <div className='row'>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label class="form-label" style={{lineHeight:'0%' , border:'none'}}>Card Number</label>
                            <NumberFormat format="#### #### #### ####"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="0000 0000 0000 0000" onChange={(e) =>{
                                setMasterCardNumber(e.target.value);
                            }}/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Name Of Card Holder</label>
                            <input type="text" className="form-control" style={{border:'1px solid #D7D7D7'}}  onChange={(e) =>{
                                setMasterCardHolder(e.target.value);
                            }}/>
                          </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Expire Date</label>
                            <NumberFormat format="##/##"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="YY/MM"  onChange={(e) =>{
                                setMasterCardExpireDate(e.target.value);
                            }}/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>CCV</label>
                            <NumberFormat format="###"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="000"  onChange={(e) =>{
                                setMasterCardCCV(e.target.value);
                            }}/>
                          </div>
                      </div>
                      <div className='col'>
                          <div className="mb-3 mt-4">
                            <label className="form-label" style={{lineHeight:'0%' , border:'none'}}>Amount</label>
                            <input type="number" className="form-control" style={{border:'1px solid #D7D7D7'}}  onChange={(e) =>{
                                setMasterCardAmount(e.target.value);
                            }}/>
                          </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <MDBBtn color="success" onClick={payUsingMaster}   className="shadow-0">PAY NOW <MDBIcon size='1x' fas icon="money-bill"  /></MDBBtn>&nbsp;&nbsp;
                      <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
                        Back
                      </MDBBtn>
                    </div>
                </MDBTabsPane>
              </MDBTabsContent>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='3'> </MDBCol>
        </MDBRow>
      <Footer/>       
    </div>
  );
}