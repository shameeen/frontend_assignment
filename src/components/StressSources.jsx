import React from "react";
import { Form, OverlayTrigger } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';

const StressSources = ({ question, textAreaContent, handleTextareaChange, ValidationErrorSources }) => {
    const renderTextAreaTooltipp = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Knowing other work or nonwork drivers of stress may help your organization implementmpractices to counter these factors.
        </Tooltip>
      );
    

  return (
    <div className="sources-container">
      <div className="d-flex">
        <p>{question}</p>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTextAreaTooltipp}
        >
          <Button variant="success" className="info-button">i</Button>
        </OverlayTrigger>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"  >
        <Form.Label>Enter up to 250 characters here</Form.Label>
        <Form.Control as="textarea" rows={3} value={textAreaContent}
          onChange={handleTextareaChange} />
        <Form.Control.Feedback type="invalid">
          {ValidationErrorSources}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default StressSources;
