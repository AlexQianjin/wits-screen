import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';

import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 45,
			height: 'calc(100% - 45px)'
		}
	},
	root: {
		backgroundColor: '#202020',
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	nav: {
		marginBottom: theme.spacing(2)
	},
	title: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '12px',
		marginBottom: '12px',
		paddingLeft: '15px',
		fontSize: '16px',
		color: '#FAFAFA'
	},
	titleIcon: {
		color: '#FAFAFA',
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(1)
	}
}));

const Sidebar = props => {
	const { open, variant, onClose, className, ...rest } = props;

	const classes = useStyles();

	const pages = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <DashboardIcon />
		},
		{
			title: 'Tenant',
			href: '/tenant',
			icon: <AssignmentRoundedIcon />
		},
		{
			title: 'Account',
			href: '/account',
			icon: <AccountBoxIcon />
		},
		{
			title: 'Employee',
			href: '/employee',
			icon: <PeopleIcon />
		},
		{
			title: 'Group',
			href: '/group',
			icon: <GroupWorkIcon />
		}
	];

	return (
		<Drawer
			anchor="left"
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div
				{...rest}
				className={clsx(classes.root, className)}
			>
				<div className={classes.title}>
					<ViewHeadlineIcon className={classes.titleIcon} />
					<span>ORGNAZATION</span>
				</div>
				<Divider light />
				<SidebarNav
					className={classes.nav}
					pages={pages}
				/>
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
};

export default Sidebar;
