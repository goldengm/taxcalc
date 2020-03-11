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
import HeaderOnTax from './components/HeaderOnTax';
import BottomBar from './components/BottomBar';
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
					flex: 1,
					position: 'relative'
				}}
			>
				{this.isPortrait() && 
					<HeaderOnTax />
				}
				<View 
					style={{
						flex: 1,
						alignItems: 'center', justifyContent: this.isPortrait()?'center':'flex-start'
					}}
				>
					{this.renderButtons()}
				</View>
				<BottomBar goHome={this.goHome}/>
			</View>
		);
	}

	renderButtons() {
		const { _t } = this.props;
		const Button = (props) => (
			<TouchableOpacity
				style={{
					marginVertical: 10,
					width: 200, height: 40,
					backgroundColor: '#e33d64',
					alignItems: 'center', justifyContent: 'center',
					borderRadius: 5
				}}
				onPress={props.onPress}
			>
				<Text
					style={{
						fontSize: 14, color: '#fff', fontWeight: 'bold',
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
				<Text
					style={{
						color: '#e33d64', fontSize: 22
					}}
				>
					{_t['home.Select_Your_Type']}
				</Text>
				<Button title={_t['home.Single']} onPress={() => this.setTaxType('Single')} />
				<Button title={_t['home.MFJ_QW']} onPress={() => this.setTaxType('MFJ_QW')} />
				<Button title={_t['home.Married_Filling_Separately']} onPress={() => this.setTaxType('Married_Filling_Separately')} />
				<Button title={_t['home.Head_Of_Household']} onPress={() => this.setTaxType('Head_Of_Household')} />
			</>
		)
	}

	goHome = () => {
		this.props.navigation.navigate('home');
	}

	setTaxType = (taxType) => {
		this.props.setTaxType(taxType);
		this.props.navigation.navigate('tax-calculator');
	}
}

export default connect(
	state => ({
		_t: state.setting._t
	}),
	dispatch => ({
		setTaxType: (taxType) => dispatch({ type: actionTypes.SET_TAX_TYPE, payload: {taxType} })
	})
)(Screen);
