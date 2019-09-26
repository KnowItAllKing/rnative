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

const { height, width } = Dimensions.get('screen');

const PhotoNotes = ({
	uri,
	changeRoute
}: {
	uri: string;
	changeRoute: any;
}) => {
	const [notes, setNotes] = useState('');

	const [dimensions, setDimensions] = useState({ height, width });

	const GoBack = async () => {
		await AsyncStorage.setItem(uri, notes);
		changeRoute('PhotosView');
	};

	if (!uri) return <Text>Error loading</Text>;

	useEffect(() => {
		const fetchNotes = async () => {
			const fetched = await AsyncStorage.getItem(uri);

			setNotes(fetched || 'Write notes here...');
		};

		const fetchDimensions = async () => {
			Image.getSize(
				uri,
				(width, height) => setDimensions({ width, height }),
				e => console.log(e)
			);
		};

		fetchNotes();
		fetchDimensions();
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView keyoardShouldPersistTaps='handled'>
				<Button
					icon='arrow-back'
					mode='contained'
					onPress={() => GoBack()}>
					BACK
				</Button>
				<Surface h={dimensions.height} w={dimensions.width}>
					<Img
						source={{ uri }}
						h={dimensions.height}
						w={dimensions.width}
					/>
				</Surface>
				<Surface>
					<TextInput
						label='Notes'
						multiline
						value={notes}
						onChangeText={text =>
							text !== 'Write notes here...' && setNotes(text)
						}
					/>
				</Surface>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

const target = width - 5;

const Img = styled(Image as any)`
	align-self: center;
	height: ${props =>
		props.h > height ? 0.75 * props.h : props.h || height}px;
	width: ${props => (props.w > width ? 0.75 * props.w : props.w || width)}px;
`;

const Surface = styled(DefaultSurface as any)`
	padding: 8px;
	margin-top: 20px;
	height: ${props => props.h || height - 10 + 10}px;
	width: ${props => props.w || width - 10 + 10}px;
	align-self: center;
	align-items: center;
	justify-content: center;
	elevation: 4;
`;

const TextInput = styled(DefaultInput)`
	width: ${target - 5}px;
`;

export { PhotoNotes };
