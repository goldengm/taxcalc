import React, { Component } from 'react';
import { 
	View, 
	Text, 
	TouchableOpacity,
	Image,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import { w, h, fullWidth, fullHeight } from 'utils/screen';
import { colors, fontNames } from 'config/ui';

export default class Section extends Component {
	state = {

	};

	componentDidMount() {
	}

	render() {
		return (
			<View
				style={{
					width: fullWidth, height: 180,
					alignItems: 'center', justifyContent: 'center'
				}}
			>
				<Image
					style={{
						position: 'absolute', left: 0, top: 0,
						width: '100%', height: '100%'
					}}
					source={require('assets/img/banner.png')}
				/>
			</View>
		)
	}
}
