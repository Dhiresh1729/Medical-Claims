import React, { Component, useEffect, useState, useContext } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useNavigate,
} from "react-router-dom"

import { Button, Form, FormGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from "./logo.png"
import "./Home.css"
import { signInWithGoogle } from "./firebase"
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap"
import ShowApplication from "./ShowApplication"
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { AuthContext } from "./Auth"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"

function Home_verified_applications() {
    const { currentUser } = useContext(AuthContext)

    const [result_arr, setresult_arr] = useState([])

    const getApplicationId = async () => {
        const res = await fetch(
            "https://medical-claims2.herokuapp.com/getallApprovedApplicationId",
            {
                method: "POST",
                body: JSON.stringify({ currentUser }),
                headers: { "Content-Type": "application/json" },
            }
        )

        const data = await res.json()
        console.log(data["result"])

        setresult_arr(data["result"])
    }
    useEffect(() => {
        getApplicationId()
    }, [])

    console.log(result_arr)

    let navigate = useNavigate()
    const handleNavigate = () => {
        navigate(-1)
    }
    const handleLogout = () => {
        signOut(auth)
        navigate("/")
    }

    const gotoForgotPassword = () => {
        navigate("/forgotPassword")
    }
    return (
        <div>
            <div id="top_navbar">
                <Link to="/Page1" style={{ textDecoration: "none" }}>
                    <div id="apply_button"> Apply for Reimbursement</div>
                </Link>

                <div id="profilepic">
                    {" "}
                    <img src={currentUser.photoURL} alt=""></img>{" "}
                </div>
                <div id="name">{currentUser.displayName}</div>
                <div id="email">{currentUser.email}</div>
            </div>
            <div
                id="sidebar"
                class="d-flex flex-column  flex-shrink-0 p-3 text-white"
            >
                <a href="#" class="text-white text-decoration-none">
                    <h2 class="text_center">Menu</h2>
                </a>
                <br />
                <ul class="nav nav-pills flex-column mb-auto">
                    <div
                        id="link_to_other_pages"
                        onClick={handleNavigate}
                        style={{ textDecoration: "none" }}
                    >
                        <li class="nav-item">
                            <a
                                href="#"
                                class="nav-link text-white"
                                aria-current="page"
                            >
                                <i class="fa fa-home"></i>

                                <span class="ms-2 font_size_18">Home </span>
                            </a>
                        </li>
                    </div>
                    <li>
                        <a href="/Autofill" class="nav-link text-white">
                            <i class="fa fa-first-order"></i>
                            <span class="ms-2 font_size_18">Auto Fill</span>
                        </a>
                    </li>

                    <li>
                        <a href="#" class="nav-link active">
                            <i class="fa fa-first-order"></i>
                            <span class="ms-2 font_size_18">
                                Approved applications
                            </span>
                        </a>
                    </li>
                    <li onClick={gotoForgotPassword}>
                        <a href="#" class="nav-link text-white">
                            <i class="fa fa-cog"></i>
                            <span class="ms-2 font_size_18">
                                Change Password
                            </span>
                        </a>
                    </li>
                    <li onClick={handleLogout}>
                        <a href="#" class="nav-link text-white">
                            <i class="fa fa-bookmark"></i>
                            <span class="ms-2 font_size_18">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div id="last_heading">
                <h4>Approved applications > </h4>
                <h6>
                    (applications which are approved by all authority people
                    will appear here)
                </h6>
            </div>
            <div className="application_list">
                {result_arr.map((id) => (
                    <div
                        className="application_id"
                        onClick={() => {
                            navigate("ShowApplication/" + id)
                        }}
                    >
                        <Container>
                            <Row>
                                <h6>Application_id : {id}</h6>
                            </Row>
                        </Container>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home_verified_applications
