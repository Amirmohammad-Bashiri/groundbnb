"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAllCountries } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAllCountries()}
        value={value}
        autoFocus
        onChange={value => onChange(value as CountrySelectValue)}
        formatOptionLabel={option => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},{" "}
              <span className="ml-1 text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;
