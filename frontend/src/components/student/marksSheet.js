import React ,{useState , useEffect} from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTableHead,
  MDBTableBody,
  MDBTable,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardTitle,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../footer';
import NavBar from '../main_parts/NavBar';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';

export default function MarksSheet() {

  var studentIdForMarks = reactLocalStorage.getObject('studentIdForMarks');
  var studentId =studentIdForMarks[0];

  const [name, setStudentName] = useState(studentIdForMarks[1]);
  const [grade, setgrade] = useState(studentIdForMarks[2]);
  const [sid, setsid] = useState(studentIdForMarks[3]);

  const [subjectwithCode, setSubject] = useState("");
  const [result, setResult] = useState("");
 
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  function resultSave(e){
      e.preventDefault();
      
      const arr = subjectwithCode.split(' - ');
      var subjectCode = arr[0];
      var subject = arr[1];

      const newResult_Reg ={studentId, subjectCode, subject, result}
  
        axios.post("http://localhost:5000/result/addResult",newResult_Reg).then(() =>{
  
        Swal.fire({  
        title: "Success!",
        text: "Result Adding Success!",
        icon: 'success',
        confirmButtonText: "OK",
        type: "success"}).then(okay => {
        if (okay) {
          window.location.href = "/MarksSheet";
        }
        });
  
        
    }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: "Result Adding Not Success",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
  }

  const [marks,setAllmarks] = useState([]);
  useEffect(() => {
            axios.get('http://localhost:5000/result/allResult/'+studentId)
            .then(res => setAllmarks(res.data))
            .catch(error => console.log(error));
  })

  function deleteMarks(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are You Sure?',
      text: "Do You want To Delete Result?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/result/deleteresult/"+id).then(() =>{
          Swal.fire({  
              title: "Success!",
              text: "Student Result Deleted",
              icon: 'success',
              confirmButtonText: "OK",
              type: "success"})
  
      }).catch((err)=>{
          Swal.fire({  
              title: "Error!",
              text: "Student Result Not Delete",
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



  function downloadReport(){
    var doc = new jsPDF('p', 'pt');
    let x=40;
    doc.setTextColor(254, 8, 8 );
    doc.text(20, 20, "Result Sheet - "+sid)
    doc.text(25, 30, '---------------------------')
    doc.addFont('helvetica', 'normal')
    doc.setFontSize(12);
    doc.setTextColor(3, 3, 3);

    // eslint-disable-next-line no-lone-blocks
    localStorage.setItem("marks", JSON.stringify(marks));

    // retrieving our data and converting it back into an array
    var marksData = localStorage.getItem("marks");
    var sub = JSON.parse(marksData);
  
    //making sure it still is an array
   let count = 40;
   for(var i = 0; i < sub.length; i++)
   {
      count = count+20;
      doc.text(25, count, sub[i].result+' \t  \t '+sub[i].subjectCode+' \t  \t  '+sub[i].subject)
   }
  doc.save("Result Sheet - "+sid+'.pdf');
  }
  return (
    <div className="Pagebg">
        <NavBar/>
        <MDBRow style={{paddingTop: '15%' , marginBottom: '5%'}}>
          <MDBCol sm='1'> </MDBCol>
          <MDBCol sm='10'>
            <MDBCard className=" bg-light">
              <MDBCardBody>
                <MDBCardTitle className='text-dark pt-4 text-center ' style={{fontSize: '28px'}}>STUDENT MARKS SHEET</MDBCardTitle>
                <div style={{paddingLeft:'30%'}}>
                    
                    <div className="mb-3 mt-5">
                      <label  className="form-label"><span className="fw-bold">Student Name : </span> <span>{name}</span></label>
                    </div>  
                    <div className="mb-3 ">
                      <label  className="form-label"><span className="fw-bold">Student ID  : </span><span>{sid}</span></label>
                    </div>  
                    <div className="mb-3 ">
                      <label  className="form-label"><span className="fw-bold">Grade  : </span><span>{grade}</span></label>
                    </div> 
                </div>

                <MDBRow className="mb-4">
                    <MDBCol sm='1'></MDBCol>
                    <MDBCol sm='10'>
                        <div className='text-end mb-2'>
                            <MDBBtn className='mx-2 btn-sm shadow-0' outline  size='sm' color='success' onClick={toggleShow}> Add Marks </MDBBtn>
                            <MDBBtn className='mx-2 btn-sm shadow-0' outline  size='sm' color='warning' onClick={downloadReport} > Download </MDBBtn>
                        </div>  
                        <MDBTable >
                          <MDBTableHead dark>
                            <tr>
                              <th scope='col'>Subject Code</th>
                              <th scope='col'>Subject Name</th>
                              <th scope='col'>Result</th>
                              <th scope='col'>Action</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody style={{backgroundColor:'white'}}>
                          {marks.map((mark,key) => (
									
                            <tr>
                              <td>{mark.subjectCode}</td>
                              <td>{mark.subject}</td>
                              <td>{mark.result}</td>
                              <td>
                                  <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deleteMarks(mark._id)}><MDBIcon fas icon="trash" /></button>&nbsp;&nbsp;
                              </td>
                            </tr>
                          ))}
                          </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                    <MDBCol sm='1'></MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol sm='1'> </MDBCol>
        </MDBRow>
        <MDBModal  className="bg-light" staticBackdrop  show={basicModal} setShow={setBasicModal} tabIndex='-1'>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>ADD MARKS</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                  <div className="mb-3 mt-2">
                      <label  className="form-label">Subject </label>
                      <select className="form-select"  onChange={(e) =>{
                            setSubject(e.target.value);
                         }} >
                      <option value="">Select Subject</option>
                      <option value="1 - Sinhala">Sinhala</option>
                      <option value="2 - English">English</option>
                      <option value="3 - Tamil">Tamil</option>
                      <option value="4 - ICT">ICT</option>
                    </select>
                  </div> 
                  <div className="mb-3">
                      <label  className="form-label">Result </label>
                      <select className="form-select"  onChange={(e) =>{
                            setResult(e.target.value);
                         }} >
                      <option value="">Select Result</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="F">F</option>
                    </select>
                  </div> 
              </MDBModalBody>

              <MDBModalFooter className="border-0">
                <MDBBtn color='dark' className='shadow-0' onClick={toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn className='shadow-0' color='success' onClick={resultSave}>Save</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      <Footer/>       
    </div>
  );
}