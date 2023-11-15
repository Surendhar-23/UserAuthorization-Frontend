import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login/`, formData);
      console.log(response);
      if (response.data === "Invalid User name or Password") {
        alert("Invalid User name or Password");
      } else if (response.data === "Server Busy") {
        alert("Verify your email id");
      } else if (response?.status) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/home");
      }
    } catch (e) {
      console.error("Error during registeration", e);
    }
  };
  return (
    <Container>
      <h1>Login Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handlechange}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handlechange}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
