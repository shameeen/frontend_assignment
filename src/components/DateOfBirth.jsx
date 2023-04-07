import React from 'react';
import InputField from "./InputField";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';




export default function DateOfBirth({ validationErrorDay, handleDayChange, handleMonthYearChange, handleYearChange, selectedYear, selectedMonthYear, selectedDay, validationErrorYear, validationErrorMonth, heading }) {

  const renderDateOfBirthTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Your Date of birth is required to accurately calculate your health age.
    </Tooltip>
  );


  return (

    <div className="dob">
      <div className="d-flex" >
        <h4>{heading}</h4>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderDateOfBirthTooltip}
        >
          <Button variant="success" className="info-button">i</Button>
        </OverlayTrigger>
      </div>

      <div className="date">
        <div>
          <InputField
            label="Day"
            placeholder="Day"
            ariaLabel="Day"
            ariaDescribedBy="basic-addon1"
            onChange={handleDayChange}
            value={selectedDay}
            feedbackType={validationErrorDay.day ? "invalid" : ""}
            feedbackText={validationErrorDay.day}
          />
        </div>
        <div>
          <InputField
            label="Month"
            placeholder="Month"
            onChange={handleMonthYearChange}
            value={selectedMonthYear}
            feedbackType={validationErrorMonth.month ? 'invalid' : ''}
            feedbackText={validationErrorMonth.month}
          />

        </div>
        <div>
          <InputField
            label="Year"
            placeholder="Year"
            onChange={handleYearChange}
            value={selectedYear}
            feedbackType={validationErrorYear.year ? 'invalid' : ''}
            feedbackText={validationErrorYear.year}
          />

        </div>
      </div>
    </div>



  )

}