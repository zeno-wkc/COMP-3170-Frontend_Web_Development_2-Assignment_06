import Country from './Country';

export default function Countries({ countries, fetchStatus, getBorderNames, getCurrencyInfo }) {
  if (fetchStatus === 'loading') return <p className='message'>Loading...</p>;
  if (fetchStatus === 'error') return <p className='message'>Error loading data.</p>;
  return (
    <div className='country_content__container'>
      {countries.map((country, index) => (
        <Country
          key={index}
          country={country}
          getBorderNames={getBorderNames}
          getCurrencyInfo={getCurrencyInfo}
        />
      ))}
    </div>
  );
}