import React, {useState} from "react";
import styles from "./Calculator.module.css"
import Display from "../display/Display";
import Button from "../button/Button";

const Calculator = () => {
	const [input, setInput] = useState("");
	const [result, setResult] = useState(0);

	const handleClick = (value) => {
		setInput((prev) => prev + value);
	}

	const calculate = () => {
		try {
			const operators = {
				"+": (a, b) => a + b,
				"-": (a, b) => a - b,
				"*": (a, b) => a * b,
				"/": (a, b) => a / b,
			};

			const tokens = input.split(/([+*/()-])/).filter(Boolean).map((t) => t.trim());
			const values = [];
			const ops = [];

			const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

			const applyOperator = () => {
				const b = values.pop();
				const a = values.pop();
				const op = ops.pop();
				values.push(operators[op](a, b));
			};

			tokens.forEach((token) => {
				if (!isNaN(token)) {
					values.push(Number(token));
				} else if (token in operators) {
					while (
						ops.length &&
						precedence[ops[ops.length - 1]] >= precedence[token]
						) {
						applyOperator();
					}
					ops.push(token);
				}
			});

			while (ops.length) {
				applyOperator();
			}
			setResult(values[0]);
		} catch (error) {
			alert('помилка у введені')
		}
	}

	const clear = () => {
		setInput("");
		setResult(0);
	}

	const actionsButtons = ["+", "-", "*", "/", "="]
	const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

	return (
		<div className={styles.calculator}>
			<Display input={input} result={result}/>
			<div className={styles.firstContainer}>
				<div>
					<div className={styles.numbers}>
						<div></div>
						<div></div>
						<Button className={styles.first_type_button} value={'C'} onClick={clear}/>
						{numberButtons.map((btn) => (
							<Button className={styles.first_type_button} key={btn} value={btn} onClick={() => handleClick(btn)} />
						))}
						<div></div>
						<Button className={styles.first_type_button} value={'.'} onClick={() => handleClick('.')} />
						<Button className={styles.first_type_button} value={'0'} onClick={() => handleClick('0')}/>
					</div>
				</div>
				<div className={styles.actions}>
					{actionsButtons.map((btn) => (
						<Button
							className={styles.second_type_button}
							key={btn}
							value={btn}
							onClick={() => btn === '=' ? calculate() : handleClick(btn)} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Calculator;