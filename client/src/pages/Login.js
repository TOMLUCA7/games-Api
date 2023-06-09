import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const baseURL = "http://localhost:3001/api";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const [verifyNewPassword, setVerifyNewSound] = useState("");
  const [isForgetPasswordPermit, setIsForgetPasswordPermit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  const [authView, setAuthView] = useState("loginView");
  //registerView //verifyView //recoverView

  const createNewAccount = async () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobile: mobile,
      };
      axios
        .post(baseURL + "/account/createAccount", { user })
        .then((results) => {
          toast.success(results.data.message.verficationCode);
          localStorage.setItem(
            "vdata",
            JSON.stringify(results.data.message.email)
          );
          setAuthView("verifyView");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("All inputs are required!!!");
    }
  };

  const login = async () => {
    if (email !== "" && password !== "") {
      const user = {
        email: email,
        password: password,
      };
      axios
        .post(baseURL + "/account/login", { user })
        .then((results) => {
          //toast.success(results.data.message);
          console.log(results);
          localStorage.setItem("token", JSON.stringify(results.data.message));
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("All inputs are required!!!");
    }
  };

  const verifyMyCode = async () => {
    if (code !== "") {
      const remail = localStorage.getItem("vdata");
      const verify = {
        email: JSON.parse(remail),
        verficationCode: code,
      };

      axios
        .put(baseURL + "/account/verifyAccount", { verify })
        .then((results) => {
          toast.success(`Welcome ${results.data.message.firstName}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("You didnt type any code");
    }
  };

  const requestToChangePassword = () => {
    if (email === "") return toast.error("Email is required!");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))
      return toast.error("Please provide valide email address!");
    axios
      .put(baseURL + "/requestToChangePassword", { email })
      .then((results) => {
        console.log("====================================");
        console.log(results.data);
        console.log("====================================");
        results.data.permission
          ? setIsForgetPasswordPermit(results.data.permission)
          : toast.error("Email not Exist!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const changePassword = () => {
    if (NewPassword.length < 8) {
      toast.error("Password must be at lest 8 charcters!");
      setNewPassword("");
      return setVerifyNewSound("");
    } else if (NewPassword !== verifyNewPassword) {
      toast.error("verify password error");
      setNewPassword("");
      return setVerifyNewSound("");
    }
    axios
      .put(baseURL + "/changePassword", {
        email,
        password: NewPassword,
      })
      .then((results) => {
        console.table(results);
        if (results.data.succses) {
          toast.success("Password was changed succsesfuly");
          setPassword(NewPassword);
          setNewPassword("");
          setVerifyNewSound("");
          setAuthView("loginView");
          setIsForgetPasswordPermit(false);
        } else {
          toast.error("Something went wrong...");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Container>
        <ToastContainer />
        <Row>
          <Col xl={4}></Col>
          <Col
            xl={4}
            style={{
              marginTop: 100,
              padding: 50,
              textAlign: "center",
              backgroundColor: "#ffffff",
              borderRadius: 20,
            }}
          >
            <img src="../../logo.png" style={{ width: 200 }} />

            {authView === "loginView" ? (
              <>
                <h3 style={{ marginTop: 15 }}>Welcome Aboard</h3>
                <p>Type your email and password to login</p>
                <Form>
                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    style={{ width: "100%", marginTop: 15 }}
                    onClick={login}
                  >
                    Sign In
                  </Button>
                </Form>
                <Button
                  style={{ marginTop: 12 }}
                  variant="light"
                  onClick={() => {
                    setAuthView("registerView");
                  }}
                >
                  Don't have an account? Signup Now!
                </Button>
                <Button
                  style={{ marginTop: 12 }}
                  variant="light"
                  onClick={() => {
                    setAuthView("");
                  }}
                >
                  Forgot Password ? Change Now
                </Button>
              </>
            ) : authView === "registerView" ? (
              <>
                <h3 style={{ marginTop: 15 }}>Create New Account</h3>
                <p>
                  Type your first and last name, mobile, email and password to
                  sign up
                </p>
                <Form>
                  <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      type="text"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    style={{ width: "100%", marginTop: 15 }}
                    onClick={createNewAccount}
                  >
                    Sign Up
                  </Button>
                </Form>
                <Button
                  style={{ marginTop: 12 }}
                  variant="light"
                  onClick={() => {
                    setAuthView("loginView");
                  }}
                >
                  Back to login
                </Button>
              </>
            ) : authView === "verifyView" ? (
              <>
                <h3 style={{ marginTop: 15 }}>Verify code</h3>
                <p>Please type your verification code</p>
                <Form>
                  <Form.Group>
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    style={{ width: "100%", marginTop: 15 }}
                    onClick={verifyMyCode}
                  >
                    Verify
                  </Button>
                </Form>
                <Button
                  style={{ marginTop: 12 }}
                  variant="light"
                  onClick={() => {
                    setAuthView("loginView");
                  }}
                >
                  Back to login
                </Button>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: 15 }}>Forget Password</h3>
                <Form>
                  {isForgetPasswordPermit ? (
                    <Form.Group>
                      <Form.Group>
                        <Form.Label>Please Choos New Password</Form.Label>
                        <Form.Control
                          className="forget-password-control"
                          type="password"
                          value={NewPassword}
                          placeholder="Type New Password..."
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                        />
                        <Form.Control
                          style={{ marginTop: 15 }}
                          className="forget-password-control"
                          type="password"
                          value={verifyNewPassword}
                          placeholder="ReType New Password..."
                          onChange={(e) => {
                            setVerifyNewSound(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        style={{ width: "100%", marginTop: 15 }}
                        onClick={changePassword}
                      >
                        change password
                      </Button>
                    </Form.Group>
                  ) : (
                    <>
                      <Form.Group>
                        <Form.Label>Please Enter Your Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={email}
                          placeholder="example@email.com"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        style={{ width: "100%", marginTop: 15 }}
                        onClick={requestToChangePassword}
                      >
                        Reset
                      </Button>
                    </>
                  )}
                </Form>
              </>
            )}
          </Col>
          <Col xl={4}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
