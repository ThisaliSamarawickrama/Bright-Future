import React ,{useState , useEffect} from 'react';
import {
  MDBTable,
  MDBIcon,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBInputGroup,
  MDBBtn,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import {reactLocalStorage} from 'reactjs-localstorage';
import NavBar from '../main_parts/NavBar';
import Footer from '../footer';

export default function TeacherDash() {

  const [search, setSearh] = useState("");

  function AddClass() {
    window.location.href="./AddClass";
  }
    
  const [AllClassess,setAllClassess] = useState([]);
  useEffect(() => {
            axios.get('http://localhost:5000/class_teacher/allClass')
            .then(res => setAllClassess(res.data))
            .catch(error => console.log(error));
  },[]);

  function edit(_id,subject,teacherName,grade,day,timeStamp,classDuration){
    reactLocalStorage.setObject("classEdit", [_id,subject,teacherName,grade,day,timeStamp,classDuration]);
    window.location.href = "/EditClass";
  }

  function searchFun(){
   
        axios.get('http://localhost:5000/class_teacher/allClass/'+search)
        .then(res => setAllClassess(res.data))
        .catch(error => console.log(error));

  }

  function cancel(){
    axios.get('http://localhost:5000/class_teacher/allClass')
    .then(res => setAllClassess(res.data))
    .catch(error => console.log(error));
  }

  function deleteClass(id)
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
      text: "Do You Want To Delete Class?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/class_teacher/deleteClass/"+id).then(() =>{
          Swal.fire({  
              title: "Success!",
              text: "Class Deleted",
              icon: 'success',
              confirmButtonText: "OK",
              type: "success"})
  
      }).catch((err)=>{
          Swal.fire({  
              title: "Error!",
              text: "Class Not Delete",
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
        <h3 style={{letterSpacing:'2px'}}>Classes List</h3>
       </MDBCard>
    <div style={{marginBottom:'10%'}}>
    <MDBCard className='text-white container  p-4'>
         <h5 className="text-muted"><u>Classes List</u></h5>
        
         <div className='text-end'>
            <MDBBtn color='dark' href='./AdminDashboard' size='sm' outline className='shadow-0 me-1' >
                    Back
            </MDBBtn>
            <MDBBtn className='mx-2 shadow-0' outline  size='sm' color='success' onClick={AddClass}> Add New Class </MDBBtn>
         </div>
         <MDBInputGroup className='mb-2 mt-5'>
            <input className='form-control' placeholder="Search Using Name" type='text'  onChange={(e) =>{
                            setSearh(e.target.value);
                         }}/>
            <MDBBtn color="dark" onClick={searchFun}> Search</MDBBtn>
            <MDBBtn color="dark" onClick={cancel}> Cancel</MDBBtn>
        </MDBInputGroup>
        <MDBTable hover className='mt-2'>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>Teacher Name</th>
              <th scope='col'>Grade</th>
              <th scope='col'>Subject</th>
              <th scope='col'>Day</th>
              <th scope='col'>Class Duration</th>
              <th scope='col'>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
                {AllClassess.map((class_teacher,key) => (
									
                  <tr>
                    <td>{class_teacher.teacherName}</td>
                    <td>{class_teacher.grade}</td>
                    <td>{class_teacher.subject}</td>
                    <td>{class_teacher.day}</td>
                    <td>{class_teacher.classDuration}</td>
                    <td>
                      <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deleteClass(class_teacher._id)}><MDBIcon fas icon="trash" /></button>&nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-dark btn-sm d-letter-spacing shadow-0" onClick={()=>edit(
                                        class_teacher._id,
                                        class_teacher.subject,
                                        class_teacher.teacherName,
                                        class_teacher.grade,
                                        class_teacher.day,
                                        class_teacher.timeStamp,
                                        class_teacher.classDuration
                                       
                                        )}><MDBIcon fas icon="pen-fancy" /></button>&nbsp;&nbsp;   
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