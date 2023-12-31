import React,{useState} from "react";
import axios from "axios";
import './register.css';
import { Link } from "react-router-dom";
import Header2 from "../components/headers/header2";
import Referal from "../components/referal/referal";
import Topfooter from "../components/footer/topfooter";
import Footer from "../components/footer/footer";

function Register(){
    const [user, setUser] = useState({
        name:'',
        email:'',
        mobile:'',
        password:'',
        state:'',
        district:'',
        address:'',
        pincode:''
    })
    const changeHandler = (event) =>{
        setUser({...user,[event.target.name]:event.target.value})
    }
    const submitHandler = async (event)=>{
        event.preventDefault(event);
    const res= await axios.post("https://laundry-cart-backend-api.vercel.app/api/v1/register",user)
    console.log(res) 
    console.log(res.status)
    console.log(user)
    if(res.status===200){
        alert("Register")
    }
    }
  return (
        <div className='registerpage'>
            < Header2 />
            <div className='rmaincontent1'>
                <div className='rleftmain1'>
                    <div className='rleftcontent1'>
                        <h2 className="rheading21">Laundry Service</h2>
                        <p className='rdescription11'>Doorstep Wash and Dryclean Service</p>
                        <p className='rhaveaccount11'>Already Have Account</p>
                        {/* <button className="rlogin-btn1">Sign In</button> */}
                        <Link to="/"><button className="rlogin-btn1">Sign In</button></Link>
                    </div>
                </div>
                <div className='rrightmain1'>
                    <div className='rrightcontent1'>
                        <h2 className='rheading31'>REGISTER</h2>
                        <form  className='rregistrationform' onSubmit={submitHandler} autoComplete="off">
                            <div className='rregistrationinputs'>
                                <div className='rleftinputs' >
                                    <label className="rlabel1">Name</label><br />
                                    <input type="text" onChange={changeHandler} name="name" required/><br />
                                    <label className="rlabel1">Email</label><br />
                                    <input type="email" onChange={changeHandler} name="email" required/><br />
                                    <label className="rlabel1">Password</label><br />
                                    <input type="password" onChange={changeHandler} name="password" required/><br />
                                    <label className="rlabel1">State</label><br />
                                    <input type="text" onChange={changeHandler} name="state" required/><br />
                                    <label className="rlabel1">Address</label><br />
                                    <input type="text" onChange={changeHandler} name="address" required/><br />
                                </div>
                                <div className='rrightinputs'>
                                    <label className="rlabel1">Mobile</label><br />
                                    <input  onChange={changeHandler} name="mobile" required/><br />
                                    <label className="rlabel1">District</label><br />
                                    <input type="text" onChange={changeHandler} name="district" required/><br/>
                                    <label className="rlabel1">Pincode</label><br />
                                    <input  onChange={changeHandler} name="pincode" required/><br />
                                </div>
                            </div>
                            <div className='rcheck-box1'>
                                <input type = "checkbox" className='rcheckboxtext'/><span> I agree to Terms & Condition receiving marketing and promotional materials</span>
                            </div>
                            <button type="submit" value="Login" className="rsignupbtn">Register</button>
                        </form>
                    </div>
                </div>
            </div>
            <Referal />
            <Topfooter />
            <Footer />
        </div>
  )
}
export default Register;