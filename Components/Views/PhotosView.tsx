import React, { useState, useEffect } from 'react';
import { FlatList, CameraRoll } from 'react-native';

import { Text } from 'react-native-paper';

import styled from 'styled-components';

import { PhotoRow } from '../Photo/Row';

import { FilterAndSort } from '../../Util';

const PhotosView = ({ changeRoute }: any) => {
	const [photos, setPhotos] = useState<PhotosByDate[]>([]);

	// const [rows, setRows] = useState<P>([])

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
			<FlatPhotos
				data={photos}
				renderItem={({ item }: any) => (
					<>
						<Txt>{item.section.date}</Txt>
						<PhotoRow
							photos={item.data}
							changeRoute={changeRoute}
						/>
					</>
				)}
				keyExtractor={(_, i) => i.toString()}
			/>
		</>
	);
};

const FlatPhotos = styled(FlatList)`
	padding-top: 0;
	margin-top: 0;
`;

const Txt = styled(Text)`
	font-size: 20px;
	align-self: center;
	padding: 10px;
`;

type PhotosByDate = { section: { date: string }; data: string[] };

type PhotoFromFetch = { uri: string; date: number };

export { PhotosView, PhotosByDate, PhotoFromFetch };
