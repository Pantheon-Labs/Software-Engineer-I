import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
	theme: {
		primary: '#E5E5E5',
		secondary: '#E5E5E5',
		background: '#FFFFFF',
		paper: '#F8EDEB',
		selected: '#e85d04',
	},
	font: {
		color: '000',
	},
};

const theme = extendTheme({ colors });

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<App />
	</ChakraProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
