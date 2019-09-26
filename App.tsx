import React, { useState, useEffect } from 'react';

import { View } from 'react-native';

import Constants from 'expo-constants';

import { Provider } from 'react-native-paper';

import styled from 'styled-components';

import { PhotosView } from './Components/Views/PhotosView';
import { PhotoNotes } from './Components/Views/PhotoNotes';

const App = () => {
	const [route, setRoute] = useState('PhotosView');

	const [uri, setURI] = useState('');

	const changeRoute = (route: string, u?: string) => {
		setRoute(route);
		setURI(u);
	};

	return (
		<>
			<MainView>
				<Provider>
					{route === 'PhotosView' ? (
						<PhotosView changeRoute={changeRoute} />
					) : (
						<PhotoNotes uri={uri} changeRoute={changeRoute} />
					)}
				</Provider>
			</MainView>
		</>
	);
};

const MainView = styled(View)`
	margin-top: ${Constants.statusBarHeight};
	flex: -1;
	background-color: #fff;
`;

export default App;

export { MainView, Constants };
