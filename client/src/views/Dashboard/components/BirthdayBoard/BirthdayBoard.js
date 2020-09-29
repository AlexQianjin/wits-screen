import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, CircularProgress } from '@material-ui/core';

import Birthday from './Birthday';

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
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	},
	progress: {
		marginTop: theme.spacing(3)
	}
}));

const BirthdayBoard = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	const [employees, setEmployees] = useState([]);

	const getEmployees = () => {
		console.log('fetch employees');
		fetch('/api/employees')
			.then(response => {
				return response.json();
			})
			.then(json => {
				console.log(json);
				setEmployees(json.result);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(getEmployees, []);

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			{employees.length > 0 ?
				<CardContent>
					<Grid
						container
						justify="space-between"
					>
						<Grid item>
							<Typography
								className={classes.title}
								color="textSecondary"
								gutterBottom
								variant="h3"
							>
							今日寿星
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						justify="space-between"
					>
						{employees.slice(1).map((e, index) => {
							return (
								<Grid
									key={index}
									item
								>
									<Birthday
										name={e[0]}
										department={e[1]}
									>
									</Birthday>
								</Grid>
							);
						})}
					</Grid>
				</CardContent> :
				<CircularProgress />}
		</Card>
	);
};

BirthdayBoard.propTypes = {
	className: PropTypes.string
};

export default BirthdayBoard;
