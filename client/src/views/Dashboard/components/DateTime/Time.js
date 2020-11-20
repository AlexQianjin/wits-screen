import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';

import useInterval from '../../../../helpers/useInterval';

const Time = () => {
	const [date, setDate] = useState(new Date());

	useInterval(() => setDate(new Date()), 1000);

	return (
		<Card>
			<Typography
				variant="h3"
				style={{fontWeight: '700'}}
			>
				{date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false})}
			</Typography>
		</Card>
	);
};

export default Time;
