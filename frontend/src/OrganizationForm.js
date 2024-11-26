import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import styles from './OrganizationForm.module.css'; // Importing CSS module
import { baseurl } from './API';

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    coreBusiness: '',
    sector: '',
    industryType: '',
    turnover: '',
    hqAddress: '',
    hqCity: '',
    hqState: '',
    hqCountry: '',
    hqZipcode: '',
    hqPhoneNumber: '',
    hqEmail: '',
    centerAddress: '',
    centerCity: '',
    centerState: '',
    centerCountry: '',
    centerZipcode: '',
    centerPhoneNumber: '',
    centerEmail: ''
  });

  const [hqCountries, setHqCountries] = useState([]);
  const [hqStates, setHqStates] = useState([]);
  const [hqCities, setHqCities] = useState([]);

  const [centerCountries, setCenterCountries] = useState([]);
  const [centerStates, setCenterStates] = useState([]);
  const [centerCities, setCenterCities] = useState([]);

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setHqCountries(countryList);
    setCenterCountries(countryList);
  }, []);

  useEffect(() => {
    if (formData.hqCountry) {
      const stateList = State.getStatesOfCountry(formData.hqCountry);
      setHqStates(stateList);
    } else {
      setHqStates([]);
    }
  }, [formData.hqCountry]);

  useEffect(() => {
    if (formData.hqState) {
      const cityList = City.getCitiesOfState(formData.hqCountry, formData.hqState);
      setHqCities(cityList);
    } else {
      setHqCities([]);
    }
  }, [formData.hqState, formData.hqCountry]);

  useEffect(() => {
    if (formData.centerCountry) {
      const stateList = State.getStatesOfCountry(formData.centerCountry);
      setCenterStates(stateList);
    } else {
      setCenterStates([]);
    }
  }, [formData.centerCountry]);

  useEffect(() => {
    if (formData.centerState) {
      const cityList = City.getCitiesOfState(formData.centerCountry, formData.centerState);
      setCenterCities(cityList);
    } else {
      setCenterCities([]);
    }
  }, [formData.centerState, formData.centerCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseurl}/organization`, formData)
      .then(response => {
        console.log(response.data);
        alert('Form data submitted successfully');
        resetForm();
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };

  const resetForm = () => {
    setFormData({
      coreBusiness: '',
      sector: '',
      industryType: '',
      turnover: '',
      hqAddress: '',
      hqCity: '',
      hqState: '',
      hqCountry: '',
      hqZipcode: '',
      hqPhoneNumber: '',
      hqEmail: '',
      centerAddress: '',
      centerCity: '',
      centerState: '',
      centerCountry: '',
      centerZipcode: '',
      centerPhoneNumber: '',
      centerEmail: ''
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.setAttribute('autocomplete', 'new-password');
    });
  }, []);

  return (
    <div className={styles.organizationDetailsForm}>
      <h2 className={styles.formHeading}>Organization Details</h2>
      <form onSubmit={handleSubmit}>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="coreBusiness">Core Business:</label>
          <input
            type="text"
            id="coreBusiness"
            name="coreBusiness"
            value={formData.coreBusiness}
            onChange={handleChange}
            required
            placeholder="Enter the core business"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="sector">Sector:</label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            required
            placeholder="Enter the sector"
            className={styles.inputField}
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="industryType">Industry Type:</label>
          <input
            type="text"
            id="industryType"
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            required
            placeholder="Enter the industry type"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="turnover">Turnover:</label>
          <input
            type="number"
            id="turnover"
            name="turnover"
            value={formData.turnover}
            onChange={handleChange}
            required
            placeholder="Enter the turnover"
            className={styles.inputField}
          />
        </div>
        </div>

        {/* HQ Address Fields */}
        {/* <h3>Headquarters Address</h3> */}
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="hqAddress">HQ Address:</label>
          <input
            type="text"
            id="hqAddress"
            name="hqAddress"
            value={formData.hqAddress}
            onChange={handleChange}
            required
            placeholder="Enter HQ address"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hqCity">HQ City:</label>
          <input
            type="text"
            id="hqCity"
            name="hqCity"
            value={formData.hqCity}
            onChange={handleChange}
            required
            placeholder="Enter HQ city"
            className={styles.inputField}
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="hqCountry">HQ Country:</label>
          <select
            id="hqCountry"
            name="hqCountry"
            value={formData.hqCountry}
            onChange={handleChange}
            required
            className={styles.selectField}
          >
            <option value="">Select Country</option>
            {hqCountries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hqState">HQ State:</label>
          <select
            id="hqState"
            name="hqState"
            value={formData.hqState}
            onChange={handleChange}
            required
            disabled={!formData.hqCountry}
            className={styles.selectField}
          >
            <option value="">Select State</option>
            {hqStates.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="hqZipcode">HQ Zip Code:</label>
          <input
            type="text"
            id="hqZipcode"
            name="hqZipcode"
            value={formData.hqZipcode}
            onChange={handleChange}
            required
            placeholder="Enter HQ zip code"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hqPhoneNumber">HQ Phone Number:</label>
          <input
            type="text"
            id="hqPhoneNumber"
            name="hqPhoneNumber"
            value={formData.hqPhoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter HQ phone number"
            className={styles.inputField}
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="hqEmail">HQ Email:</label>
          <input
            type="email"
            id="hqEmail"
            name="hqEmail"
            value={formData.hqEmail}
            onChange={handleChange}
            required
            placeholder="Enter HQ email"
            className={styles.inputField}
          />
        </div>

        {/* Center Address Fields */}
        {/* <h3>Center Address</h3> */}
        <div className={styles.formGroup}>
          <label htmlFor="centerAddress">Center Address:</label>
          <input
            type="text"
            id="centerAddress"
            name="centerAddress"
            value={formData.centerAddress}
            onChange={handleChange}
            required
            placeholder="Enter center address"
            className={styles.inputField}
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="centerCity">Center City:</label>
          <input
            type="text"
            id="centerCity"
            name="centerCity"
            value={formData.centerCity}
            onChange={handleChange}
            required
            placeholder="Enter center city"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="centerCountry">Center Country:</label>
          <select
            id="centerCountry"
            name="centerCountry"
            value={formData.centerCountry}
            onChange={handleChange}
            required
            className={styles.selectField}
          >
            <option value="">Select Country</option>
            {centerCountries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="centerState">Center State:</label>
          <select
            id="centerState"
            name="centerState"
            value={formData.centerState}
            onChange={handleChange}
            required
            disabled={!formData.centerCountry}
            className={styles.selectField}
          >
            <option value="">Select State</option>
            {centerStates.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="centerZipcode">Center Zip Code:</label>
          <input
            type="text"
            id="centerZipcode"
            name="centerZipcode"
            value={formData.centerZipcode}
            onChange={handleChange}
            required
            placeholder="Enter center zip code"
            className={styles.inputField}
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="centerPhoneNumber">Center Phone Number:</label>
          <input
            type="text"
            id="centerPhoneNumber"
            name="centerPhoneNumber"
            value={formData.centerPhoneNumber}
            onChange={handleChange}
            required
            placeholder="Enter center phone number"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="centerEmail">Center Email:</label>
          <input
            type="email"
            id="centerEmail"
            name="centerEmail"
            value={formData.centerEmail}
            onChange={handleChange}
            required
            placeholder="Enter center email"
            className={styles.inputField}
          />
        </div>
        </div>
            
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>Submit</button>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationForm;


