import React, { useState } from 'react';
import NavBar from './main_parts/index_navbar';

function Home() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    return (
    <div>
        <NavBar/>
         <div class="global-container">
                <div class="row container" style={{marginTop:'11%', marginBottom:'1%'}}>
                <div class="col-sm-5">
                    <div class="card shadow-0 bg-transparent">
                    <div class="card-body" style={{paddingTop:'20%'}}>
                        <h1 style={{fontSize:'30px' , letterSpacing:'3px'}}>WELCOME TO <br/><span class="text-uppercase" style={{fontSize:'57px', fontWeight:'bold',letterSpacing:'2px'}}>BRIGHT Future</span></h1>
                        <span className="text-muted" style={{fontSize:'14px',lineHeight:'0px'}}>This is an online class management system for the “Bright Future” institute. The main task is to build a system for this institute to maintain students, teachers, registrations and payments. To make these things easier with the system. </span><br/><br/>
                        <a href="Login">
                            <button type="button" class="btn  shadow-0 fw-normal" style={{backgroundColor:'#0d5f6c', color:'white' , fontSize:'15px', letterSpacing:'2px'}}>Login</button>{' '}&nbsp;&nbsp;
                        </a>
                        <a href="Register">
                             <button type="button" class="btn  shadow-0 fw-normal" style={{border:'1px solid #0d5f6c', color:'#0d5f6c' , fontSize:'15px', letterSpacing:'2px'}}>About</button>
                        </a>
                    </div>
                    </div>
                </div>
                <div class="col-sm-7">
                    <div class="card shadow-0 bg-transparent">
                    <div class="card-body">
                        <img src="./images/indexImg.png" style={{width:'110%'}} class="card-img-top" alt="..."/>
                    </div>
                    </div>
                </div>
                </div>
         </div>
    </div>
    )
};

export default Home;