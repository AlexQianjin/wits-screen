import React, { useState } from 'react';
import { Card } from '@material-ui/core';

import useInterval from '../../../../helpers/useInterval';

const Time = () => {
	const [date, setDate] = useState(new Date());

	useInterval(() => setDate(new Date()), 1000);

	return (
		<Card style={{marginTop: '-100px'}}>
			<div style={{fontWeight: 'bold', fontSize: '110px', fontFamily: '"BigruixianBlackGBV1.0"'}}>
				{date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false})}
			</div>
		</Card>
	);
};

export default Time;
