import React from 'react';
import { View, FlatList } from 'react-native';

import { Text, Title } from 'react-native-paper';

import styled from 'styled-components';

import { PhotoRow } from '../Photo/Row';

const PhotosView = ({
	changeRoute,
	photos
}: {
	changeRoute: any;
	photos: any[];
}) => (
	<>
		<CenteredView>
			<Title>Photos</Title>
		</CenteredView>
		<FlatPhotos
			data={photos}
			renderItem={({ item }: any) => (
				<>
					<Txt>{item.section.date}</Txt>
					<PhotoRow photos={item.data} changeRoute={changeRoute} />
				</>
			)}
			keyExtractor={(_, i) => i.toString()}
		/>
	</>
);

const FlatPhotos = styled(FlatList)`
	padding-top: 0;
	margin-top: 0;
`;

const Txt = styled(Text)`
	font-size: 20px;
	align-self: center;
	padding: 10px;
`;

const CenteredView = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export { PhotosView };
