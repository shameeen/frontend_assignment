import Buttonn from "./Button";

function Rating({ formData, question, variant, onClick }) {




  return (
    <div className="rating">
      <p>{question}</p>

      <p>The usual performance of most other workers in a job similar to yours</p>

      <div>
        <div className="button-row">
          {formData.questions?.[2]?.options?.slice(0, 5).map((rate, index) => (
            <Buttonn key={index} variant={variant} onClick={onClick} value={rate}>
              {rate}
            </Buttonn>
          ))}
        </div>
        <div className="button-row">
          {formData.questions?.[2]?.options?.slice(5).map((rate, index) => (
            <Buttonn key={index} variant={variant} onClick={onClick} value={rate}>
              {rate}
            </Buttonn>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rating;
