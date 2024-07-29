import '../styles/UserRegistrationFormComponent.css';
import React, { useEffect, useState } from 'react';
import HttpHelperService from '../HttpHelperService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MainPage } from '../constants/RouteConstants';
import { setCountries } from '../store/states/CountriesDataSlice';
import { setCities } from '../store/states/CitiesDataSlice';
import { initialState, setUserInputData } from '../store/states/UserInputDataSlice';
import { setFormData, initialFormDataState } from '../store/states/FormDataSlice';
import { citiesRecordsSelector, countriesRecordsSelector, userInputSelector } from '../store/selectors/selectors';

const UserRegistrationFormComponent = () => {
  const userInputData = useSelector(userInputSelector);
  const countries = useSelector(countriesRecordsSelector);
  const cities = useSelector(citiesRecordsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setUserInputData({ ...userInputData, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setUserInputData({ ...userInputData, [name]: value }));
  };

  const handleSelectChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setUserInputData({ ...userInputData, [name]: value }));
    fetchCities(parseInt(value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setAvatarFile(file);
  };

  const handleCancel = () => {
    dispatch(setUserInputData(initialState));
    setAvatarFile(null);
    navigate(MainPage);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(userInputData).forEach((key) => {
      const value = (userInputData as any)[key];
      if (value !== null && key !== 'id') {
        data.append(key, value);
      }
    });
    if (avatarFile) {
      data.append('avatar', avatarFile);
    }
    if (userInputData.id != null) {
      await HttpHelperService.update(userInputData.id, data);
      dispatch(setFormData(initialFormDataState))
    } else {
      await HttpHelperService.submit(data);
      dispatch(setUserInputData(initialState));
    }
    navigate(MainPage);
  }

  const fetchCountries = async () => {
    const data = await HttpHelperService.getCountries();
    dispatch(setCountries(data.data))
  }

  const fetchCities = async (countryId: number) => {
    const data = await HttpHelperService.getCities(countryId);
    dispatch(setCities(data.data))
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
        <input type="text" name="firstName" value={userInputData.firstName} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Last Name:</label>
        <input type="text" name="lastName" value={userInputData.lastName} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Age:</label>
        <input type="number" name="age" value={userInputData.age ?? ''} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Country:</label>
        <select name="countryId" value={userInputData.countryId ?? ''} onChange={handleSelectChangeCountry} required className="input select-input">
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">City:</label>
        <select name="cityId" value={userInputData.cityId ?? ''} onChange={handleSelectChange} required className="input select-input">
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Gender:</label>
        <select name="gender" value={userInputData.gender} onChange={handleSelectChange} required className="input select-input" >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label className="label">Email:</label>
        <input type="text" name="email" value={userInputData.email} onChange={handleInputChange} required className="input" />
      </div>
      <div>
        <label className="label">Avatar:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="input" />
      </div>
      <div className='btn-container'>
        <button type="submit" className="button">Submit</button>
        <button className="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default UserRegistrationFormComponent;