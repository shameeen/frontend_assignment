import React from 'react';
import Form from 'react-bootstrap/Form';





export default function SelectInput({ handleTitleChange, title, formData, Heading }) {

  return (

    <div className="title">
      <h4>{Heading}</h4>
      <Form.Select aria-label="Default select example" onChange={handleTitleChange} value={title}>
        <option value="Select">Select</option>
        {formData?.questions?.[0]?.options?.map((title, index) => {

          return <option key={index} value={title}>{title}</option>
        })}
      </Form.Select>

    </div>

  )

}