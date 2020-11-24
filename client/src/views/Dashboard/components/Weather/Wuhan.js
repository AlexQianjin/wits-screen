import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, CircularProgress } from '@material-ui/core';

import useInterval from '../../../../helpers/useInterval';
import getWeatherIcon from '../../../../helpers/getWeatherIcon';

const Wuhan = () => {
	const [weather, setWeather] = useState(null);

	const getWeather = () => {
		fetch('https://www.tianqiapi.com/api/?appid=77869124&appsecret=cHVGz6Vx&version=v9&cityid=0&city=%E6%AD%A6%E6%B1%89&ip=0&callback=0', {
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

	useInterval(getWeather, 60 * 60 * 1000);

	return (
		<Card>
			{weather ?
				<CardContent style={{backgroundImage: 'url("./Images/img_bg_weather1.png")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
					<Grid item>
						<div style={{fontWeight: 'bold', fontSize: '24px'}}>
							{weather.city}
						</div>
					</Grid>
					<Grid container>
						<Grid
							item
							lg={4}
							sm={6}
							xl={6}
							xs={12}
						>
							<Grid container>
								<Grid
									item
									lg={6}
									sm={6}
									xl={6}
									xs={12}
								>
									{getWeatherIcon(weather.data[0].wea_img)}
								</Grid>
								<Grid
									item
									lg={6}
									sm={6}
									xl={6}
									xs={12}
								>
									<div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '60px', marginLeft: '-65px'}}>
										{weather.data[0].tem}
										<span style={{fontSize: '28px', display: 'inline-block', verticalAlign: 'top'}}>°C</span>
									</div>
								</Grid>
							</Grid>
							<Grid container>
								<Grid
									item
									lg={6}
									sm={6}
									xl={6}
									xs={12}
									style={{marginTop: '20px'}}
								>
									<Typography
										variant="h6"
										style={{fontWeight: 'bold', fontSize: '30px', textAlign: 'center', marginLeft: '-55px'}}
									>
										{weather.data[0].wea}
									</Typography>
								</Grid>
								<Grid
									item
									lg={6}
									sm={6}
									xl={6}
									xs={12}
								>
									<Grid
										container
									>
										<Grid
											item
											style={{marginLeft: '-55px'}}
										>
											<Typography variant="h6">{weather.data[0].tem2}~{weather.data[0].tem1}°C</Typography>
											<Typography variant="h6">空气质量</Typography>
										</Grid>
										<Grid
											item
											style={{marginLeft: '10px'}}
										>
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
									style={{textAlign: 'center'}}
								>
									<Typography variant="h6">{index === 0 ? '明天' : `${data.date.split('-')[1]}月${data.date.split('-')[2]}日`}</Typography>
									<Typography variant="h6">{getWeatherIcon(data.wea_img)}</Typography>
									<Typography variant="h6">{data.tem2}~{data.tem1}°C</Typography>
									<Typography variant="h6">{data.wea}</Typography>
									<Typography variant="h6">{data.win[0]}</Typography>
									<Typography variant="h6">{data.air_level}</Typography>
								</Grid>);
						})
						}
					</Grid>
				</CardContent> :
				<CircularProgress />}
		</Card>
	);
};

export default Wuhan;
