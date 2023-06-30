import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { Usercontext } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import { URL } from "../url";
import AddExpenseModal from "../components/AddExpenseModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const ctx = useContext(Usercontext);
  const [duration, setDuarion] = useState("week");
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);
  const [fetchagain, setFetagain] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setname] = useState();

  const getTotalexpense = () => {
    let total = 0;
    for (let i in expenses) {
      total += +expenses[i].amount;
    }

    return total.toFixed(2);
  };

  const getTotalincome = () => {
    let total = 0;
    for (let i in income) {
      total += +income[i].amount;
    }

    return total.toFixed(2);
  };

  let title;

  if (duration === "year") {
    title = "yearly Expense and Income Details";
  } else if (duration === "month") {
    title = "Monthly Expense and Income Details";
  } else if (duration === "all") {
    title = "All time Expense and Income Details";
  } else if (duration === "date") {
    title = "Expense and Income Details for selected Date period";
  } else {
    title = "Weekly Expense and Income Details";
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      ctx.setUser(userInfo);
      setname(userInfo.name);
    } else {
      navigate("/");
    }
  }, []);

  const fetchExpenseandIncome = async (type) => {
    setEndDate("");
    setStartDate("");
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${ctx.user.token}`,
      },
    };

    try {
      let expensesdata = await axios.get(`${URL}/expenses/${type}`, config);
      setExpenses(expensesdata.data);
      let incomedata = await axios.get(`${URL}/income/${type}`, config);
      setIncome(incomedata.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`Error : ${error.response.data.message}`);
    }
  };

  const dateSearchHandeler = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${ctx.user.token}`,
      },
    };
    try {
      let expensesdata = await axios.get(
        `${URL}/expenses?startDate=${startDate}&endDate=${endDate}`,
        config
      );
      setExpenses(expensesdata.data);
      let incomedata = await axios.get(
        `${URL}/income?startDate=${startDate}&endDate=${endDate}`,
        config
      );
      setIncome(incomedata.data);
      console.log(expensesdata.data);
      console.log(incomedata.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`Error : ${error.response.data.message}`);
    }
  };

  useEffect(() => {
    if (duration !== "date" && ctx.user) {
      fetchExpenseandIncome(duration);
    }
  }, [duration, fetchagain]);

  const logOutHandeler = () => {
    localStorage.removeItem("user");
    ctx.setUser();
    navigate("/");
  };

  return (
    <>
      {ctx.user && (
        <>
          <div className="dashboard-nav">
            <div style={{ flex: 2 }}>
              <h3 style={{ textAlign: "center" }}>Money-Manager-App</h3>
            </div>

            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#8ee4af",
                  border: "none",
                  color: "#05386b",
                  paddingRight: "15px",
                }}
                id="dropdown-basic"
              >
                {name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logOutHandeler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Container>
            <Row>
              <h5 className="dashboard-title">{title}</h5>
            </Row>
            <Row>
              <div className="dashboard-search-container">
                <div>
                  <span>Period:</span>
                  <Form.Select
                    aria-label="Duration select"
                    value={duration}
                    onChange={(e) => setDuarion(e.target.value)}
                  >
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                    <option value="all">Alltime</option>
                    <option value="date">Selected date</option>
                  </Form.Select>
                </div>

                <Button variant="primary" onClick={handleShow}>
                  Add
                </Button>
                <AddExpenseModal
                  show={show}
                  handleClose={handleClose}
                  token={ctx.user.token}
                  setFetagain={setFetagain}
                  fetchagain={fetchagain}
                />
              </div>
            </Row>
            <Row>
              {duration === "date" && (
                <div className="dashboard-date-search">
                  <label htmlFor="startdate">Start Date:</label>
                  <input
                    type="date"
                    id="startdate"
                    name="startDate"
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <label htmlFor="enddate">End Date:</label>
                  <input
                    type="date"
                    id="enddate"
                    name="endDate"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <Button variant="primary" onClick={dateSearchHandeler}>
                    Search
                  </Button>
                </div>
              )}
            </Row>
            {loading && (
              <div style={{ marginTop: "20px" }}>
                <Spinner
                  style={{ display: "block", margin: "auto" }}
                  animation="border"
                />
              </div>
            )}
            {!loading && (
              <Row style={{ marginTop: "30px" }}>
                <Col
                  md={{ span: 3, offset: 3 }}
                  className="expense-income-conatianer"
                >
                  <div>
                    <h5 style={{ color: "red" }}>Expenses</h5>
                    <p>{`Total : ₹ ${getTotalexpense()}`}</p>
                    <hr />
                    <Button
                      variant="dark"
                      onClick={() =>
                        navigate(
                          `/expense?type=${duration}&startDate=${startDate}&endDate=${endDate}`
                        )
                      }
                    >
                      View Expenses
                    </Button>
                  </div>
                </Col>
                <Col md={3} className="expense-income-conatianer">
                  <div>
                    <h5 style={{ color: "green" }}>Income</h5>
                    <p>{`Total : ₹ ${getTotalincome()}`}</p>
                    <hr />
                    <Button
                      variant="dark"
                      onClick={() =>
                        navigate(
                          `/income?type=${duration}&startDate=${startDate}&endDate=${endDate}`
                        )
                      }
                    >
                      View Income
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
