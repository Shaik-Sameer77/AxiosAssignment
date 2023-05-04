import React, { useState } from 'react';
import axios from 'axios';
import './OTPGenerator.css'
import Form from '../molecules/Form';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

function OTPGenerator() {
  const [mobile, setMobile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
      setErrorMessage('Invalid mobile number. Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    try {
      const response = await axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
        mobile: parseInt(mobile, 10)
      });

      const data = response.data;

      if (response.status === 200 && data.txnId) {
        setMobile('');
        setErrorMessage('');
        alert('OTP sent successfully!');
      } else {
        setErrorMessage('Failed to generate OTP. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('Failed to generate OTP. Please try again later.');
    }
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  return (
    <div>
      <h2>Generate OTP</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="mobile">Mobile Number:</label>
        <Input
          type="tel"
          id="mobile"
          name="mobile"
          value={mobile}
          onChange={handleMobileChange}
          required
          pattern="[6-9][0-9]{9}"
        />
        <Button type="submit">Generate OTP</Button>
      </Form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default OTPGenerator;