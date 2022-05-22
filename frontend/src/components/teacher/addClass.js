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


export default function AdTeacher() {

  const d = new Date();
  let studentNum = "T"+d.getFullYear()+""+parseInt((Math.random() * (99999- 10000 + 1)) + 10000);

  const [teacherName, setTeacherName] = useState("");
  const [subject, setTeacherSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [day, setDay] = useState("");
  const [classDuration, setClassDuration] = useState("");


  const [teachers,setAllTeacher] = useState([]);
  useEffect(() => {
            axios.get('http://localhost:5000/teacher/allTeacher')
            .then(res => setAllTeacher(res.data))
            .catch(error => console.log(error));
  });

  function submitTeacher(e)
  {
      
      e.preventDefault();
      const classReg ={teacherName, subject,grade, day,classDuration}
  
        axios.post("http://localhost:5000/class_teacher/addClass",classReg).then(() =>{
  
        Swal.fire({  
          title: "Success!",
          text: "Class Adding Success!",
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
          text: "Class Adding Not Success",
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
                <MDBCardTitle className='text-dark text-center ' style={{fontSize: '28px'}}>ADD CLASS</MDBCardTitle>
                
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
                    <label  class="form-label">Teacher Name </label>
                    <select class="form-select"  onChange={(e) =>{
                            setTeacherName(e.target.value);
                         }} >
                        <option value="">Select Subject</option>
                      <option value="Mrs.Samanthi Dissanayake">Mrs.Samanthi Dissanayake</option>
                      <option value="Ms.Isuri Ekanayake">Ms.Isuri Ekanayake</option>
                      <option value="Mrs.Dinusha Hannadige">Mrs.Dinusha Hannadige</option>
                      <option value="Mr.Buddhika Uduwaraarachchi">Mr.Buddhika Uduwaraarachchi</option>
                      <option value="Ms.Danuji Perera">Ms.Danuji Perera</option>
                      <option value="Mr.Kasun Solaman">Mr.Kasun Solaman</option>
                      <option value="Mrs.Lakdinu Nirmali">Mrs.Lakdinu Nirmali</option>
                      <option value="Mr.Vishnu Varathan">Mr.Vishnu Varathan</option>
                      <option value="Mr.Tharanga Ranasinghe">Mr.Tharanga Ranasinghe</option>
                      <option value="Mrs.Srimathi Dassanayake">Mrs.Srimathi Dassanayake</option>
                      <option value="Mr.Chandula Herath">Mr.Chandula Herath</option>
                      <option value="Ms.Sjitha N.Malaviarachchi">Ms.Sjitha N.Malaviarachchi</option>
                      <option value="Mr.Dilan Illesinghe">Mr.Dilan Illesinghe</option>
                    </select>
                </div>  
                
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Grade </label>
                  <select class="form-select"  onChange={(e) =>{
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
                  <select class="form-select"  onChange={(e) =>{
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
                     <NumberFormat format="##:##"  className="form-control" style={{border:'1px solid #D7D7D7'}} placeholder="Hours : Min"  onChange={(e) =>{
                                setClassDuration(e.target.value);
                            }}/>
                </div>  
                <div className='text-end'>
                  <MDBBtn color='dark' href='./Student' className='shadow-0 me-2' >
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