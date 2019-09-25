import React from 'react';

import { FlatList } from 'react-native';

import { Surface as DefaultSurface } from 'react-native-paper';

import styled from 'styled-components';

import { PhotosByDate } from '../PhotoView';

const PhotoRow = (photos: PhotosByDate) => {};

const List = styled(FlatList)`
	padding: 5px;
	margin-top: 0;
`;

export { PhotoRow };
