import React, { useState, useRef, useEffect } from "react";
import Datepicker from "tailwind-datepicker-react";
import CalendarIcon from "../../../public/icons/icon-calendar.png";
import Image from "next/image";
import moment from "moment-timezone";

const options = {
  title: "",
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-[#1b1b1b]",
    todayBtn:
      "bg-[#2C2B2B] hover:bg-[#111111] focus:ring-2 focus:ring-[#F7B267]",
    clearBtn:
      "bg-[#2C2B2B] hover:bg-[#111111] text-white focus:ring-2 focus:ring-[#F7B267]",
    icons: "bg-[#1b1b1b] hover:bg-[#111111] text-white hover:text-white",
    text: "text-white hover:bg-neutral-800",
    disabledText: "text-gray-400 hover:bg-neutral-800",
    input: "",
    inputIcon: "",
    selected: "bg-[#F7B267] text-black hover:bg-[#111111]",
  },
  datepickerClassNames: "top-22",
  defaultDate: new Date(),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
};

const FieldDatePicker = ({ id, onChange, resetKey, name, selectedDate }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(selectedDate || null);
  const datepickerRef = useRef(null);

  const handleChange = (date) => {
    const malaysiaDate = moment.tz(date, "Asia/Kuala_Lumpur").toDate();
    setDate(malaysiaDate);
    onChange(malaysiaDate);
    console.log(formatDateInMalaysiaTime(malaysiaDate));
  };

  const handleClose = (state) => {
    setShow(state);
  };

  useEffect(() => {
    setDate(selectedDate || null);
  }, [selectedDate, resetKey]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDateInMalaysiaTime = (date) => {
    return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
  };

  return (
    <div ref={datepickerRef} className="relative flex flex-1">
      <Datepicker
        id={id}
        name={name}
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      >
        <div className="relative flex items-center">
          <input
            type="text"
            className="bg-transparent flex-1 px-4 py-2 rounded-lg focus:outline-none focus:bg-white/20 focus:ring-inset border border-white/20 text-white placeholder-white/60 pr-12"
            placeholder="Select Date"
            value={date ? formatDateInMalaysiaTime(date) : ""}
            onFocus={() => setShow(true)}
            readOnly
          />
          <Image
            src={CalendarIcon.src}
            alt="calendar"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-60"
            width={18}
            height={18}
          />
        </div>
      </Datepicker>
    </div>
  );
};

export default FieldDatePicker;
