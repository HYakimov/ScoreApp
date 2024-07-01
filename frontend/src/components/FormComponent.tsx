import '../styles/FormComponent.css';
import React, { useEffect } from 'react';
import HttpHelperService from '../HttpHelperService';
import { useDispatch, useSelector } from 'react-redux';
import { initialState, setFormData } from '../store/states/formSlice';
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { MainPage } from '../constants/RouteConstants';
import { setCountries } from '../store/states/countriesSlice';
import { setCities } from '../store/states/citiesSlice';
export interface FormData {
  firstName: string
  lastName: string
  age: number | null
  score: number | null
  countryName: string
  countryId: number | null
  cityName: string
  cityId: number | null
  gender: string
  id: number | null
}

const FormComponent = () => {
  const formData = useSelector((state: RootState) => state.form);
  const countries = useSelector((state: RootState) => state.countries.value);
  const cities = useSelector((state: RootState) => state.cities.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSelectChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
    fetchCities(parseInt(value));
  };

  const handleCancel = () => {
    dispatch(setFormData(initialState));
    navigate(MainPage);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await HttpHelperService.submit(formData);
    dispatch(setFormData(initialState));
    navigate(MainPage);
  }

  const fetchCountries = async () => {
    const data = await HttpHelperService.getCountries();
    dispatch(setCountries(data))
  }

  const fetchCities = async (countryId: number) => {
    const data = await HttpHelperService.getCities(countryId);
    dispatch(setCities(data))
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <h2>Form</h2>
      </div>
      <div>
        <label className="label">First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Age:</label>
        <input type="number" name="age" value={formData.age == null ? '' : formData.age} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Score:</label>
        <input type="number" name="score" value={formData.score == null ? '' : formData.score} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Country:</label>
        <select name="countryId" value={formData.countryId == null ? '' : formData.countryId} onChange={handleSelectChangeCountry} required className="input select-input">
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">City:</label>
        <select name="cityId" value={formData.cityId == null ? '' : formData.cityId} onChange={handleSelectChange} required className="input select-input">
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleSelectChange} required className="input select-input" >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className='btn-container'>
        <button type="submit" className="button">Submit</button>
        <button className="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default FormComponent;