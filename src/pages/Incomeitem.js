import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Usercontext } from "../context/Usercontext";
import { URL } from "../url";
import "./Expenseitem.css";

const Incomeitem = () => {
  const [search] = useSearchParams();
  const ctx = useContext(Usercontext);

  let type = search.get("type");
  let startDate = search.get("startDate");
  let endDate = search.get("endDate");
  const [name, setname] = useState();
  const navigate = useNavigate();
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(false);
  let fetchUrl;

  if (type === "date")
    fetchUrl = `${URL}/income?startDate=${startDate}&endDate=${endDate}`;
  else {
    fetchUrl = `${URL}/income/${type}`;
  }

  function getDate(inp, index) {
    let result = new Date(inp);
    result = result.toDateString().split(" ");
    return result[index];
  }

  const fetchIncome = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${ctx.user.token}`,
      },
    };

    try {
      let incomedata = await axios.get(fetchUrl, config);
      setIncome(incomedata.data);
      console.log(incomedata.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(`Error : ${error.response.data.message}`);
    }
  };
  let title;

  if (type === "year") {
    title = "Yearly Income";
  } else if (type === "month") {
    title = "Monthly Income";
  } else if (type === "all") {
    title = "All time Income";
  } else if (type === "date") {
    title = `Income for the period ${startDate} to ${endDate}`;
  } else {
    title = "Weekly Income";
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
      fetchIncome();
    }
  }, [type]);

  const logOutHandeler = () => {
    localStorage.removeItem("user");
    ctx.setUser();
    navigate("/");
  };

  const deleteIncomeHandeler = async (id) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${ctx.user.token}`,
      },
    };
    try {
      await axios.delete(`${URL}/income/${id}`, config);
      setLoading(false);
      fetchIncome();
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
                {income.length > 0 &&
                  income.map((e) => (
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
                        <span style={{ flex: "1" }}>{e.category}</span>
                        <span style={{ flex: "2" }}>{e.description}</span>
                        <span style={{ flex: "1" }}>{`₹ ${e.amount}`}</span>
                        <i
                          style={{ flex: "1", cursor: "pointer" }}
                          class="fas fa-trash-alt"
                          onClick={() => deleteIncomeHandeler(e._id)}
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

export default Incomeitem;
