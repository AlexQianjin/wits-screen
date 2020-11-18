import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
	DateTime,
	Weather,
	BirthdayBoard,
	Daily
} from './components';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(0)
	}
}));

const Dashboard = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={0}
				style={{minHeight: '100vh'}}
			>
				<Grid
					item
					lg={2}
					sm={6}
					xl={2}
					xs={12}
				>
					<DateTime />
				</Grid>
				<Grid
					item
					lg={4}
					sm={6}
					xl={4}
					xs={12}
				>
					<Weather />
				</Grid>
				<Grid
					item
					lg={2}
					sm={6}
					xl={2}
					xs={12}
				>
					<BirthdayBoard />
				</Grid>
				<Grid
					item
					lg={4}
					sm={6}
					xl={4}
					xs={12}
				>
					<Daily />
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
