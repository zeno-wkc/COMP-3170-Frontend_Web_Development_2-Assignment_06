export default function Country({ country, getBorderNames, getCurrencyInfo }) {
  return (
    <div className='country__container'>
      <div className='country_title__container'>
        <img className='country_img'  src={country.flags.png} alt={`${country.name.common} flag`}/>
        <h4>{country.name.common}</h4>
      </div>
      <div className='country_information__container'>
        {country.name.official ? (<p><span>Official name:</span><span>{country.name.official}</span></p>) : ''}
        {country.capital ? (<p><span>Capital:</span><span>{country.capital}</span></p>) : ''}
        {country.population ? (<p><span>Population:</span><span>{country.population.toLocaleString()}</span></p>) : (<p><span>Population:</span><span>0</span></p>)}
        {country.languages ? (<p><span>Languages:</span><span>{Object.values(country.languages).join(', ')}</span></p>) : ''}
        {country.currencies ? (<p><span>Currency:</span><span>{getCurrencyInfo(country.currencies)}</span></p>) : ''}
        {country.area ? (<p><span>Area (mi2):</span><span>{country.area.toLocaleString()}</span></p>) : ''}
        {country.subregion ? (<p><span>Subregion:</span><span>{country.subregion}</span></p>): ''}
        {country.continents ? (<p><span>Continents:</span><span>{country.continents}</span></p>) : ''}
        {country.borders ? (<p><span>Borders:</span><span>{getBorderNames(country.borders)}</span></p>) : ''}
        {country.maps.googleMaps ? (<p><a className='google_link' href={country.maps.googleMaps}>Show on Google Maps</a></p>) : ''}
      </div>
    </div>
  );
};