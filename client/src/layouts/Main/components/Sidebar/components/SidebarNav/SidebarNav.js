/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		paddingTop: 0
	},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	button: {
		padding: '10px 8px',
		paddingLeft: '15px',
		color: '#FAFAFA',
		fontSize: '15px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		fontWeight: theme.typography.fontWeightMedium,
		borderRadius: '0px',
		'&:hover&$active': {
			backgroundColor: '#106EBE'
		}
	},
	icon: {
		color: '#FAFAFA',
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(1)
	},
	active: {
		color: '#FAFAFA',
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: '#106EBE'
	}
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style={{ flexGrow: 1 }}
	>
		<RouterLink {...props} />
	</div>
));

const SidebarNav = props => {
	const { pages, className, ...rest } = props;

	const classes = useStyles();

	return (
		<List
			{...rest}
			className={clsx(classes.root, className)}
		>
			{pages.map(page => (
				<ListItem
					className={classes.item}
					disableGutters
					key={page.title}
				>
					<Button
						activeClassName={classes.active}
						className={clsx(classes.button)}
						component={CustomRouterLink}
						to={page.href}
					>
						<div className={classes.icon}>{page.icon}</div>
						{page.title}
					</Button>
				</ListItem>
			))}
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SidebarNav;
