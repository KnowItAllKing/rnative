import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

import Constants from 'expo-constants';

import { Provider } from 'react-native-paper';

import styled from 'styled-components';

import { PhotoView } from './Components/PhotoView';

const App = () => (
	<>
		<MainView>
			<Provider>
				<PhotoView />
			</Provider>
		</MainView>
	</>
);

const MainView = styled(View)`
	margin-top: ${Constants.statusBarHeight};
	flex: -1;
	background-color: #fff;
`;

export default App;

export { MainView, Constants };
