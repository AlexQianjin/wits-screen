import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';

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

const Daily = props => {
	const { className, ...rest } = props;

	const classes = useStyles();
	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<CardContent style={{paddingBottom: '0px'}}>
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
							每日推荐
						</Typography>
					</Grid>
					<Grid item>
						<div style={{width: '480px', height: '61px', marginTop: '30px', marginRight: '5px', backgroundImage: 'url("./images/img_rightblock.png")'}}></div>
					</Grid>
				</Grid>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="540"
					image="./recommanded-image.png"
					title="Contemplative Reptile"
					style={{marginTop: '50px'}}
				>
				</CardMedia>
			</CardContent>
		</Card>
	);
};

Daily.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string
};

export default Daily;
