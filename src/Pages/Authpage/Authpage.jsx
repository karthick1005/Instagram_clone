import React, { useEffect, useState } from "react";
import "./authpage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useSignInWithEmailAndPass,
  useGoogleLogin,
} from "../../Hooks/Usesignupandpass";
const Authpage = () => {
  const [login, setlogin] = useState(false);
  const [load, setload] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });
  const { loading, error, signup, logins } = useSignInWithEmailAndPass();
  const { enablelogin } = useGoogleLogin();
  const handleauth = async () => {
    if (login) {
      // if (!inputs.email || !inputs.password) {
      //   return alert("Enter value to all the fields");
      // }
      setload(!load);
      let val = await signup(inputs);
      console.log(val);
      if (val === null) {
        console.log("hello");
        setload(false);
      }
    } else {
      setload(!load);
      let res = await logins(inputs);
    }
    // navigate("/");
  };
  const googlelog = async () => {
    let val = await enablelogin();
  };
  useEffect(() => {
    document.title = "Log in • Instagram";
  }, []);
  return (
    <div className="auth-container">
      <div className="logo">
        <img src="/auth.png" alt="" />
      </div>
      <div className="auth_form">
        <div className="auth">
          <div className="logoimage"></div>
          {/* <img alt="" /> */}
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            onChange={(e) => setinputs({ ...inputs, email: e.target.value })}
          />
          {login ? (
            <>
              <input
                type="text"
                name=""
                id="username"
                placeholder="Username"
                onChange={(e) =>
                  setinputs({ ...inputs, username: e.target.value })
                }
              />
              <input
                type="text"
                name=""
                id="fullname"
                placeholder="Full name"
                onChange={(e) =>
                  setinputs({ ...inputs, fullname: e.target.value })
                }
              />
            </>
          ) : (
            ""
          )}

          <div className="pass">
            <input
              type={showPassword ? "text" : "password"}
              name=""
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setinputs({ ...inputs, password: e.target.value })
              }
            />
            <button
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            className="auth_sumbit"
            disabled={load}
            type="button"
            onClick={handleauth}
          >
            {load ? (
              <div class="loader"></div>
            ) : (
              <div> {!login ? "Login" : "Sign Up"}</div>
            )}
          </button>
          <div className="authbar">
            <hr />
            <p>OR</p>
            <hr />
          </div>
          <div>
            <button className="googlelogin_btn" onClick={googlelog}>
              <img src="/google.png" alt="" srcSet="" />
              Login with Google
            </button>
          </div>
        </div>
        <div className="auth_signup">
          {!login ? <p>Dont have a account?</p> : <p>Have a account?</p>}

          <button onClick={() => setlogin(!login)}>
            {login ? "Login" : "Sign Up"}
          </button>
        </div>
        <p>Get the app.</p>
        <div className="store">
          <img src="/playstore.png" alt="" />
          <img src="/microsoft.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Authpage;
