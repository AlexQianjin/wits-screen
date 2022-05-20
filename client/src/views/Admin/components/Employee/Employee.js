import React, { useState } from 'react';
import { TextField, Button, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

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
		color: '#000',
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

const Employee = props => {
	const [seletedFile, setSeletedFile] = useState(null);
	const [uploadStatus, setUploadStatus] = useState('');

	const handleFileUpload = e => {
		setSeletedFile(e.target.files[0]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(seletedFile);

		let formData = new FormData();
		formData.append('excel', seletedFile);
		fetch('/api/employees', {method: 'POST', body: formData})
			.then(response => response.json())
			.then(data => {
				if (data.status) {
					setUploadStatus('Update Successfully!');
				} else {
					setUploadStatus('Update Failed!');
				}
			})
			.catch(err => {
				console.log(err);
				setUploadStatus('Update Failed!');
			});
	};

	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}
		>
			<Typography
				className={classes.title}
				gutterBottom
				variant="h4"
			>
                更新员工信息
			</Typography>
			<form
				id="upload-excel-form"
				onSubmit={handleSubmit}
				method="post"
			>

				<TextField
					id="upload-excel"
					name="upload-excel"
					label="Upload Excel File"
					type="file"
					onChange={handleFileUpload}
				/>
				<Button
					type="submit"
					color="primary"
					size="large"
				>
                    Upload Excel File
				</Button>
			</form>
			<Typography
				className={classes.title}
				gutterBottom
				variant="h6"
			>
				{uploadStatus}
			</Typography>
		</Card>
	);
};

Employee.propTypes = {
	className: PropTypes.string
};

export default Employee;
