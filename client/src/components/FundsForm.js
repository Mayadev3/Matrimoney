import React, { useState } from 'react';
import { Link } from "react-router-dom";

const EMPTY_FORM = {
    text: "",
    amount: ""
  }

export default function FundsForm(props) {
    const [income, setIncome] = useState(EMPTY_FORM);

    const handleChange = (event) => {
        let { name, value } = event.target;
        let incObj = {...income};
        incObj[name] = value;
        incObj.text = incObj.text.charAt(0).toUpperCase() + incObj.text.slice(1);
        setIncome(income => incObj);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      props.addIncomeCb(income);
      setIncome(EMPTY_FORM);
    }

  return (
    <div>
      <div className="secondary-nav">
        <Link to="/funds" className="selected-second-nav">Add Funds</Link>
        <Link to="/funds/display" >View Funds</Link>
      </div>
      <div className="bottom-container">
        <h3>Add Funds</h3>
        <form id="funds-form" onSubmit={handleSubmit}>
          {/* <label>Source of Funds:
                <input 
                type = "text"
                name = "text"
                value = {income.text}
                onChange = {handleChange}
                required
                />
            </label>
            <label>Amount:
                <input 
                  type = "number"
                  name = "amount"
                  value = {income.amount}
                  onChange = {handleChange}
                  required
                />
              </label>
            <div>
                <button type="submit"  className="cursor-pointer">+</button>
            </div> */}

            <div class="row g-3 justify-content-center  align-items-end">
              <div className="col-1"></div>
  <div class="col-4">
    Source of funds:
  <input 
                type = "text"
                name = "text"
                value = {income.text}
                onChange = {handleChange}
                required
                />  </div>
  <div class="col-4">
    Amount:
  <input 
                  type = "number"
                  name = "amount"
                  value = {income.amount}
                  onChange = {handleChange}
                  required
                />  </div>

<div className="col-1">
<button type="submit"  className="cursor-pointer">+</button>

</div>
</div>
        </form>
      </div>
    </div>

  )
}
