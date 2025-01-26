import React from "react";
import styles from "./Display.module.css"
const Display = ({input, result}) => {
	return (
		<div className={styles.display}>
			<p>{input || '0'}</p>
			<h1>{result}</h1>
		</div>
	)
}

export default Display;