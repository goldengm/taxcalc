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
import { w, h, fullWidth, fullHeight } from 'utils/screen';
import { colors, fontNames } from 'config/ui';
import { Dimensions } from 'react-native';

class Screen extends Component {
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
		return (
			<View
				style={{
					flex: 1
				}}
			>
				{this.renderHeader()}
				<View 
					style={{
						flex: 1,
						alignItems: 'center', justifyContent: 'center'
					}}
				>
					{this.renderButtons()}
				</View>
				
			</View>
		);
	}

	renderHeader() {
		var dim = Dimensions.get('window');
		let fullWidth = dim.width, fullHeight = dim.height;

		return (
			<View
				style={{
					width: fullWidth, height: this.isPortrait()?180:120,
					alignItems: 'center', justifyContent: 'center'
				}}
			>
				<Image
					style={{
						position: 'absolute', left: 0, top: 0,
						width: '100%', height: '100%'
					}}
					source={require('assets/img/banner2.png')}
				/>
				<Image
					source={require('assets/img/welcome-logo.png')}
					style={{
						width: 200, height: 100,
					}}
				/>
			</View>
		)
	}

	renderButtons() {
		const { _t } = this.props;
		const Button = (props) => (
			<TouchableOpacity
				style={{
					marginVertical: 20,
					width: 200, height: 60,
					backgroundColor: '#e33d64',
					alignItems: 'center', justifyContent: 'center',
					borderRadius: 5
				}}
				onPress={props.onPress}
			>
				<Text
					style={{
						fontSize: 20, color: '#fff', fontWeight: 'bold',
						textAlign: 'center',
						width: '100%'
					}}
				>
					{props.title}
				</Text>
			</TouchableOpacity>
		)
		return (
			<>
				<Button title={_t['home.Knowledgebase']} onPress={this.goKnowledge}/>
				<Button title={_t['home.Tax_Calculator']} onPress={this.goTaxCalcualtor}/>
			</>
		)
	}

	goKnowledge = () => {
		this.props.navigation.navigate('knowledgebase');
	}

	goTaxCalcualtor = () => {
		this.props.navigation.navigate('choose-tax-type');
	}
}

export default connect(
	state => ({
		_t: state.setting._t
	}),
	dispatch => ({
	})
)(Screen);
