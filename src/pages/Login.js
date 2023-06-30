import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { URL } from "../url";
import { Usercontext } from "../context/Usercontext";

const Login = () => {
  const ctx = useContext(Usercontext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.user) {
      navigate("/dashboard");
    }
  }, [navigate, ctx.user]);

  const loginHandeler = async (event) => {
    event.preventDefault();
    setError();
    setLoading(true);
    try {
      let { data } = await axios.post(`${URL}/users/signin`, {
        email: email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      ctx.setUser(data);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <Container className="login-container">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h2>SIGN IN</h2>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <form onSubmit={loginHandeler}>
              {error && <Alert variant="danger">{error}</Alert>}
              <div className="login-inp-container">
                <label htmlFor="username">
                  <b>Email Address</b>
                </label>
                <br />
                <input
                  id="username"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
                    "SIGN IN"
                  )}
                </Button>
              </div>
              <span>
                New User?
                <b
                  className="login-registerlink"
                  onClick={() => navigate("/register")}
                >
                  Register
                </b>
              </span>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
