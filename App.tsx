import React, { useState, useEffect } from 'react';

import { View, CameraRoll } from 'react-native';

import Constants from 'expo-constants';

import { Provider } from 'react-native-paper';

import styled from 'styled-components';

import { PhotosView } from './Components/Views/PhotosView';
import { PhotoNotes } from './Components/Views/PhotoNotes';
import { Loading } from './Components/Views/Loading';

import { FilterAndSort, StringArrayIsEqual } from './Util';

const App = () => {
	const [route, setRoute] = useState('PhotosView');

	const [photos, setPhotos] = useState<PhotosByDate[]>([]);

	const [uri, setURI] = useState('');

	const [loading, setLoading] = useState(true);

	const changeRoute = (route: string, u?: string) => {
		setRoute(route);
		setURI(u);
	};

	const loadPhotos = async () => {
		try {
			var fetched = await CameraRoll.getPhotos({
				first: 20,
				assetType: 'Photos'
			});
		} catch (e) {
			throw new Error(e);
		}
		setLoading(false);

		const mapped = fetched.edges.map(p => ({
			uri: p.node.image.uri,
			date: Math.round(p.node.timestamp) * 1000
		}));

		const filtered = FilterAndSort(mapped);

		setPhotos(
			filtered.filter(
				(p, i) =>
					filtered.findIndex(
						x => JSON.stringify(x.data) === JSON.stringify(p.data)
					) === i
			)
		);
	};

	useEffect(() => {
		loadPhotos();
	}, []);

	return (
		<>
			<MainView>
				<Provider>
					{route === 'PhotosView' ? (
						loading ? (
							<Loading />
						) : (
							<PhotosView
								changeRoute={changeRoute}
								photos={photos}
							/>
						)
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

const CenteredView = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

type PhotosByDate = { section: { date: string }; data: string[] };

type PhotoFromFetch = { uri: string; date: number };

export default App;

export { MainView, PhotosByDate, PhotoFromFetch, CenteredView };
