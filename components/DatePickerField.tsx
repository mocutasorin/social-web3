import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  name: string;
  // All other props
  [x: string]: any;
};

const DatePickerField = ({ ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const [startDate, setStartDate] = useState(new Date());

  const years = range(1927, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      {...field}
      {...props}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(val: Date) => {
        setStartDate(val);
        setFieldValue(field.name, val?.toLocaleDateString().replace(/-/g, "/"));
      }}
    />
  );
};

export default DatePickerField;
