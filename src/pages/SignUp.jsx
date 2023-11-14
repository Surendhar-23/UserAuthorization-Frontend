import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/global";
export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const navigate = useNavigate();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/signin/verify`, formData);
      console.log(response);
      if (response.data === true) {
        alert("Registeration Link sent to your email id");
      } else if (response.data === false) {
        alert("User already exists");
      }
    } catch (e) {
      console.error("Error during registeration", e);
    }
  };
  return (
    <Container>
      <h1>Registeration Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handlechange}
            required
          ></Form.Control>
        </Form.Group>
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
            type="text"
            name="password"
            value={formData.password}
            onChange={handlechange}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <p>
          Already have an account?<Link to="login">Login</Link>
        </p>
      </Form>
    </Container>
  );
};
