import React from 'react';
import Button from 'react-bootstrap/Button';



export default function Buttonn({ variant = "", onClick, value = "", className = "", disabled = "", children }) {

    return (

        <Button className={`btn btn-${variant} ${className}`}  disabled={disabled} onClick={onClick} value={value}>{children}</Button>


    )

}