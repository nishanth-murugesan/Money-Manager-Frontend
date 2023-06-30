import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { URL } from "../url";
import "./AddExpenseModal.css";

const AddExpenseModal = ({
  show,
  handleClose,
  token,
  fetchagain,
  setFetagain,
}) => {
  const [isexpense, setIsexpense] = useState();
  const [expdes, setExpdes] = useState();
  const [expamt, setExpamt] = useState();
  const [expdate, setExpdate] = useState();
  const [expcategory, setExpcategory] = useState();
  const [exptype, setExptype] = useState();
  const [loading, setLoading] = useState(false);
  const [incdes, setIncdes] = useState();
  const [incamt, setIncamt] = useState();
  const [incdate, setIncdate] = useState();
  const [inccategory, setInccategory] = useState();

  const addExpenseHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);

    let edata = {
      description: expdes,
      category: expcategory,
      amount: expamt,
      date: expdate,
      type: exptype,
    };

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(`${URL}/expenses/new`, edata, config);
      setLoading(false);
      handleClose();
      setFetagain(!fetchagain);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  const addIncomeHandeler = async (event) => {
    event.preventDefault();
    setLoading(true);

    let edata = {
      description: incdes,
      category: inccategory,
      amount: incamt,
      date: incdate,
    };

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(`${URL}/income/new`, edata, config);
      setLoading(false);
      handleClose();
      setFetagain(!fetchagain);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense / Income</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-btn-ctn">
          <Button variant="light" onClick={() => setIsexpense(true)}>
            Expense
          </Button>
          <Button variant="light" onClick={() => setIsexpense(false)}>
            Income
          </Button>
        </div>

        <hr />

        {isexpense ? (
          <form onSubmit={addExpenseHandeler}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="description">
                <b>Desc :</b>
              </label>
              <input
                style={{ flex: "1" }}
                id="description"
                type="text"
                placeholder="Description"
                onChange={(e) => setExpdes(e.target.value)}
                required
              ></input>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="amount">
                <b>Amount :</b>
              </label>
              <input
                style={{ flex: "1" }}
                id="amount"
                type="number"
                onChange={(e) => setExpamt(e.target.value)}
                placeholder="Expense Amount"
                required
              ></input>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="category">
                <b>Category :</b>
              </label>
              <Form.Select
                aria-label="category"
                onChange={(e) => setExpcategory(e.target.value)}
                required
                id="category"
                style={{ flex: 1 }}
              >
                <option>Select the category</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Home">Home</option>
                <option value="Transport">Transport</option>
                <option value="Medical">Medical</option>
                <option value="Travel">Travel</option>
                <option value="Others">Others</option>
              </Form.Select>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="type">
                <b>Type :</b>
              </label>
              <Form.Select
                aria-label="type"
                id="type"
                style={{ flex: 1 }}
                onChange={(e) => setExptype(e.target.value)}
              >
                <option>Select type</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </Form.Select>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="date">
                <b>Expense Date :</b>
              </label>
              <input
                id="date"
                type="date"
                required
                onChange={(e) => setExpdate(e.target.value)}
              ></input>
            </div>
            <div className="login-btn-container">
              <Button
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="submit"
                variant="dark"
                disabled={loading ? true : false}
              >
                {isexpense ? "Add Expense" : "Add Income"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={addIncomeHandeler}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="description">
                <b>Desc :</b>
              </label>
              <input
                style={{ flex: "1" }}
                id="description"
                type="text"
                placeholder="Description"
                onChange={(e) => setIncdes(e.target.value)}
                required
              ></input>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="amount">
                <b>Amount :</b>
              </label>
              <input
                style={{ flex: "1" }}
                id="amount"
                type="number"
                onChange={(e) => setIncamt(e.target.value)}
                placeholder="Income Amount"
                required
              ></input>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="category">
                <b>Category :</b>
              </label>
              <Form.Select
                aria-label="category"
                onChange={(e) => setInccategory(e.target.value)}
                required
                id="category"
                style={{ flex: 1 }}
              >
                <option>Select the category</option>
                <option value="Salary">Salary</option>
                <option value="Mutual Funds">Mutual Funds</option>
                <option value="Share">Share</option>
                <option value="Rentals">Rentals</option>
                <option value="Others">Others</option>
              </Form.Select>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <label style={{ flex: "1" }} htmlFor="date">
                <b>Income Date :</b>
              </label>
              <input
                id="date"
                type="date"
                required
                onChange={(e) => setIncdate(e.target.value)}
              ></input>
            </div>
            <div className="login-btn-container">
              <Button
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="submit"
                variant="dark"
                disabled={loading ? true : false}
              >
                {isexpense ? "Add Expense" : "Add Income"}
              </Button>
            </div>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExpenseModal;
