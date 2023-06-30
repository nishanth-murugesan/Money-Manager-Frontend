import axios from "axios";
import React, { useState, useContext } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";
import { URL } from "../url";
import "./Login.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const ctx = useContext(Usercontext);

  const navigate = useNavigate();

  const registerHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError();
    try {
      let { data } = await axios.post(`${URL}/users/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      ctx.setUser(data);
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Container className="login-container">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h2>REGISTER</h2>
            <form onSubmit={registerHandeler}>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="login-inp-container">
                <label htmlFor="username">
                  <b>Name</b>
                </label>
                <br />
                <input
                  id="username"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="email">
                  <b>Email Address</b>
                </label>
                <br />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
              <div className="login-inp-container">
                <label htmlFor="password">
                  <b>Password</b>
                </label>
                <br />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
              <div className="login-btn-container">
                <Button
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  type="submit"
                  variant="dark"
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "REGISTER"
                  )}
                </Button>
              </div>
              <span>
                Allready have an account?
                <b className="login-registerlink" onClick={() => navigate("/")}>
                  Signin
                </b>
              </span>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
