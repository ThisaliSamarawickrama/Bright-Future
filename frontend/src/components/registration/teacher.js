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

export default function Teacher() {
  function goToTeacherPage() {
    window.location.href="./AddTeacher";
  }
    
  const [teachers,setAllTeacher] = useState([]);
  useEffect(() => {
            axios.get('http://localhost:5000/teacher/allTeacher')
            .then(res => setAllTeacher(res.data))
            .catch(error => console.log(error));
  });

  function edit(_id,teacherName,teacherId,teacherTel,teacherEmail,teacherGrade,teacherCenter,teacherSubject,classType,classOrganization,timeStamp ){
    reactLocalStorage.setObject("teacherProfile", [_id,teacherName,teacherId,teacherTel,teacherEmail,teacherGrade,teacherCenter,teacherSubject,classType,classOrganization,timeStamp,]);
    window.location.href = "/EditTeacher";
  }

  function profile(_id,teacherName,teacherId,teacherTel,teacherEmail,teacherGrade,teacherCenter,teacherSubject,classType,classOrganization,timeStamp ){
    reactLocalStorage.setObject("teacherProfile", [_id,teacherName,teacherId,teacherTel,teacherEmail,teacherGrade,teacherCenter,teacherSubject,classType,classOrganization,timeStamp,]);
    window.location.href = "/TeacherProfile";
  }

  function deleteTeacher(tID)
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
      text: "Do You Want To Delete Teacher Profile?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/teacher/deleteTeacher/"+tID).then(() =>{
          Swal.fire({  
              title: "Success!",
              text: "Teacher Profile Delete",
              icon: 'success',
              confirmButtonText: "OK",
              type: "success"})
  
      }).catch((err)=>{
          Swal.fire({  
              title: "Error!",
              text: "Teacher Profile Not Delete",
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
        <h3 style={{letterSpacing:'2px'}}>Teachers's Details</h3>
       </MDBCard>
    <div style={{marginBottom:'10%'}}>
    <MDBCard className='text-white container  p-4'>
        <h5 className="text-muted"><u>Teacher Panel</u></h5>
        <div className='text-end'>
            <MDBBtn color='dark' href='./AdminDashboard' size='sm' outline className='shadow-0 me-1' >
              Back
            </MDBBtn>
            <MDBBtn className='mx-2 shadow-0' outline  size='sm' color='success' onClick={goToTeacherPage}> Add New Teacher </MDBBtn>
        </div>
       
        <MDBTable hover className='mt-2'>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>Teacher Id</th>
              <th scope='col'>Full Name</th>
              <th scope='col'>Grade</th>
              <th scope='col'>Subject</th>
              <th scope='col'>Center</th>
              <th scope='col'>Class Type</th>
              <th scope='col'>Class</th>
              <th scope='col'>Contact Number</th>
              <th scope='col'>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
                {teachers.map((teacher,key) => (
									
                  <tr>
                    <td>{teacher.teacherId}</td>
                    <td>{teacher.teacherName}</td>
                    <td>{teacher.contactNumber}</td>
                    <td>{teacher.teacherGrade}</td>
                    <td>{teacher.teacherSubject}</td>
                    <td>{teacher.teacherCenter}</td>
                    <td>{teacher.classType}</td>
                    <td>{teacher.classOrganization}</td>
                    <td>
                      <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deleteTeacher(teacher._id)}><MDBIcon fas icon="trash" /></button>&nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-dark btn-sm d-letter-spacing shadow-0" onClick={()=>edit(
                                        teacher._id,
                                        teacher.teacherName,
                                        teacher.teacherId,
                                        teacher.teacherTel,
                                        teacher.teacherEmail,
                                        teacher.teacherGrade,
                                        teacher.teacherCenter,
                                        teacher.teacherSubject,
                                        teacher.classType,
                                        teacher.classOrganization,
                                        teacher.timeStamp,
                                       
                                        )}><MDBIcon fas icon="pen-fancy" /></button>&nbsp;&nbsp;
                                        
                      <button type="button" class="btn btn-outline-warning btn-sm d-letter-spacing shadow-0" onClick={()=>profile(
                                        teacher._id,
                                        teacher.teacherName,
                                        teacher.teacherId,
                                        teacher.teacherTel,
                                        teacher.teacherEmail,
                                        teacher.teacherGrade,
                                        teacher.teacherCenter,
                                        teacher.teacherSubject,
                                        teacher.classType,
                                        teacher.classOrganization,
                                        teacher.timeStamp,
                                        )}><MDBIcon fas icon="user-alt" /></button>&nbsp;&nbsp;
                       
                      
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