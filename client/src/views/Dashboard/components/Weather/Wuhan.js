import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

// import useInterval from '../../../../helpers/useInterval';

const Wuhan = () => {
	const [weather, setWeather] = useState(null);

	// useInterval(() => setWeather(new Date()), 60 * 1000);

	const getWeather = () => {
		fetch('https://www.tianqiapi.com/api/?appid=23035354&appsecret=8YvlPNrz&version=v9&cityid=0&city=%E6%AD%A6%E6%B1%89&ip=0&callback=0', {
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
	}, []);

	return (
		<div>{weather ?
			<Card>
				<CardContent>
					<Grid item>{weather.city}</Grid>
					<Grid container>
						<Grid
							item
							lg={6}
							sm={6}
							xl={6}
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
						{weather.data.slice(1, 4).map((data, index) => {
							return (
								<Grid
									item
									lg={2}
									sm={6}
									xl={2}
									xs={12}
									key={index}
								>
									<Typography variant="h6">{data.day.split('（')[0]}</Typography>
									<Typography variant="h6">天气图片</Typography>
									<Typography variant="h6">{data.tem2}~{data.tem1}°C</Typography>
									<Typography variant="h6">{data.win[0]}</Typography>
									<Typography variant="h6">{data.air_level}</Typography>
								</Grid>);
						})
						}

						{/* <Grid
							item
							lg={2}
							sm={6}
							xl={2}
							xs={12}
						>
							<Typography variant="h6">WistronITS</Typography>
						</Grid>
						<Grid
							item
							lg={2}
							sm={6}
							xl={2}
							xs={12}
						>
							<Typography variant="h6">WistronITS</Typography>
						</Grid> */}
					</Grid>
				</CardContent>
			</Card> :
			<div>Loading...</div>}
		</div>
	);
};

export default Wuhan;
