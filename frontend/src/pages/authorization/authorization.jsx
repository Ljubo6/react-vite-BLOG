import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/src/index.js';
import { AuthFormError, Button, H2, Input } from '../../components/index.js';
import { useState } from 'react';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../actions/index.js';
import { selectUserRole } from '../../selectors/index.js';
import { ROLE } from '../../constants/index.js';
import { useResetForm } from '../../hooks/index.js';
import { request } from '../../utils/index.js';

const authFormSchema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login','POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Error from response: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"></Navigate>;
	}

	return (
		<div className={className}>
			<H2>Authorization</H2>
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
				<Button type="submit" disabled={!!formError}>
					Authorize
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">Register</StyledLink>
			</form>
		</div>
	);
};
export const Authorization = styled(AuthorizationContainer)`
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
