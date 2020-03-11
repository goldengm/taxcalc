import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { w, h, fullWidth, fullHeight } from 'utils/screen';
import { colors, fontNames } from 'config/ui';
import FullBgWrapper from '../../components/wrappers/FullBgWrapper';

export default class Screen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<FullBgWrapper>
				<View 
					style={{
						flex: 1, justifyContent: 'center', alignItems: 'center'
					}}
				>
					<ActivityIndicator size="large" />
					<Text
						style={{
							fontSize: 24, fontStyle: 'italic',
							color: '#fff',
							width: '100%', textAlign: 'center'
						}}
					>
						Just wait a minute...
					</Text>
				</View>
			</FullBgWrapper>
		);
	}
}
