import React from 'react';
import Button from 'react-bootstrap/Button';




export default function Performance({ question, handleWorkLifeBalance, formData }) {

    return (

        <div className="performance">
            <p>{question}</p>

            {formData.questions?.[4]?.options?.map((workLifeBalance, index) => {

                return <div key={index}>

                    <Button variant="primary" onClick={handleWorkLifeBalance} value={workLifeBalance}> <span className="optionsLabel">
                        {String.fromCharCode(97 + index)}
                    </span>
                        {workLifeBalance}</Button> </div>
            })
            }

        </div>

    )

}