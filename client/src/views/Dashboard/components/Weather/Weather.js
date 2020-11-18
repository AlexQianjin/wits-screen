import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

import Wuhan from './Wuhan';
import OtherCity from './OtherCity';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		backgroundColor: theme.palette.success.main,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center'
	},
	differenceIcon: {
		color: theme.palette.success.dark
	},
	differenceValue: {
		color: theme.palette.success.dark,
		marginRight: theme.spacing(1)
	}
}));

const Weather = props => {
	const { className, ...rest } = props;
	const cities = ['北京', '台北'];

	const classes = useStyles();

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardContent>
				<Grid
					container
					justify="space-between"
				>
					<Grid item>
						<Typography
							className={classes.title}
							gutterBottom
							variant="h3"
						>
							天气预报
						</Typography>
					</Grid>
				</Grid>
				<Grid>
					<Wuhan/>
				</Grid>
				<Grid
					container
					justify="space-between"
				>
					{cities.map((city, index) => {return (
						<Grid
							key={index}
							item
							lg={6}
							sm={6}
							xl={6}
							xs={12}
						>
							<OtherCity
								city={city}
							/>
						</Grid>
					);})}
				</Grid>
			</CardContent>
		</Card>
	);
};

Weather.propTypes = {
	className: PropTypes.string
};

export default Weather;
