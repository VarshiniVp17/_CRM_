import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OpportunityForm.css";
import { baseurl } from "./API";

const OpportunityForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    dealsOwner: "",
    dealsName: "",
    amount: "",
    probability: "",
    accountName: "",
    contactName: "",
    stage: "",
    type: "",
    leadSource: "",
    nextStep: "",
    expectedRevenue: "",
    currency: "",
    exchangeRate: "",
    closingDate: "",
    createdDate: "",
    ee_en_nn: "",
    dealValue: "",
    financialQtr: "",
    plannedRevenue: "",
    closurePeriod: "",
    aging: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseurl}/opportunity`, formData);
      alert("Data saved successfully");
      resetForm();
      console.log(response.data);
    } catch (error) {
      console.error("Error saving data", error);
      alert("Failed to save data");
    }
  };

  const handleCancel = () => {
    resetForm();
    alert("Form reset successfully");
  };

  const resetForm = () => {
    setFormData({
      id: "",
      dealsOwner: "",
      dealsName: "",
      amount: "",
      probability: "",
      accountName: "",
      contactName: "",
      stage: "",
      type: "",
      leadSource: "",
      nextStep: "",
      expectedRevenue: "",
      currency: "",
      exchangeRate: "",
      closingDate: "",
      createdDate: "",
      ee_en_nn: "",
      dealValue: "",
      financialQtr: "",
      plannedRevenue: "",
      closurePeriod: "",
      aging: "",
    });
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("autocomplete", "new-password");
    });
  }, []);

  return (
    <div className="opportunity-form">
      <h2>
        <center>Opportunity Details</center>
      </h2>
      <form onSubmit={handleSubmit}>
        {/* First Row: ID and Deals Owner */}
        <div className="row">
          <div className="field">
            <label>ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              placeholder="Enter ID"
            />
          </div>
          <div className="field">
            <label>Deals Owner:</label>
            <input
              type="text"
              name="dealsOwner"
              value={formData.dealsOwner}
              onChange={handleChange}
              required
              placeholder="Enter Deals Owner"
            />
          </div>
        </div>

        {/* Second Row: Deals Name and Amount */}
        <div className="row">
          <div className="field">
            <label>Deals Name:</label>
            <input
              type="text"
              name="dealsName"
              value={formData.dealsName}
              onChange={handleChange}
              required
              placeholder="Enter Deals Name"
            />
          </div>
          <div className="field">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="Enter Amount"
            />
          </div>
        </div>

        {/* Third Row: Probability and Account Name */}
        <div className="row">
          <div className="field">
            <label>Probability (%):</label>
            <input
              type="number"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              required
              placeholder="Enter Probability"
            />
          </div>
          <div className="field">
            <label>Account Name:</label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              required
              placeholder="Enter Account Name"
            />
          </div>
        </div>

        {/* Fourth Row: Contact Name and Stage */}
        <div className="row">
          <div className="field">
            <label>Contact Name:</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              placeholder="Enter Contact Name"
            />
          </div>
          <div className="field wide-field">
            <label>Stage:</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required
            >
              <option value="">Select stage</option>
              <option value="L0">L0</option>
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
              <option value="L4">L4</option>
              <option value="L5">L5</option>
              <option value="L6">L6</option>
              <option value="L7">L7</option>
            </select>
          </div>
        </div>

        {/* Fifth Row: Type and Lead Source */}
        <div className="row">
          <div className="field wide-field">
            <label>Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option value="New">New</option>
              <option value="Existing">Existing</option>
            </select>
          </div>
          <div className="field">
            <label>Lead Source:</label>
            <input
              type="text"
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              required
              placeholder="Enter Lead Source"
            />
          </div>
        </div>

        {/* Remaining Fields */}
        <div className="row">
          <div className="field">
            <label>Next Step:</label>
            <input
              type="text"
              name="nextStep"
              value={formData.nextStep}
              onChange={handleChange}
              placeholder="Enter Next Step"
            />
          </div>
          <div className="field">
            <label>Expected Revenue:</label>
            <input
              type="number"
              name="expectedRevenue"
              value={formData.expectedRevenue}
              onChange={handleChange}
              placeholder="Enter Expected Revenue"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Currency:</label>
            <select
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="Enter Currency"
              required
            >
              <option value="">Select currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
            </select>
          </div>

          <div className="field">
            <label>Exchange Rate:</label>
            <input
              type="number"
              name="exchangeRate"
              value={formData.exchangeRate}
              onChange={handleChange}
              placeholder="Enter Exchange Rate"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Closing Date:</label>
            <input
              type="date"
              name="closingDate"
              value={formData.closingDate}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Created Date:</label>
            <input
              type="date"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Business Type (EE/EN/NN):</label>
            <input
              type="text"
              name="ee_en_nn"
              value={formData.ee_en_nn}
              onChange={handleChange}
              placeholder="Enter Business Type"
            />
          </div>
          <div className="field">
            <label>Deal Value:</label>
            <input
              type="number"
              name="dealValue"
              value={formData.dealValue}
              onChange={handleChange}
              placeholder="Enter Deal Value"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Financial Quarter:</label>
            <input
              type="text"
              name="financialQtr"
              value={formData.financialQtr}
              onChange={handleChange}
              placeholder="Enter Financial Quarter"
            />
          </div>
          <div className="field">
            <label>Planned Revenue:</label>
            <input
              type="number"
              name="plannedRevenue"
              value={formData.plannedRevenue}
              onChange={handleChange}
              placeholder="Enter Planned Revenue"
            />
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label>Closure Period:</label>
            <input
              type="text"
              name="closurePeriod"
              value={formData.closurePeriod}
              onChange={handleChange}
              placeholder="Enter Closure Period"
            />
          </div>
          <div className="field">
            <label>Aging:</label>
            <input
              type="number"
              name="aging"
              value={formData.aging}
              onChange={handleChange}
              placeholder="Enter Aging"
            />
          </div>
        </div>

        <div className="button-row">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OpportunityForm;
