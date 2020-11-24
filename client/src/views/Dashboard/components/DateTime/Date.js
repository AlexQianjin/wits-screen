import React, { useState } from 'react';
import { Card } from '@material-ui/core';

import useInterval from '../../../../helpers/useInterval';

const DateString = () => {
	const [date, setDate] = useState(new Date());

	useInterval(() => setDate(new Date()), 60 * 1000);

	return (
		<div style={{textAlign: 'left', fontWeight: 'bold', fontSize: '30px', marginTop: '100px'}}>
			<Card>{date.toLocaleDateString()}</Card>
			<Card>{['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()]}</Card>
		</div>
	);
};

export default DateString;
