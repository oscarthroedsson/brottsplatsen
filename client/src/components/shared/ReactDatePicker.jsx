import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import "../../styles/ReactDatePicker.css"; // override styles

export default function CalanderSelect({ onChange }) {
  const [date, setDate] = useState(new Date());

  function handleChange(data) {
    const isoFormat = data.toISOString();
    onChange(isoFormat);
  }

  return (
    <div className="w-64 md:w-80">
      <DatePicker
        placeholderText="Välj datum"
        selected={date}
        onChange={(d) => {
          setDate(d);
          handleChange(d);
        }}
        className="!max-w-full text-font-color relative !w-full cursor-default rounded-md bg-light-bg py-2.5 pl-5 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:size2-p sm:leading-6"
      ></DatePicker>
    </div>
  );
}
