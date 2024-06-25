import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  
  // const host = "http://localhost:5000"; 
  const host = "https://inotebook-zie0.onrender.com"; 

    let navigate = useNavigate();

    const [credentials,setCredentials] = useState({email:"",password:""});

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password}), 
          });
          const json = await response.json();
          // console.log(json);
          if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Logged in Successfully","success");
            navigate("/");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }

  return (
    // <div className="container mt-3" >
    //   <h2 className="my-3">Login to continue to iNotebook</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="my-3">
    //       <label htmlFor="email" className="form-label">
    //         Email address
    //       </label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         name="email"
    //         aria-describedby="emailHelp"
    //         value={credentials.email}
    //         onChange={onChange}
    //       />
    //       <div id="emailHelp" className="form-text">
    //         We'll never share your email with anyone else.
    //       </div>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="password" className="form-label">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
    //         name="password"
    //         value={credentials.password}
    //         onChange={onChange}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary">
    //       Submit
    //     </button>
    //   </form>
    // </div>


  <div className="container mt-3" >
  <div className="row justify-content-center h-100">
    <div className="col-md-5" >
      <div className="card bg-light">
        <div className="card-body" style={{height: '23em'}}>
          <h2 className="card-title text-center mb-4">Login to iNotebook</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
