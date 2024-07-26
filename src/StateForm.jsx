import { useMemo, useState } from "react";
import { checkEmail, checkPassword } from "./util/validators.js";
export function StateForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

	const emailErrors = useMemo(() => {
		return isAfterFirstSubmit ? checkEmail(email) : [];
	}, [isAfterFirstSubmit, email]);

	const passwordErrors = useMemo(() => {
		return isAfterFirstSubmit ? checkPassword(password) : [];
	}, [isAfterFirstSubmit, password]);

	function onSubmit(e) {
		e.preventDefault();
		setIsAfterFirstSubmit(true);

		const emailResults = checkEmail(email);
		const passwordResults = checkPassword(password);

		if (emailResults.length === 0 && passwordResults.length === 0) {
			alert("Success");
		}
	}

	return (
		<form onSubmit={onSubmit} className='form'>
			<p>
				The validation error messages show up after you submit the form. <br />
				AFTER THE FIRST SUBMIT: The validation error messages will automatically
				update (or vanish) as you change the value in each input but only after
				the first time you submit the form.
			</p>
			<div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
				<label className='label' htmlFor='email'>
					Email
				</label>
				<span>required and must end in &apos;@test.com&apos;</span>
				<input
					className='input'
					type='email'
					id='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				{emailErrors.length > 0 && (
					<div className='msg'>{emailErrors.join(". ")}</div>
				)}
			</div>
			<div className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}>
				<label className='label' htmlFor='password'>
					Password
				</label>
				<span>
					Must be at least 10 chars or longer and contain: <br />a lowercase
					letter, an uppercase letter, and a digit.
				</span>
				<input
					className='input'
					type='password'
					id='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{passwordErrors.length > 0 && (
					<div className='msg'>{passwordErrors.join(". ")}</div>
				)}
			</div>
			<button className='btn' type='submit'>
				Submit
			</button>
		</form>
	);
}
