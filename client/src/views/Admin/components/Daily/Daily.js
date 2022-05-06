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

const Daily = props => {
	const [seletedFile, setSeletedFile] = useState(null);
	const [uploadStatus, setUploadStatus] = useState('');

	const handleFileUpload = e => {
		console.log(e.target.files[0]);
		setSeletedFile(e.target.files[0]);
	};

	const handleSubmit = e => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('image', seletedFile);
		fetch('/api/images', {method: 'POST', body: formData})
			.then(response => response.json())
			.then(data => {
				console.log(data);
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
				variant="h3"
			>
                更新每日图片
			</Typography>
			<form
				id="upload-image-form"
				onSubmit={handleSubmit}
				method="post"
			>

				<TextField
					id="upload-image"
					name="upload-image"
					label="Upload Image"
					type="file"
					inputProps={{accept: 'image/*'}}
					onChange={handleFileUpload}
				/>
				<Button
					type="submit"
					color="primary"
					size="large"
				>
					Upload Image
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

Daily.propTypes = {
	className: PropTypes.string
};

export default Daily;
