import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/src/index.js';
import { AuthFormError, Button, H2, Input } from '../../components/index.js';
import { useResetForm } from '../../hooks/index.js';
import { useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../actions/index.js';
import { selectUserRole } from '../../selectors/index.js';
import { ROLE } from '../../constants/index.js';
import { request } from '../../utils/index.js';


const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Login is required')
		.matches(/^\w+$/, 'Incorrect login.Only characters and numbers required')
		.min(3, 'Incorrect login.Min 3 symbols')
		.max(15, 'Incorrect login.Max 15 symbols'),
	password: yup
		.string()
		.required('Password is required')
		.matches(
			/^[\w#%]+$/,
			'Incorrect password.Only characters , numbers, # and % required',
		)
		.min(6, 'Incorrect password.Min 6 symbols')
		.max(30, 'Incorrect password.Max 30 symbols'),
	passcheck: yup
		.string()
		.required('Repeat password is required')
		.oneOf([yup.ref('password'), null], 'Repeat passwords must match'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register','POST',{login, password}).then(({ error, user }) => {
			if (error) {
				setServerError(`Error from response: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={className}>
			<H2>Registration</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Check password..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Register
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};
export const Registration = styled(RegistrationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
