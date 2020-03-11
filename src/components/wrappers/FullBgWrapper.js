import React from 'react';
import { 
	View, 
	Text,
	Image
} from 'react-native';
import { w, h, fullWidth, fullHeight } from 'utils/screen';
import { colors, fontNames } from 'config/ui';
import { Dimensions } from 'react-native';

export default class FullBgWrapper extends React.Component {
	state = {
		orientation: 'portrait'
	}
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
					position: 'relative',
					flex: 1
				}}
			>
				<Image 
					style={{
						position: 'absolute',
						width: fullWidth, height: fullHeight,
						zIndex: 0
					}}
					source={require('assets/img/background.png')}
				/>
				{this.props.children}
			</View>
		);
	}
}
