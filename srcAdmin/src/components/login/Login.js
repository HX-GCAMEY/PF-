import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Home from "../home/Home"
import { getReviews, getTask } from "../../features/orders"
import videoIntro from "../imgs/video.mp4"
import logo from "../imgs/logo.png"
//////////////////////////////////////
import { auth, userExists } from "../../firebase/fire"
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"
import Swal from "sweetalert2"
import Google from "react-google-button"
import { ThemeContext } from "@emotion/react"
import { AiFillEye } from "react-icons/ai"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.tasks.users)
  const reviews = useSelector(state => state.tasks.reviews)
  const admins = users.filter(e => e.isAdmin === true)
  const [ojo, setOjo] = useState("password")
  const [acces, setAcces] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    dispatch(getTask())
    dispatch(getReviews())
  }, [dispatch])
  console.log("soy reviews", reviews)
  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        data.email
      )
    ) {
      return Swal.fire({
        icon: "error",
        title: "error",
        text: `invalid email data`,
        confirmButtonText: "yes",
        confirmButtonColor: "#1890ff",
      })
    }
    const response = await axios
      .post("http://localhost:5000/api/users/adminLogin", data)
      .then(res =>
        Swal.fire({
          icon: "success",
          tittle: "Success",
          text: `welcome ${res.data.info.email} `,
          timer: 1500,
          confirmButtonColor: "#2f9b05",
        })
      )
      .then(res2 => setAcces(true))
      .catch(error =>
        Swal.fire({
          icon: "error",
          title: "error",
          text: `${error.response.data.error}`,
          confirmButtonText: "OK",
          confirmButtonColor: "#1890ff",
        })
      )

    console.log("soy response de axios", response)
  }
  const responseGoogle = () => {
    console.log("hola")
  }
  /////////////////////////////////////////////////////////////

  const [current, setCurrent] = useState(null)

  const [state, setState] = useState(0)

  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider()
    await signInWithGoogle(googleProvider)
  }

  const signInWithGoogle = async googleProvider => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const exist = admins.find(e => e.email === res.user.email)
      if (exist) {
        Swal.fire({
          icon: "success",
          tittle: "Success",
          text: `welcome ${res.user.displayName} `,
          timer: 1500,
          confirmButtonColor: "#2f9b05",
        })
        setTimeout(() => {
          setAcces(true)
        }, 1500)
      } else {
        return Swal.fire({
          icon: "error",
          title: "Warning",
          text: `${res.user.displayName} you are not an administrator`,
          confirmButtonText: "OK",
          confirmButtonColor: "#1890ff",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ojoChange = () => {
    if (ojo === "password") setOjo("text")
    else setOjo("password")
  }

  return (
    <>
      {!acces ? (
        <div className="loginpadre">
          <video src={videoIntro} autoPlay muted loop />
          <div className="login">
            <img src={logo} alt="logo" />
            <form action="" className="loginInicio">
              <div className="imagenGoogle">
                <Google onClick={handleClick} />
              </div>

              <div className="or">Or</div>
              <div class="relative">
                <input
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  type="text"
                  id="floating_outlined"
                  class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_outlined"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email:
                </label>
              </div>
              <div class="relative">
                <input
                  value={data.password}
                  name="password"
                  onChange={handleChange}
                  type={ojo}
                  id="floating_outlined1"
                  class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_outlined1"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password:
                </label>
              </div>
              <span className="ojoPadre">
                <AiFillEye className="ojo" onClick={ojoChange} />
              </span>
            </form>
            <button className="submitLogin" onClick={submit}>
              Login
            </button>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  )
}

export default Login
