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
import { Dimensions } from 'react-native';

export default class Section extends Component {
	state = {
		orientation: 'portrait'
	};

	isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  componentDidMount() {

    this.setState({
      ...this.state,
      orientation: this.isPortrait() ? 'portrait' : 'landscape'
    });

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        ...this.state,
        orientation: this.isPortrait() ? 'portrait' : 'landscape'
      });
    });    
  }

	render() {
		var dim = Dimensions.get('window');
		let fullWidth = dim.width, fullHeight = dim.height;
		
		return (
			<View
				style={{
					position: 'absolute', bottom: 0, left: 0,
					width: fullWidth, height: 120,
					alignItems: 'center', justifyContent: 'center'
				}}
			>
				<TouchableOpacity
					onPress={this.props.goHome}
				>
					<Image
						source={require('assets/img/btn_home1.png')}
						style={{
							width: 50, height: 50
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}
