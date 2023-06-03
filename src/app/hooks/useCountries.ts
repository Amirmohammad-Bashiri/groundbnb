"use client";

import countries from "world-countries";

const formattedCountries = countries.map(country => {
  return {
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  };
});

export const useCountries = () => {
  const getAllCountries = () => formattedCountries;

  const getCountryByValue = (value: string) => {
    return formattedCountries.find(country => country.value === value);
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};

export default useCountries;
