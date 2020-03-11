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
import FullBgWrapper from 'components/wrappers/FullBgWrapper';
import { Dropdown } from 'react-native-material-dropdown';
import { Dimensions } from 'react-native';

class Screen extends Component {
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
		return (
			<FullBgWrapper>
				<View 
					style={{
						flex: 1,
						alignItems: 'center', justifyContent: 'center',
						position: 'relative'
					}}
				>
					{this.renderWelcomeLogo()}
					{this.renderSwitchLanguage()}
					{this.renderStartButton()}
					{this.renderCopyright()}
				</View>
			</FullBgWrapper>
		);
	}

	renderWelcomeLogo() {
		return (
			<Image
				source={require('assets/img/welcome-logo.png')}
				style={{
					width: 200, height: 100
				}}
			/>
		)
	}

	renderSwitchLanguage() {
		let data = [
			{
				label: 'English',
				value: 'en',
			}, 
			{
				label: 'Française',
				value: 'fr'
			}
		];

		return (
			<View
				style={{
					marginTop: this.isPortrait()?40:10
				}}
			>
				<Dropdown
					label='Select Your Language'
					data={data}
					value={this.props.lang}
					selectedItemColor='#205492'
					containerStyle={{
						width: 160
					}}
					overlayStyle={{
						backgroundColor: 'transparent'
					}}
					onChangeText={(lang) => this.props.switchLanguage(lang)}
				/>
			</View>
		)
	}

	renderStartButton() {
		const { _t } = this.props;
		return (
			<TouchableOpacity
				onPress={() => this.goHome()}
			>
				<View
					style={{
						backgroundColor: '#e33d64',
						width: 240, height: 50,
						alignItems: 'center', justifyContent: 'center',
						marginTop: this.isPortrait()?120:30
					}}
				>
					<Text
						style={{
							fontSize: 18, color: '#fff', fontWeight: 'bold'
						}}
					>
						{_t['welcome.Get_Started']}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}

	renderCopyright() {
		var dim = Dimensions.get('window');
		let fullWidth = dim.width, fullHeight = dim.height;
		
		return (
			<View
				style={{
					position: 'absolute',
					left: 0, bottom: 0,
					width: fullWidth, height: 80,
					alignItems: 'center', justifyContent: 'center'
				}}
			>
				<Text
					style={{
						color: '#fff', fontSize: 13
					}}
				>
					&copy; Payen Enterprise
				</Text>
			</View>
		)
	}

	goHome = () => {
		this.props.navigation.navigate('home');
	}
}

export default connect(
	state => ({
		lang: state.setting.lang,
		_t: state.setting._t
	}),
	dispatch => ({
		switchLanguage: (lang) => dispatch({ type: actionTypes.SETTTING_CHANGE_LANGUAGE, payload: {lang} })
	})
)(Screen);
