import React, { useState, useEffect } from 'react';

import { Dimensions, SectionList, CameraRoll, Image } from 'react-native';

import { Surface as DefaultSurface, Text } from 'react-native-paper';

import styled from 'styled-components';

import { FilterAndSort, OneLevel } from '../Util';

const PhotoView = () => {
	const [photos, setPhotos] = useState<PhotosByDate[]>([]);

	const loadPhotos = async () => {
		const fetched = await CameraRoll.getPhotos({
			first: 20,
			assetType: 'Photos',
			groupTypes: 'All'
		});

		const mapped = fetched.edges.map(p => ({
			uri: p.node.image.uri,
			date: Math.round(p.node.timestamp) * 1000
		}));

		const filtered = FilterAndSort(mapped);

		setPhotos(
			filtered.filter(
				(p, i) =>
					filtered
						.map(x => JSON.stringify(x))
						.findIndex(x => x === JSON.stringify(p)) === i
			)
		);
	};

	useEffect(() => {
		loadPhotos();
	}, []);

	return (
		<>
			<Section
				sections={photos}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item }) => (
					<Surface>
						<Img source={{ uri: item }} />
					</Surface>
				)}
				renderSectionHeader={({ section: { section } }) => (
					<Txt>{section.date}</Txt>
				)}
				stickySectionHeadersEnabled={false}
			/>
		</>
	);
};

const { width } = Dimensions.get('window');

const Section = styled(SectionList)`
	padding-top: 0;
	margin-top: 0;
`;

const Txt = styled(Text)`
	font-size: 20px;
	align-self: center;
	padding: 10px;
`;

const Img = styled(Image)`
	align-self: center;
	height: ${width - 50}px;
	width: ${width - 50}px;
`;

const Surface = styled(DefaultSurface)`
	padding: 8px;
	height: ${width - 25}px;
	width: ${width - 25}px;
	align-self: center;
	align-items: center;
	justify-content: center;
	elevation: 4;
`;

type PhotosByDate = { section: { date: string }; data: string[] };

type PhotoFromFetch = { uri: string; date: number };

export { PhotoView, PhotosByDate, PhotoFromFetch };
