import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Countries from './components/Countries';
import './App.css'

function App() {
  const DATA_URL = 'https://restcountries.com/v3.1/all';
  const [countryData, setCountryData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [countryCodeMap, setCountryCodeMap] = useState({});
  const [isAlphaActive, setIsAlphaActive] = useState(false);
  const [isTopPopulation, setIsTopPopulation] = useState(false);
  const [isTopArea, setIsTopArea] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedSubregion, setSelectedSubregion] = useState('');

  useEffect(() => {
    async function fetchData(url) {
      try {
        setFetchStatus('loading');
        const resp = await fetch(url);
        const data = await resp.json();
        const codeMap = {};
        data.map(country => {
          codeMap[country.cca3] = country.name.common;
        });
        setCountryData(data);
        setCountryCodeMap(codeMap);
        setFetchStatus('idle');
      } catch(e) {
        setFetchStatus('error');
        console.log(e.message);
      }
    }
    fetchData(DATA_URL);
  },[]);

  const handleAlphaChange = (event) => {
    setIsAlphaActive(event.target.checked);
  };
  
  const handleTopPopulationChange = (event) => {
    setIsTopPopulation(event.target.checked);
    setIsTopArea(false);
  };
  
  const handleTopAreaChange = (event) => {
    setIsTopArea(event.target.checked);
    setIsTopPopulation(false);
  };
  
  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
    setSelectedSubregion('');
  };
  
  const handleSubregionChange = (event) => {
    setSelectedSubregion(event.target.value);
    setSelectedContinent(''); 
  };
  
const getFilteredCountries = () => {
  let filteredData = [...countryData];
  if (selectedContinent) filteredData = filteredData.filter((country) => country.continents.includes(selectedContinent));
  if (selectedSubregion) filteredData = filteredData.filter((country) => country.subregion === selectedSubregion);
  if (isAlphaActive) filteredData.sort((a, b) => a.name.common.localeCompare(b.name.common));
  if (isTopPopulation) filteredData = filteredData.sort((a, b) => b.population - a.population).slice(0, 10);
  if (isTopArea) filteredData = filteredData.sort((a, b) => b.area - a.area).slice(0, 10);
  return filteredData;
};

  const getBorderNames = (borders) => {
    return borders.map(code => countryCodeMap[code] || code).join(', ');
  };

  const getCurrencyInfo = (currencies) => {
    return Object.values(currencies).map(currency => `${currency.name} (${currency.symbol || ''})`).join(', ');
  };

  return (
    <>
      <div className='container'>
        <h1>Countries of the World</h1>
        <div className='filter_sort__container'>
          <h2>Filter & sort</h2>
          <form className='filters__container'>
            <div className='filter_group01__container'>
              <div className='filter__container'>
                <h3>A-z</h3>
                <div className='filter_item__container'>
                  <input type="checkbox" id="alpha" name="alpha" checked={isAlphaActive} onChange={handleAlphaChange}/>
                  <label>Alpha</label>
                </div>
              </div>
              <div className='filter__container'>
                <h3>Top 10</h3>
                <div className='filter_item__container'>
                  <input type="checkbox" id="population" name="population" checked={isTopPopulation} onChange={handleTopPopulationChange} />
                  <label>by population</label>
                </div>
                <div className='filter_item__container'>
                  <input type="checkbox" id="area" name="area" checked={isTopArea} onChange={handleTopAreaChange} />
                  <label>by area</label>
                </div>
              </div>
            </div>
            <div className='filter_group01__container'>
              <div className='filter__container'>
                <h3>By continent</h3>
                <select name="continent" id="continent" value={selectedContinent} onChange={handleContinentChange}>
                  <option value="">All</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Oceania">Oceania</option>
                  <option value="South America">South America</option>
                </select>
              </div>
              <div className='filter__container'>
                <h3>By subregion</h3>
                <select name="subregion" id="subregion" value={selectedSubregion} onChange={handleSubregionChange}>
                  <option value="">Choose region</option>
                  <option value="Caribbean">Caribbean</option>
                  <option value="Western Europe">Western Europe</option>
                  <option value="Western Africa">Western Africa</option>
                  <option value="Central Europe">Central Europe</option>
                  <option value="Eastern Asia">Eastern Asia</option>
                  <option value="Polynesia">Polynesia</option>
                  <option value="Northern Africa">Northern Africa</option>
                  <option value="Southern Europe">Southern Europe</option>
                  <option value="South-Eastern Asia">South-Eastern Asia</option>
                  <option value="Eastern Africa">Eastern Africa</option>
                  <option value="Southern Africa">Southern Africa</option>
                  <option value="North America">North America</option>
                  <option value="Middle Africa">Middle Africa</option>
                  <option value="Micronesia">Micronesia</option>
                  <option value="Southeast Europe">Southeast Europe</option>
                  <option value="Western Asia">Western Asia</option>
                  <option value="Northern Europe">Northern Europe</option>
                  <option value="Melanesia">Melanesia</option>
                  <option value="Central Asia">Central Asia</option>
                  <option value="Southern Asia">Southern Asia</option>
                  <option value="South America">South America</option>
                  <option value="Australia and New Zealand">Australia and New Zealand</option>
                  <option value="Central America">Central America</option>
                  <option value="Eastern Europe">Eastern Europe</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div>
          <Countries countries={getFilteredCountries()} fetchStatus={fetchStatus} getBorderNames={getBorderNames} getCurrencyInfo={getCurrencyInfo} />
        </div>
      </div>
    </>
  )
}

export default App