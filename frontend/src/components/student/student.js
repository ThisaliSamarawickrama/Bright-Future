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

export default function AdminDash() {
  function goToStdentPage() {
    window.location.href="./AddStudent";
  }
    
  const [students,setAllStudent] = useState([]);
  useEffect(() => {
            axios.get('http://localhost:5000/student/allStudent')
            .then(res => setAllStudent(res.data))
            .catch(error => console.log(error));
  });

  function edit(_id, studentId, name, contactNumber, grade, parentContactNumber, studentAddress){
    reactLocalStorage.setObject("studentProfile", [_id, studentId, name, contactNumber, grade, parentContactNumber, studentAddress]);
    window.location.href = "/EditStudent";
  }

  function profile(_id, studentId, name, contactNumber, grade, parentContactNumber, studentAddress,timeStamp){
    reactLocalStorage.setObject("studentProfile", [_id, studentId, name, contactNumber, grade, parentContactNumber, studentAddress,timeStamp]);
    window.location.href = "/ProfileStudent";
  }
  

  function marks(studentId , name , grade , sid){

    reactLocalStorage.setObject("studentIdForMarks", [studentId , name , grade , sid]);
    window.location.href = "/MarksSheet";
  }

  function deleteDoctor(sID)
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
      text: "Do You Want To Delete Student Profile?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/student/deleteStudent/"+sID).then(() =>{
          Swal.fire({  
              title: "Success!",
              text: "Student Profile Delete",
              icon: 'success',
              confirmButtonText: "OK",
              type: "success"})
  
      }).catch((err)=>{
          Swal.fire({  
              title: "Error!",
              text: "Student Profile Not Delete",
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

  return (
    <div className="Pagebg">
       <NavBar/>
       <div style={{paddingTop: '10%'}} ></div>
       <MDBCard className='mb-3 pt-5 shadow-0 container bg-transparent text-center mt-5 text-uppercase' >
        <h3 style={{letterSpacing:'2px'}}>Student's Details</h3>
       </MDBCard>
    <div style={{marginBottom:'10%'}}>
    <MDBCard className='text-white container  p-4'>
         <h5 className="text-muted"><u>Student Panel</u></h5>
         <div className='text-end'>
            <MDBBtn className='mx-2 shadow-0' outline  size='sm' color='success' onClick={goToStdentPage}> Add New Student </MDBBtn>
         </div>
     
        <MDBTable hover className='mt-2'>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>Student Id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Telephone Number</th>
              <th scope='col'>Grade</th>
              <th scope='col'>Parents Telephone Number</th>
              <th scope='col'>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
                {students.map((student,key) => (
									
                  <tr>
                    <td>{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.contactNumber}</td>
                    <td>{student.grade}</td>
                    <td>{student.parentContactNumber}</td>
                    <td>
                      <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deleteDoctor(student._id)}><MDBIcon fas icon="trash" /></button>&nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-dark btn-sm d-letter-spacing shadow-0" onClick={()=>edit(
                                        student._id,
                                        student.studentId,
                                        student.name,
                                        student.contactNumber,
                                        student.grade,
                                        student.parentContactNumber,
                                        student.studentAddress,
                                       
                                        )}><MDBIcon fas icon="pen-fancy" /></button>&nbsp;&nbsp;
                                        
                      <button type="button" class="btn btn-outline-warning btn-sm d-letter-spacing shadow-0" onClick={()=>profile(
                                        student._id,
                                        student.studentId,
                                        student.name,
                                        student.contactNumber,
                                        student.grade,
                                        student.parentContactNumber,
                                        student.studentAddress,
                                        student.timeStamp,
                                       
                                        )}><MDBIcon fas icon="user-alt" /></button>&nbsp;&nbsp;
                        <button type="button" class="btn btn-outline-secondary btn-sm d-letter-spacing shadow-0" onClick={()=>marks(student._id, student.name, student.grade, student.studentId)}>
                                          <MDBIcon fas icon="chalkboard-teacher" />
                                          </button>&nbsp;&nbsp;
                      
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