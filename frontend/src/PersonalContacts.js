import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { City, Country, State } from 'country-state-city';
import styles from './PersonalContact.module.css';
import { baseurl } from './API';

const PersonalContacts = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    reportingManager: '',
    department: '',
    designation: '',
    role: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    email: '',
    mobileNo: ''
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const countryList = Country.getAllCountries();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const stateList = State.getStatesOfCountry(formData.country);
      setStates(stateList);
    } else {
      setStates([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      const cityList = City.getCitiesOfState(formData.country, formData.state);
      setCities(cityList);
    } else {
      setCities([]);
    }
  }, [formData.state, formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseurl}/form`, formData)
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
      firstName: '',
      lastName: '',
      displayName: '',
      reportingManager: '',
      department: '',
      designation: '',
      role: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      email: '',
      mobileNo: ''
    });
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.setAttribute('autocomplete', 'new-password');
    });
  }, []);

  return (
    <div className={styles.personalDetailsForm}>
      <h2>Contact Details</h2>
      <form onSubmit={handleSubmit}>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="Enter your first name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
            placeholder="Enter your display name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="reportingManager">Reporting Manager:</label>
          <input
            type="text"
            id="reportingManager"
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleChange}
            required
            placeholder="Enter your reporting manager's name"
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            placeholder="Enter your department"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            placeholder="Enter your designation"
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            placeholder="Enter your role"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter your address"
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zipcode">Zip Code:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            placeholder="Enter your zip code"
          />
        </div>
        </div>
        <div class="row">
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobileNo">Mobile No:</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            placeholder="Enter your mobile number"
          />
        </div>
        </div>
        <div className={styles['button-Container']}>
          <button type="submit" className={styles['submit-Button']}>Submit</button>
          <button type="cancel" className={styles['cancel-Button']} onClick={resetForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalContacts;

