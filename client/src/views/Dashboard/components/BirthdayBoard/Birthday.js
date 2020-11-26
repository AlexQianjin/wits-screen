import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

const Birthday = props => {
	const { name, gender, department } = props;
	let avatarPath = `./images/${gender === '男' ? 'male' : 'female'}1.png`;
	return (
		<Card style={{width: '302px', height: '121px', marginBottom: '56px', backgroundImage: 'url("./images/img_bg_people.png")'}}>
			<CardContent>
				<Grid container>
					<Grid
						item
						lg={6}
						sm={12}
						xl={6}
						xs={12}
					>
						<div style={{width: '67px', height: '67px', marginTop: '16px', marginLeft: '16px', backgroundImage: 'url("./images/img_peopleblock.png")', backgroundRepeat: 'no-repeat'}}>
							<Avatar
								alt="avatar"
								src={avatarPath}
								style={{width: '67px', height: '67px'}}
							></Avatar>
						</div>
					</Grid>
					<Grid
						item
						lg={6}
						sm={12}
						xl={6}
						xs={12}
						style={{marginLeft: '-30px'}}
					>
						<Typography
							variant="h6"
							style={{fontWeight: 'bold', fontSize: '28px', marginTop: '30px'}}
						>
							{name}
						</Typography>
						<Typography
							variant="h6"
							style={{fontSize: '18px', marginTop: '10px'}}
						>
							{department}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

Birthday.propTypes = {
	name: PropTypes.string,
	gender: PropTypes.string,
	department: PropTypes.string
};

export default Birthday;
