import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import ExpenseIcon from "../components/ExpenseIcon";
import { Usercontext } from "../context/Usercontext";
import { URL } from "../url";
import "./Expenseitem.css";

const Expenseitem = () => {
  const [search] = useSearchParams();
  const ctx = useContext(Usercontext);

  let type = search.get("type");
  let startDate = search.get("startDate");
  let endDate = search.get("endDate");
  const [name, setname] = useState();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  let fetchUrl;

  if (type === "date")
    fetchUrl = `${URL}/expenses?startDate=${startDate}&endDate=${endDate}`;
  else {
    fetchUrl = `${URL}/expenses/${type}`;
  }

  function getDate(inp, index) {
    let result = new Date(inp);
    result = result.toDateString().split(" ");
    return result[index];
  }

  const fetchExpense = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${ctx.user.token}`,
      },
    };

    try {
      let expensesdata = await axios.get(fetchUrl, config);
      setExpenses(expensesdata.data);
      console.log(expensesdata.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`Error : ${error.response.data.message}`);
    }
  };
  let title;

  if (type === "year") {
    title = "Yearly Expenses";
  } else if (type === "month") {
    title = "Monthly Expenses";
  } else if (type === "all") {
    title = "All time Expenses";
  } else if (type === "date") {
    title = `Expense for the period ${startDate} to ${endDate}`;
  } else {
    title = "Weekly Expenses";
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

  useEffect(() => {
    if (ctx.user) {
      fetchExpense();
    }
  }, [type]);

  const logOutHandeler = () => {
    localStorage.removeItem("user");
    ctx.setUser();
    navigate("/");
  };

  const deleteExpenseHandeler = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${ctx.user.token}`,
      },
    };
    try {
      await axios.delete(`${URL}/expenses/${id}`, config);
      setLoading(false);
      fetchExpense();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      {ctx.user && (
        <>
          <div className="dashboard-nav">
            <div style={{ flex: 2 }}>
              <h3
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
              >
                Money-Manager-App
              </h3>
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
          <Container style={{ marginTop: "20px" }}>
            <h4 style={{ textAlign: "center" }}>{title}</h4>
            {loading && (
              <div style={{ marginTop: "20px" }}>
                <Spinner
                  style={{ display: "block", margin: "auto" }}
                  animation="border"
                />
              </div>
            )}
            {!loading && (
              <Row>
                {expenses.length > 0 &&
                  expenses.map((e) => (
                    <Col key={e._id} md={{ span: 6, offset: 3 }}>
                      <div className="exp-itm-ctn">
                        <div
                          className="exp-item-date-ctn"
                          style={{ flex: "1" }}
                        >
                          <b style={{ fontSize: "25px" }}>
                            {getDate(e.date, 2)}
                          </b>
                          <span>{getDate(e.date, 1)}</span>
                          <span>{getDate(e.date, 3)}</span>
                        </div>
                        <div style={{ flex: "1" }}>
                          <ExpenseIcon category={e.category} />
                        </div>
                        <span style={{ flex: "2" }}>{e.description}</span>
                        <span style={{ flex: "1" }}>{`₹ ${e.amount}`}</span>
                        <i
                          style={{ flex: "1", cursor: "pointer" }}
                          class="fas fa-trash-alt"
                          onClick={() => deleteExpenseHandeler(e._id)}
                        ></i>
                      </div>
                    </Col>
                  ))}
              </Row>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Expenseitem;
