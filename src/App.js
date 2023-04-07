import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import SelectInput from './components/SelectInput';
import DateOfBirth from './components/DateOfBirth';
import Performance from "./components/Performance";
import Buttonn from "./components/Button";
import Rating from "./components/Rating";
import StressSources from "./components/StressSources";
import { SOURCES_VALIDATION_ERROR, YEAR_VALIDATION_ERROR, MONTH_VALIDATION_ERROR, DAY_VALIDATION_ERROR, GET_QUESTION_JSON } from './constant';






function App() {
  const [formData, setFormData] = useState([]);
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [workLifeBalance, setworkLifeBalance] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [textAreaContent, setTextAreaContent] = useState('');
  const [validationErrorYear, setValidationErrorYear] = useState({});
  const [validationErrorMonth, setValidationErrorMonth] = useState({});
  const [validationErrorDay, setValidationErrorDay] = useState({});
  const [ValidationErrorSources, setValidationErrorSources] = useState({});
  const [isValid, setIsValid] = useState(false);



  useEffect(() => {
    const getQuestions = async () => {
      const questions = await axios.get(GET_QUESTION_JSON);
      setFormData(questions.data);
      console.log(questions);
    };


    getQuestions();
    return () => {
    };
  }, []);




  const handleRateClick = (e) => {
    setRate(e.target.value);
  }

  const handleWorkLifeBalance = (e) => {
    setworkLifeBalance(e.target.value);
  }




  function validateInput(type, value) {
   

    if (type === "textarea") {
      return /^[A-Za-z\d ]{0,250}$/.test(value);
    }

    console.log("length", value.length);
    if(value.lengh <= 1) { return true };

    if (!value.trim()) {
      console.log("trim");
      return false;
    
    }

    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      console.log("abc");
      setIsValid(false);
      return false;
   
    }

    switch (type) {
      case "days":

        return numericValue >= 1 && numericValue <= 31;
           
    
       
      case "months":
        return numericValue >= 1 && numericValue <= 12 && value.length <= 2;
      case "years":
        console.log("console", numericValue, type, numericValue.toString().length);
        if (numericValue.toString().length < 4) return true;
        return numericValue >= 1920 && numericValue <= 2006;
      default:
        return false;
    }
  }

  
  

  function handleDayChange(e) {
    e.preventDefault();
    if (validateInput("days", e.target.value)) {
      setSelectedDay(e.target.value);
      setValidationErrorDay({});
    } else {
      setValidationErrorDay({ day: DAY_VALIDATION_ERROR });
      
    }
    // setIsValid(validateInput("days", selectedDay) && validateInput("months", selectedMonthYear) && validateInput("years", selectedYear) && validateInput("textarea", textAreaContent));
    console.log(validateInput("days", selectedDay), validateInput("months", selectedMonthYear), validateInput("years", selectedYear), validateInput("textarea", textAreaContent));
  }

  function handleMonthYearChange(e) {
    e.preventDefault();
    if (validateInput("months", e.target.value)) {
      setSelectedMonthYear(e.target.value);
      setValidationErrorMonth({});
    } else {
      setValidationErrorMonth({ month: MONTH_VALIDATION_ERROR });
    }
    setIsValid(validateInput("days", selectedDay) && validateInput("months", selectedMonthYear) && validateInput("years", selectedYear) && validateInput("textarea", textAreaContent));
    console.log(validateInput("days", selectedDay) && validateInput("months", selectedMonthYear) && validateInput("years", selectedYear) && validateInput("textarea", textAreaContent));
  }

  function handleYearChange(e) {
    e.preventDefault();
    if (validateInput("years", e.target.value)) {
      setSelectedYear(e.target.value);
      setValidationErrorYear({});
    } else {
      setValidationErrorYear({ year: YEAR_VALIDATION_ERROR });
    }
    setIsValid(validateInput("days", selectedDay) && validateInput("months", selectedMonthYear) && validateInput("years", selectedYear) && validateInput("textarea", textAreaContent));
  }

  function handleTextareaChange(e) {
    e.preventDefault();
    if (validateInput("textarea", e.target.value)) {
      setTextAreaContent(e.target.value);
      setValidationErrorSources({});
    } else {
      setValidationErrorSources({ textarea: SOURCES_VALIDATION_ERROR });
    }
    setIsValid(validateInput("days", selectedDay) && validateInput("months", selectedMonthYear) && validateInput("years", selectedYear) && validateInput("textarea", e.target.value));
  }

  const handleTitleChange = (e) => { setTitle(e.target.value) }

  const handleSubmitButtonClick = async () => {
    const updatedData = {
      id: Math.random(),
      titles: title,
      dateOfBirth: `${selectedDay}/${selectedMonthYear}/${selectedYear}`,
      textAreaContent: textAreaContent,
      rates: rate,
      workLifeBalances: workLifeBalance,
    }
    


    try {
      axios.post('http://localhost:3001/write-file', { fileContent: updatedData }).then(response => console.log(response.data)).catch(error => console.error(error));
      console.log("successful");
    }
    catch (error) {
      console.error('Error writing file:', error);
    }

    

    setTitle("");
    setRate("");
    setworkLifeBalance("");
    setTextAreaContent("");
    setSelectedYear("");
    setSelectedMonthYear("");
    setSelectedDay("");
  };


  return (

    <div className="main-container container">
      <SelectInput formData={formData} handleTitleChange={handleTitleChange} title={title} Heading="Title"/>

      <DateOfBirth
        validationErrorDay={validationErrorDay}
        validationErrorYear={validationErrorYear}
        validationErrorMonth={validationErrorMonth}
        selectedDay={selectedDay}
        selectedMonthYear={selectedMonthYear}
        selectedYear={selectedYear}
        handleDayChange={handleDayChange}
        handleMonthYearChange={handleMonthYearChange}
        handleYearChange={handleYearChange}
        heading="Date of birth"
      />

      <Rating formData={formData} question={formData?.questions?.[2]?.question} handleRateClick={handleRateClick} variant="primary" onClick={handleRateClick} value={rate} />

      <StressSources
        question={formData?.questions?.[3]?.question}
        textAreaContent={textAreaContent}
        handleTextareaChange={handleTextareaChange}
        ValidationErrorSources={ValidationErrorSources.textarea}
      />


      <Performance
        question={formData?.questions?.[4]?.question}
        handleWorkLifeBalance={handleWorkLifeBalance} workLifeBalance={workLifeBalance} formData={formData} />

{/* {isValid && ( */}
      <Buttonn variant="primary" onClick={handleSubmitButtonClick} disabled={!isValid} className="submit">Submit</Buttonn>
      {/* )} */}
      
    </div>
  );
}

export default App;


