import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import Home from "../home/Home"
import { getTask } from "../../features/orders"

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
  console.log("soy data", data)
  return (
    <>
      
      {!acces ? (
        <div className="loginpadre">
          <div className="login">
            <form action="">
              <section>
                <article>
                  <div>Email</div>
                  <input
                    type="text"
                    value={data.email}
                    name="email"
                    onChange={handleChange}
                  />
                </article>
                <article>
                  <div>Password</div>
                  <input
                    type="password"
                    value={data.password}
                    name="password"
                    onChange={handleChange}
                  />
                </article>
              </section>
            </form>
            <button onClick={submit}>SUBMIT</button>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </>
  )
}

export default Login
