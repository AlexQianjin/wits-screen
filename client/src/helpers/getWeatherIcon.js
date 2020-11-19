import React from 'react';
import { Clear, Cloudy, Foggy, LittleRain, Showers, Snow, TorrentialRain } from '../icons';

function getWeatherIconByName(name) {
	// xue,lei,shachen,wu,bingbao,yun,yu,yin,qing
	let icon = '';
	switch (name) {
	case 'qing':
		icon = <Clear />;
		break;
	case 'yun':
		icon = <Cloudy />;
		break;
	case 'wu':
		icon = <Foggy />;
		break;
	case 'yu':
		icon = <LittleRain />;
		break;
	case 'lei':
		icon = <Showers />;
		break;
	case 'xue':
		icon = <Snow />;
		break;
	case 'bingbao':
		icon = <TorrentialRain />;
		break;
	default:
		icon = <Clear />;
		break;
	}

	return icon;
}

export default getWeatherIconByName;
