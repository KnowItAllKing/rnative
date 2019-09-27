import React from 'react';

import { View, ActivityIndicator } from 'react-native';

import { Title } from 'react-native-paper';

import styled from 'styled-components';

const Loading = () => (
	<>
		<CenteredView>
			<ActivityIndicator size='large' color='#0000ff' />
			<Title>Loading...</Title>
		</CenteredView>
	</>
);
const CenteredView = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export { Loading };
