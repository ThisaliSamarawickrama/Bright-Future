import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Student from './components/student';
import AddStudent from './components/student/addStudent';
import EditStudent from './components/student/editStudent';
import ProfileStudent from './components/student/profileStudent';
import MarksSheet from './components/student/marksSheet';
import Index from './components/index';
import Login from './components/login';
import AdminDashboard from './components/admin_dashboard';
import Registration from './components/registration/teacher.js';
import AddTeacher from './components/registration/addTeacher.js';
import EditTeacher from './components/registration/editTeacher.js';
import AddPayment from './components/payment/addPayment.js';
import Payment from './components/payment/payment.js';
import AddPaymentFirst from './components/payment/addPaymentFirstStep.js';
import EditPaymentFirst from './components/payment/editPayment.js';
import TeacherDash from './components/teacher/teacherDashboard.js';
import AddClass from './components/teacher/addClass.js';
import EditClass from './components/teacher/editClass.js';
import TeacherProfile from './components/registration/teacherProfile.js';
import ViewPayment from './components/payment/viewPayment.js';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EditStudent" element={<EditStudent />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/ProfileStudent" element={<ProfileStudent />} />
        <Route path="/MarksSheet" element={<MarksSheet />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/AddTeacher" element={<AddTeacher />} />
        <Route path="/EditTeacher" element={<EditTeacher />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/AddPayment" element={<AddPayment />} />
        <Route path="/EditPaymentFirst" element={<EditPaymentFirst />} />
        <Route path="/AddPaymentFirst" element={<AddPaymentFirst />} />
        <Route path="/TeacherDash" element={<TeacherDash />} />
        <Route path="/AddClass" element={<AddClass />} />
        <Route path="/EditClass" element={<EditClass />} />
        <Route path="/TeacherProfile" element={<TeacherProfile />} />
        <Route path="/ViewPayment" element={<ViewPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

