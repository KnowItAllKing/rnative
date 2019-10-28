import React from 'react';

import { Dimensions, FlatList, Image, TouchableHighlight } from 'react-native';

import { Surface as DefaultSurface } from 'react-native-paper';

import styled from 'styled-components';

const PhotoRow = ({
	photos,
	changeRoute
}: {
	photos: string[];
	changeRoute: any;
}) => (
	<>
		<List
			horizontal
			data={photos.map(uri => ({ uri }))}
			renderItem={({ item }: any) => (
				<Surface>
					<TouchableHighlight
						onPress={() => changeRoute('PhotoNotes', item.uri)}>
						<Img source={{ uri: item.uri }} />
					</TouchableHighlight>
				</Surface>
			)}
			keyExtractor={(_, i) => i.toString()}
		/>
	</>
);

const { width } = Dimensions.get('screen');

const target = width / 4 - 5;

const List = styled(FlatList)`
	padding: 5px;
	margin-top: 0;
`;

const Img = styled(Image)`
	align-self: center;
	height: ${target - 5}px;
	width: ${target - 5}px;
`;

const Surface = styled(DefaultSurface)`
	padding: 8px;
	height: ${target}px;
	width: ${target}px;
	align-self: center;
	align-items: center;
	justify-content: center;
	elevation: 4;
`;
export { PhotoRow };
