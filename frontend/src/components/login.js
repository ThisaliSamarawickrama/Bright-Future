
import React, { useState , useEffect } from 'react';
import { MDBBtn , MDBCol , MDBRow, MDBIcon} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import passwordValidator from 'password-validator';
import NavBar from './main_parts/index_navbar';
import Cookies from 'js-cookie';

var schema = new passwordValidator();

function Login() {

    const [username, setUserName] = useState(false);
    const [password, setPassword] = useState(false);

    async function login(e){
       e.preventDefault();

       let item = {username , password};
       let result = await fetch("http://localhost:5000/user/login", {
         method: 'POST',
         headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
         },
         body:JSON.stringify(item)
      });
      result = await result.json();
      
      if( JSON.stringify(result.message) === 'true'){
          Cookies.set('user_name',username, { expires: 70000, path: '' });

          	Swal.fire({  
			title: "Success!",
			text: "Login Success",
			icon: 'success',
			confirmButtonText: "OK",
			type: "success"}).then(okay => {
				if (okay) {
					window.location.href = "/AdminDashboard";
				}
			});
      }else{
          	Swal.fire({  
			title: "Error!",
			text: "Login Not Success",
			icon: 'error',
			confirmButtonText: "OK",
			type: "success"})
       }
    }

      return (
    <div>
       <NavBar/>
            <div class="global-container"  style={{paddingTop:'12%', paddingBottom:'1%'}}>
            <div class="card login-form shadow border-0">
                <div class="card-head bg-header rounded-top">
                    <h4 class="card-title text-center pt-3 pb-2  text-uppercase text-white">
                            Login Page
                    </h4>
                </div>
            <div class="card-body" >
                <div class="card-text">
                    <form action="#" method="post" >
                    <h6 className="fw-normal text-black-50">User Name</h6>
                    <div class="form-group  mt-3">
                        <input type="text" class="form-control" 
                         onChange={(e) =>{
                            setUserName(e.target.value);
                        }}/>
                    </div>
                 
                   <div class="form-group mt-3">
                         <h6 className="fw-normal text-black-50">Password</h6>
                        <input type="password" class="form-control"  id="pass" onChange={(e) =>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                     
                    <div class="mt-3 mb-2">
                         <div class="d-grid gap-2">
                                <MDBBtn onClick={login} class="btn text-white  d-letter-spacing shadow-0 fw-light" style={{ backgroundColor: '#0c8066'}} ><span className="h6">Login</span></MDBBtn> 
                         </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    </div>
      )
};


export default Login;