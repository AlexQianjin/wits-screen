import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

const Birthday = props => {
	const { name, number, department } = props;
	let avatarPath = `./avatar/${number}.png`;
	return (
		<Card>
			<CardContent>
				<Grid container>
					<Grid
						item
						lg={6}
						sm={12}
						xl={6}
						xs={12}
					>
						<Avatar
							alt="avatar"
							src={avatarPath}
						></Avatar>
					</Grid>
					<Grid
						item
						lg={6}
						sm={12}
						xl={6}
						xs={12}
					>
						<Typography variant="h6">{name}</Typography>
						<Typography variant="h6">{department}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

Birthday.propTypes = {
	name: PropTypes.string,
	number: PropTypes.string,
	department: PropTypes.string
};

export default Birthday;
