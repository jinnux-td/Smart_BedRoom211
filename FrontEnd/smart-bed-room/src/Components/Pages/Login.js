import React, { useContext, useState, useEffect } from 'react'
import '../Pages/Login.css'
import image from '../Images/N_Group.png';
import { FaHome } from 'react-icons/fa';
import {
    Link, Navigate
} from 'react-router-dom';
import { BsFillEnvelopeFill } from "react-icons/bs";
import { BsFillShieldLockFill } from "react-icons/bs";
import axios from "axios";
import { LoginContext } from '../../LoginContext';

const styleLogin = {
    borderRadius: "30px",
    boxShadow: "0px 15px 16.83px 0.17px rgb(0,0,0,0.2)",
  };

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

export default function Login() {
  const size = useWindowSize();
  const {state, setState} = useContext(LoginContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const json = localStorage.getItem("state");
  const saveAccount = JSON.parse(json);
  let saveUsername = "";
  let savePassword = "";
  let saveIsLogin = false;
  if (saveAccount) {
      saveUsername = saveAccount.user.username;
      savePassword = saveAccount.user.password;
      saveIsLogin = true;
  }
  useEffect(() => {
    const user = {username: saveUsername, password: savePassword};
    setState((prev) => ({...prev, isLogin: saveIsLogin, user: user}));
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:8000/login",{...user}
    )
    .then((res) => {
      if (res.data) {
        setState((prev) => ({...prev, isLogin: true, user: user}));
        const saveAccount = {isLogin: true, user: {username: user.username, password: user.password}};
        const json = JSON.stringify(saveAccount);
        localStorage.setItem("state", json);
      };
    })
    .catch((res, status) => alert(res, status));
  };
  if (state.isLogin) return <Navigate to="/" />
  else
  return (
    <div
    className="login bg-light d-flex align-items-center"
    style={{ minHeight: "100vh"}}
  >
    <div
      className=" bg-white container-fluid py-lg-5 position-relative"
      style={styleLogin}
    >
      <Link to="/">
        <button
          className="btn btn-light position-absolute top-0 start-0 px-lg-4 bg-gradient"
          style={{
            borderTopLeftRadius: "30px",
            borderBottomRightRadius: "32px",

          }}
        >
          <FaHome size={30}/>
        </button>
      </Link>
      <div className="login-content row py-lg-5 py-3 g-0">
        <div className="login-image col-lg-6 col-sm-0">
          <figure>
            <img
              className="d-block mx-auto"
              src={image}
              alt="singupimage"
            />
          </figure>
        </div>

        <div className="login-form col-lg-6 col-sm-12">
          <div className="d-flex-items-center align-items-lg-start flex-column">
            <h1 className="form-title mb-4">Member login</h1>
            <form method="" className="register-form w-75" id="login-form" style={{marginLeft:"5rem"}}>
              <div className="input-group mb-4 w-lg-75">
                <label
                  htmlFor="username"
                  className="input-group-text bg-white border-0 border-bottom border-secondary rounded-0"
                >
                  <BsFillEnvelopeFill/>
                </label>
                <input
                  className="form-control border-0 border-bottom border-secondary rounded-0 shadow-none"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Nhập username"
                  value={user.username}
                  onChange={e => setUser({...user, username: e.target.value})}
                />
              </div>
              <div className="input-group mb-4 w-lg-75">
                <label
                  htmlFor="password"
                  className="input-group-text bg-white border-0 border-bottom border-secondary rounded-0"
                >
                  <BsFillShieldLockFill />
                </label>
                <input
                  className="form-control border-0 border-bottom border-secondary rounded-0 shadow-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Mật khẩu"
                  value={user.password}
                  onChange={e => setUser({...user, password: e.target.value})}
                />
              </div>
              {(size.width <= 1196 && size.width >= 989)? (
                <>
                {" "}
                <div style={{alignItems:"center"}}>
                  <button type="submit" className="btn mb-2 mb-md-0 btn-secondary btn-block btn-round" onClick={submitHandler}>Login</button>
                </div>
                </>
              ) : (
                <>
                {" "}
                <button type="submit" className="btn mb-2 mb-md-0 btn-secondary btn-block btn-round" onClick={submitHandler}>Login</button>
                </>
              )
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
