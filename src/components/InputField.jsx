import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';


function InputField({ label, placeholder, onChange, value, feedbackType, feedbackText }) {
    return (
        <>
            <Form.Label htmlFor={label}>{label}</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder={placeholder}
                    aria-label={label}
                    aria-describedby="basic-addon1"
                    onChange={onChange}
                    value={value}
                    isInvalid={feedbackType === 'invalid'}
                    isValid={feedbackType === 'valid'}
                />
                <Form.Control.Feedback type={feedbackType}>
                    {feedbackText}
                </Form.Control.Feedback>
            </InputGroup>
        </>
    );
}

export default InputField;
