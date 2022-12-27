import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState("Select Country");
  const [cities, setCities] = useState([]);
  const [singleCity, setSingleCity] = useState("Select City");
  const [submit, setSubmit] = useState(false);

  const fetchCountries = async () => {
    const countryAPI = "https://countriesnow.space/api/v0.1/countries/";
    try {
      const country = await axios.get(countryAPI);
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setSubmit(false);
    setSingleCity("Select City");
    setSingleCountry(country);
    const findCities = countries.find((c) => c.country === country);
    setCities(findCities.cities);
  };

  const submitHandler = () => {
    if (singleCity && singleCountry) {
      setSubmit(true);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Select Your Hometown</h1>
        <div>
          {countries && (
            <select
              onChange={(e) => {
                fetchCities(e.target.value);
              }}
              value={singleCountry}
            >
              <option disabled>Select Country</option>
              {countries.map((country) => {
                return (
                  <option
                    value={country.country}
                    key={`${country.country}-${Math.random()}`}
                  >
                    {country.country}
                  </option>
                );
              })}
            </select>
          )}
          {/* {console.log(singleCountry)} */}

          {cities && (
            <select
              onChange={(e) => {
                setSingleCity(e.target.value);
              }}
              value={singleCity}
            >
              <option disabled>Select City</option>
              {cities.map((city) => (
                <option value={city} key={`${city}-${Math.random()}`}>
                  {city}
                </option>
              ))}
            </select>
          )}
          <button onClick={submitHandler}>Go</button>
        </div>
        {submit && (
          <h4>
            Your country is {singleCountry} and city is {singleCity}.
          </h4>
        )}
      </div>
    </div>
  );
}

export default App;
