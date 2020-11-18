import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
	root: {
		borderRadius: '4px',
		alignItems: 'center',
		padding: theme.spacing(1),
		display: 'flex'
	},
	icon: {
		marginRight: theme.spacing(1),
		color: theme.palette.text.secondary
	},
	input: {
		flexGrow: 1,
		fontSize: '14px',
		lineHeight: '16px',
		letterSpacing: '-0.05px'
	}
}));

const SearchInput = props => {
	const { className, onChange, style, ...rest } = props;

	const classes = useStyles();
	const [timeoutId, setTimeoutId] = useState(null);

	const clearTimeOut = () => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
	};

	const handleChange = e => {
		clearTimeOut();
		e.persist();
		const newTimeoutId = setTimeout(() => {
			onChange(e);
		}, 200);
		setTimeoutId(newTimeoutId);
	};

	return (
		<Paper
			{...rest}
			className={clsx(classes.root, className)}
			style={style}
		>
			<SearchIcon className={classes.icon} />
			<Input
				{...rest}
				className={classes.input}
				disableUnderline
				onChange={handleChange}
			/>
		</Paper>
	);
};

SearchInput.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	style: PropTypes.object
};

export default SearchInput;
