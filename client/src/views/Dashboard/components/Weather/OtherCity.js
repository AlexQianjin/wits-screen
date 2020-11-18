import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, CircularProgress } from '@material-ui/core';

import useInterval from '../../../../helpers/useInterval';

const OtherCity = props => {
	const url = `https://www.tianqiapi.com/api/?appid=77869124&appsecret=cHVGz6Vx&version=v9&cityid=0&city=${encodeURI(props.city)}&ip=0&callback=0`;
	const [weather, setWeather] = useState(null);

	const getWeather = () => {
		fetch(url, {
			'headers': {
				'accept': '*/*',
				'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
				'content-type': 'application/x-www-form-urlencoded',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'cross-site'
			},
			'referrer': 'http://doc.tianqiapi.com/603579',
			'referrerPolicy': 'no-referrer-when-downgrade',
			'body': null,
			'method': 'GET',
			'mode': 'cors',
			'credentials': 'omit'
		}).then(response => {
			return response.json();
		}).then(json => {
			console.log(json);
			setWeather(json);
		});
	};

	useEffect(() => {
		getWeather();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useInterval(getWeather, 60 * 60 * 1000);

	return (
		<Card>
			{weather ?
				<CardContent>
					<Grid item>{weather.city}</Grid>
					<Grid container>
						<Grid
							item
							lg={12}
							sm={12}
							xl={12}
							xs={12}
						>
							<Grid container>
								<Grid
									item
									lg={4}
									sm={6}
									xl={4}
									xs={12}
								>
									<Typography variant="h6">天气图片</Typography>
								</Grid>
								<Grid
									item
									lg={8}
									sm={6}
									xl={8}
									xs={12}
								>
									<Typography variant="h6">{weather.data[0].tem}°C</Typography>
								</Grid>
							</Grid>
							<Grid container>
								<Grid
									item
									lg={4}
									sm={6}
									xl={4}
									xs={12}
								>
									<Typography variant="h6">{weather.data[0].wea}</Typography>
								</Grid>
								<Grid
									item
									lg={8}
									sm={6}
									xl={8}
									xs={12}
								>
									<Grid
										container
									>
										<Grid item>
											<Typography variant="h6">{weather.data[0].tem2}~{weather.data[0].tem1}°C</Typography>
											<Typography variant="h6">空气质量</Typography>
										</Grid>
										<Grid item>
											<Typography variant="h6">{weather.data[0].win[0]}{weather.data[0].win_speed}</Typography>
											<Typography variant="h6">{weather.data[0].air}{weather.data[0].air_level}</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardContent> :
				<CircularProgress />}
		</Card>
	);
};

OtherCity.propTypes = {
	city: PropTypes.string
};

export default OtherCity;
