import React from "react";
import styles from "./Button.module.css"

const Button = ({value, onClick, className}) => {
	return (
		<button className={className} onClick={() => onClick(value)}>{value}</button>
	)
}

export default Button;