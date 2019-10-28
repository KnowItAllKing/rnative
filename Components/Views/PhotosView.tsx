import React from 'react';
import { View, FlatList } from 'react-native';

import { Text, Title, Divider } from 'react-native-paper';

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
				<ShadedView>
					<Txt>{item.section.date}</Txt>
					<CenteredView
						style={{
							alignItems:
								item.data.length >= 4 ? 'center' : 'flex-start'
						}}>
						<PhotoRow
							photos={item.data}
							changeRoute={changeRoute}
						/>
					</CenteredView>
					<Div />
				</ShadedView>
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
	flex: 0;
	justify-content: center;
`;

const ShadedView = styled(View)``;

const Div = styled(Divider)`
	height: 1px;
	margin-top: 10px;
`;

export { PhotosView };
