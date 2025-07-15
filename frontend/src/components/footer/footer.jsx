import { useEffect, useState } from 'react';

import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Sofia&units=metric&lang=en&appid=06e17739698d373d9a642ad3ef448f71',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Blog for web-developer's</div>
				<div>universal.frontend.technologies@gmail.com</div>
			</div>
			<div>
				<div>
					{city} ,{' '}
					{new Date().toLocaleDateString('en', {
						day: 'numeric',
						month: 'long',
					})}
				</div>
				<div>
					{temperature} degree ,{weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	padding: 20px 40px;
	font-weight: bold;
	background-color: #fff;
	box-shadow: 0px 2px 17px #000;
`;
