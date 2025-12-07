import React from "react";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button";
import PageHeading from "../components/PageHeading";
import FormContainer from "../components/FormContainer";
import Calendar from "../components/Calendar";
import TimeSelector from "../components/TimeSelector";
import SlotDetails from "../components/SlotDetails";
import "../App.css";

function DateTimePage() {
  const formFields = [
    {
      label: "date",
      component: <Calendar />,
      sectionClassName: "date-section",
      wrapperClassName: "calendar-container"
    },
    {
      label: "time",
      component: <TimeSelector />,
      sectionClassName: "time-section",
      wrapperClassName: "time-box"
    }
  ];

  // Available tables for the selected time slot
  const availableTables = [
    { count: 2, seats: 4 },
    { count: 2, seats: 2 }
  ];

  return (
    <Layout>
      <div className="date-time-page">

        {/* PAGE TITLE */}
        <PageHeading text="RESERVE TABLES" />

        {/* MAIN CARD */}
        <FormContainer fields={formFields} />

        {/* SLOT DETAILS */}
        <SlotDetails tables={availableTables} />

        {/* CONTINUE BUTTON */}
        <div className="continue-button-section">
          <Button text="continue" />
        </div>

      </div>
    </Layout>
  );
}


export default DateTimePage;

