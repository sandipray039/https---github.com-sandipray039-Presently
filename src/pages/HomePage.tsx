
import { useState } from "react"
import "./HomePage.css"
 
 interface formdata {
 email:string,
 password:string
 }

const HomePage = () => {
 const [formData, setFormData] = useState<formdata>({
    email: '',
    password:''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit= async (e:React.FormEvent)=>{
    e.preventDefault();
    const validation=validate();
    if(Object.keys(validation).length>0){
        setErrors(validation);
        return;
    }
    else{
        console.log(formData);
    }

  }
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
  setErrors({...errors,[e.target.name]:''});
  }
const validate=()=>{
    const errors:{[key:string]:string}={};

    if(!formData.email.trim()){
        errors.email="Email is required"
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if(!formData.password.trim()){
        errors.password="Password is required"
    }

    return errors;

}

  return (
    <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
        <div className="card">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email <span style={{color:'red'}}>*</span> </label>
        <input 
        type="email"
        name="email"
        className="form-control"
        id="email"
        value={formData.email}
        placeholder="Enter Your Email"
        onChange={handleChange}
        />
         {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
      <div className="mb-3">
         <label htmlFor="password" className="form-label">Password <span style={{color:'red'}}>*</span> </label>
        <input 
        type="password"
        name="password"
        id="password"
        className="form-control"
        value={formData.password}
        placeholder="Enter Your Password"
        onChange={handleChange}
        />
         {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
         <button className="btn btn-primary " style={{width:'30%'}} >Submit</button>
        </form>
        </div>
        </div>
      
    </div>
  )
}

export default HomePage
