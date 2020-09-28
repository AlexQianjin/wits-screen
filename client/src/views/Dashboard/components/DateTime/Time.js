import React, { useState } from 'react';
import { Card } from '@material-ui/core';

import useInterval from '../../../../helpers/useInterval';

const Time = () => {
	const [date, setDate] = useState(new Date());

	useInterval(() => setDate(new Date()), 1000);

	return (
		<Card>{date.toLocaleTimeString()}</Card>
	);
};

export default Time;
