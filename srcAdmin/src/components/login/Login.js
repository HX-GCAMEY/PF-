import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Home from "../home/Home"
import { getTask } from "../../features/orders"
import videoIntro from "../imgs/video.mp4"
import logo from "../imgs/logo.png"
//////////////////////////////////////
import { auth, userExists } from "../../firebase/fire"
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.tasks.users)
  const [acces, setAcces] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    dispatch(getTask())
  }, [dispatch])
  console.log("soy flights", users)

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = () => {
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        data.email
      )
    ) {
      return alert("datos de email invalidos")
    }
    setAcces(true)
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
      console.log("soy res", res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const isRegistered = await userExists(user.uid)
        if (isRegistered) {
          setCurrent(2)
          //  navigate("/dashboard") <--- ponerlo en el array para el warning
        } else {
          setCurrent(3)
        }

        console.log("soy user del inicio", user)
      } else {
        setCurrent(4)
        console.log("no hay naide autenticado....")
      }
    })
  }, [])

  if (state === 3) {
    return <div>estas autenticado pero no registrado</div>
  }
  console.log("soy data", data)

  return (
    <>
      {!acces ? (
        <div className="loginpadre">
          <video src={videoIntro} autoPlay muted loop />
          <div className="login">
            <img src={logo} alt="logo" />
            <form action="" className="loginInicio">
              <button
                onClick={handleClick}
                type="button"
                class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-small rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              >
                <svg
                  class="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </button>
              <div className="or">Or</div>
              <div class="relative">
                <input
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  type="text"
                  id="floating_outlined"
                  class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                  type="text"
                  id="floating_outlined1"
                  class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_outlined1"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password:
                </label>
              </div>
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
