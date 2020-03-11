import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Text, 
	TouchableOpacity,
	Image 
} from 'react-native';
import Orientation from 'react-native-orientation';
import { actionTypes } from 'config/vars';
import { w, h, fullWidth, fullHeight, isPortrait } from 'utils/screen';
import { colors, fontNames } from 'config/ui';

class Screen extends Component {
	state = {

	};

	componentDidMount() {
		Orientation.lockToPortrait();
	}

	render() {
		return (
			<View>
				<Text></Text>
			</View>
		);
	}
}

export default connect(
	state => ({
		isLoggedIn: state.auth.isLoggedIn
	}),
	dispatch => ({
		tryLogin: () => dispatch({type: actionTypes.TRY_LOGIN})
	})
)(Screen);
