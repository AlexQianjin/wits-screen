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
		fontWeight: 700,
		marginTop: '16px'
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
	const [isLoading, setLoading] = useState(true);

	const getEmployees = () => {
		console.log('fetch employees');
		fetch('/api/employees')
			.then(response => {
				return response.json();
			})
			.then(json => {
				console.log(json);
				setLoading(false);
				setEmployees(json.result);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(getEmployees, []);

	const render = (isLoading, employees) => {
		if (isLoading) {
			return <CircularProgress />;
		}

		if (employees.length === 0) {
			return (
				<div style={{marginTop: '50px', fontWeight: 'bold', fontSize: '36px'}}>今日无寿星</div>
			);
		}

		return (
			<Grid
				container
				justify="space-between"
				style={{marginTop: '50px'}}
			>
				{employees.map((e, index) => {
					if (index > 5) {
						return '';
					}

					return (
						<Grid
							key={index}
							item
						>
							<Birthday
								name={e[1]}
								gender={e[5]}
								department={e[2]}
							>
							</Birthday>
						</Grid>
					);
				})}
			</Grid>
		);
	};

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
						<div style={{width: '48px', height: '8px', marginTop: '26px', backgroundColor: '#ef3246'}}></div>
						<Typography
							className={classes.title}
							gutterBottom
							variant="h3"
						>
							今日寿星
						</Typography>
					</Grid>
				</Grid>
				{render(isLoading, employees)}
			</CardContent>
		</Card>
	);
};

BirthdayBoard.propTypes = {
	className: PropTypes.string
};

export default BirthdayBoard;
