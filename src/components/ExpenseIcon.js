import React from "react";

const ExpenseIcon = ({ category }) => {
  return (
    <>
      {category === "Entertainment" && (
        <i style={{ fontSize: "40px" }} class="fas fa-film"></i>
      )}
      {category === "Food" && (
        <i style={{ fontSize: "40px" }} class="fas fa-utensils"></i>
      )}
      {category === "Home" && (
        <i style={{ fontSize: "40px" }} class="fas fa-home"></i>
      )}
      {category === "Transport" && (
        <i style={{ fontSize: "40px" }} class="fas fa-bus"></i>
      )}
      {category === "Medical" && (
        <i
          style={{ fontSize: "40px" }}
          class="fas fa-hospital"
        ></i>
      )}
      {category === "Travel" && (
        <i style={{ fontSize: "40px" }} class="fas fa-plane"></i>
      )}
      {category === "Others" && (
        <i style={{ fontSize: "40px" }} class="fas fa-skull-crossbones"></i>
      )}
    </>
  );
};

export default ExpenseIcon;
