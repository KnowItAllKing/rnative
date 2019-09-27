import React, { useState, useEffect } from 'react';

import {
	ScrollView,
	Dimensions,
	AsyncStorage,
	Image,
	TouchableWithoutFeedback,
	Keyboard
} from 'react-native';

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
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView keyboardShouldPersistTaps='handled'>
				<BackButton
					icon='arrow-back'
					mode='contained'
					onPress={() => GoBack()}>
					BACK
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
		</TouchableWithoutFeedback>
	);
};

const target = width - 5;

const Img = styled(Image as any)`
	flex: 1;
	align-self: center;
	resize-mode: contain;
	height: ${null};
	width: ${null};
`;

const Surface = styled(DefaultSurface)`
	align-self: center;
	align-items: center;
	justify-content: center;
	elevation: 4;
	margin-top: 50px;
`;

const TextInput = styled(DefaultInput)`
	width: ${target - 5}px;
`;

const BackButton = styled(Button)`
	margin-bottom: 25px;
`;

export { PhotoNotes };
