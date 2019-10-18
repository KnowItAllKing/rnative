import React, { useState, useEffect } from 'react';

import { ScrollView, Dimensions, AsyncStorage, Image } from 'react-native';

import {
	Surface as DefaultSurface,
	TextInput as DefaultInput,
	Text,
	Button
} from 'react-native-paper';

import styled from 'styled-components';

const { width } = Dimensions.get('window');

const PhotoNotes = ({
	uri,
	changeRoute
}: {
	uri: string;
	changeRoute: any;
}) => {
	const [notes, setNotes] = useState('');

	const GoBack = async () => {
		notes && (await AsyncStorage.setItem(uri, notes));
		changeRoute('PhotosView');
	};

	if (!uri) return <Text>Error loading</Text>;

	useEffect(() => {
		const fetchNotes = async () => {
			const fetched = await AsyncStorage.getItem(uri);

			setNotes(fetched);
		};

		fetchNotes();
	}, []);

	return (
		<>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				overScrollMode='always'>
				<BackButton
					icon='arrow-back'
					mode='outlined'
					onPress={() => GoBack()}>
					{''}
				</BackButton>

				<Image
					source={{ uri }}
					style={{
						alignSelf: 'center',
						resizeMode: 'contain',
						height: 400,
						width: 400
					}}
				/>
				<Surface>
					<TextInput
						label='Write notes here...'
						multiline
						value={notes}
						onChangeText={text => setNotes(text)}
					/>
				</Surface>
			</ScrollView>
		</>
	);
};

const target = width - 5;

const Surface = styled(DefaultSurface)`
	align-self: center;
	align-items: center;
	justify-content: center;
	elevation: 4;
	margin-top: 10px;
	margin-bottom: 250px;
`;

const TextInput = styled(DefaultInput)`
	width: ${target - 5}px;
`;

const BackButton = styled(Button)`
	margin-bottom: 10px;
	left: 2%;
`;

export { PhotoNotes };
