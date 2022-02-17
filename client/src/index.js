import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
	theme: {
		primary: '#FFE5D9',
		secondary: '#FCD5CE',
		background: '#ECE4DB',
		paper: '#F8EDEB',
	},
	font: {
		color: 'black',
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
