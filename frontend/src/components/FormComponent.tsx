import '../styles/FormComponent.css';
import React, { useEffect } from 'react';
import HttpHelperService from '../HttpHelperService';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/states/formSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { MainPage } from '../constants/RouteConstants';
export interface FormData {
  firstName: string,
  lastName: string,
  age: string,
  score: string,
  gender: string,
  country: string,
  city: string,
  id: string
}

const FormComponent = () => {
  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleCancel = () => {
    dispatch(setFormData({ firstName: '', lastName: '', age: '', score: '', id: '' }));
    navigate(MainPage);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await HttpHelperService.submit(formData);
    dispatch(setFormData({ firstName: '', lastName: '', age: '', score: '', id: '' }));
    navigate(MainPage);
  }
// fix
  useEffect(() => {
    fetch('/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <h2>Form</h2>
      </div>
      <div>
        <label className="label">First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="label">Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="label">Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="label">Score:</label>
        <input type="number" name="score" value={formData.score} onChange={handleChange} required className="input" />
      </div>
      <div>
        <label className="label">Country:</label>
        <select name="country" value={formData.country} onChange={handleChange} required className="input">
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">City:</label>
        <select name="city" value={formData.city} onChange={handleChange} required className="input" disabled={!formData.country}>
          <option value="">Select a city</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Gender:</label>
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} required className="input" />
      </div>
      <div className='btn-container'>
        <button type="submit" className="button">Submit</button>
        <button className="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default FormComponent;