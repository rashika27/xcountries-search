
import { useState, useEffect } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error Fetching data: ", err));
  }, []);

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Updated to column layout
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {countries
          .filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
          .map((country) => (
            <div key={country.cca3} style={cardStyle} className="countryCard">
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={imageStyle}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
