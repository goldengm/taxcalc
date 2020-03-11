import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Text, 
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView
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
		orientation: 'portrait',
		calculatedTax: '',
		income: ''
	};

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

	isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

	render() {
		const { taxType, _t } = this.props;
		const { income, calculatedTax } = this.state;
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
						paddingHorizontal: 30
					}}
				>
					<Text 
						style={{
							paddingVertical: 5, paddingHorizontal: 15, marginTop: 20,
							width: '100%', 
							backgroundColor: '#e33d64', color: '#fff',
							fontSize: 20
						}}
					>
						{taxType=='Single' &&
						_t['home.Single']}
						{taxType=='MFJ_QW' &&
						_t['home.MFJ_QW']}
						{taxType=='Married_Filling_Separately' &&
						_t['home.Married_Filling_Separately']}
						{taxType=='Head_Of_Household' &&
						_t['home.Head_Of_Household']}
					</Text>
					{this.isPortrait()?
						<View>
							{this.renderTaxForm()}
							{this.renderImage()}
						</View>:
						<View
							style={{
								flexDirection: 'row'
							}}
						>
							<View 
								style={{
									width: '50%'
								}}
							>
								{this.renderTaxForm()}
							</View>
							<View 
								style={{
									width: '50%', 
									marginTop: 40
								}}
							>
								{this.renderImage()}
							</View>
						</View>
					}

				</View>
				<BottomBar goHome={this.goHome}/>
			</View>
		);
	}

	renderTaxForm = () => {
		const { taxType, _t } = this.props;
		const { income, calculatedTax } = this.state;

		return (
			<>
				<View
					style={{
						width: '100%',
						alignItems: 'center',
						marginTop: 30
					}}
				>
					<Text 
						style={{
							fontSize: 12, color: '#666'
						}}
					>
						{_t['Your_Income']}:
					</Text>
					<TextInput
						style={{
							borderBottomWidth: 1, borderBottomColor: '#ddd',
							fontSize: 14, color: '#444',
							width: 200, 
							padding: 10, marginBottom: 10,
							textAlign: 'center'
						}}
						keyboardType={'numeric'}
						maxLength={6}
						returnKeyType={'done'}
						value={income}
						onChangeText={(income) => this.setState({...this.state, income})}
					/>
					<TouchableOpacity
						style={{
							width: 200, height: 40,
							alignItems: 'center', justifyContent: 'center',
							borderRadius: 5,
							backgroundColor: '#e33d64'
						}}
						onPress={this.doCalcTax}
					>
						<Text
							style={{
								color: '#fff', fontSize: 18, fontWeight: 'bold'
							}}
						>
							{_t['Calculate']}
						</Text>
					</TouchableOpacity>
					<Text 
						style={{
							fontSize: 12, color: '#666',
							marginTop: 20
						}}
					>
						{_t['Your_Tax']}:
					</Text>
					<TextInput
						style={{
							borderBottomWidth: 1, borderBottomColor: '#ddd',
							fontSize: 18, color: '#e33d64',
							width: 200, 
							padding: 10, marginBottom: 20,
							textAlign: 'center'
						}}
						keyboardType={'numeric'}
						editable={false}
						value={calculatedTax}
					/>
				</View>
			</>			
		)
	}

	renderImage = () => {
		const { taxType, _t } = this.props;
		const Image2 = (props) => (
			<Image 
				source={props.image}
				style={{
					width: '100%', height: undefined,
					aspectRatio: props.aspectRatio,
					resizeMode: 'contain'
				}}
			/>
		)

		return (
			<View
				style={{
					width: '100%'
				}}
			>
				{taxType=='Single' &&
					<Image2
						image={require('assets/img/tbl_single.png')}
						aspectRatio={848/413}
					/>
				}
				{taxType=='MFJ_QW' &&
					<Image2
						image={require('assets/img/tbl_mfj.png')}
						aspectRatio={847/410}
					/>
				}
				{taxType=='Married_Filling_Separately' &&
					<Image2
						image={require('assets/img/tbl_married.png')}
						aspectRatio={850/416}
					/>
				}
				{taxType=='Head_Of_Household' &&
					<Image2
						image={require('assets/img/tbl_head.png')}
						aspectRatio={849/419}
					/>
				}
			</View>
		)
	}

	goHome = () => {
		this.props.navigation.navigate('home');
	}

	doCalcTax = () => {
		let { calculatedTax, income } = this.state;
		const { taxType } = this.props;
		if (income=='') return;

		if (taxType=='Single') {
			if (income<9700) {
				calculatedTax = 0;
				calculatedTax += (income*0.1);
			} else if (income<39475) {
				calculatedTax = 970;
				calculatedTax += (income*0.12);
			} else if (income<84200) {
				calculatedTax = 4543;
				calculatedTax += (income*0.22);
			} else if (income<160725) {
				calculatedTax = 14382.5;
				calculatedTax += (income*0.24);
			} else if (income<204100) {
				calculatedTax = 32748.5;
				calculatedTax += (income*0.32);
			} else if (income<510300) {
				calculatedTax = 46628.5;
				calculatedTax += (income*0.35);
			} else {
				calculatedTax = 153798.5;
				calculatedTax += (income*0.37);
			}
		} else if (taxType=='MFJ_QW') {
			if (income<19400) {
				calculatedTax = 0;
				calculatedTax += (income*0.1);
			} else if (income<78950) {
				calculatedTax = 1940;
				calculatedTax += (income*0.12);
			} else if (income<168400) {
				calculatedTax = 9086;
				calculatedTax += (income*0.22);
			} else if (income<321450) {
				calculatedTax = 28765;
				calculatedTax += (income*0.24);
			} else if (income<408200) {
				calculatedTax = 65497;
				calculatedTax += (income*0.32);
			} else if (income<612350) {
				calculatedTax = 92257;
				calculatedTax += (income*0.35);
			} else {
				calculatedTax = 164709.5;
				calculatedTax += (income*0.37);
			}
		} else if (taxType=='Married_Filling_Separately') {
			if (income<9700) {
				calculatedTax = 0;
				calculatedTax += (income*0.1);
			} else if (income<39475) {
				calculatedTax = 970;
				calculatedTax += (income*0.12);
			} else if (income<84200) {
				calculatedTax = 4543;
				calculatedTax += (income*0.22);
			} else if (income<160725) {
				calculatedTax = 14382.5;
				calculatedTax += (income*0.24);
			} else if (income<204100) {
				calculatedTax = 32748.5;
				calculatedTax += (income*0.32);
			} else if (income<306175) {
				calculatedTax = 46628.5;
				calculatedTax += (income*0.35);
			} else {
				calculatedTax = 82354.75;
				calculatedTax += (income*0.37);
			}
		} else if (taxType=='Head_Of_Household') {
			if (income<13850) {
				calculatedTax = 0;
				calculatedTax += (income*0.1);
			} else if (income<52850) {
				calculatedTax = 1385;
				calculatedTax += (income*0.12);
			} else if (income<84200) {
				calculatedTax = 6065;
				calculatedTax += (income*0.22);
			} else if (income<160700) {
				calculatedTax = 12962;
				calculatedTax += (income*0.24);
			} else if (income<204100) {
				calculatedTax = 31322;
				calculatedTax += (income*0.32);
			} else if (income<510300) {
				calculatedTax = 45210;
				calculatedTax += (income*0.35);
			} else {
				calculatedTax = 152380;
				calculatedTax += (income*0.37);
			}
		}
		calculatedTax = calculatedTax+'';
		console.log(calculatedTax);
		this.setState({...this.state, calculatedTax});
	}
}

export default connect(
	state => ({
		_t: state.setting._t,
		taxType: state.home.taxType
	}),
	dispatch => ({
	})
)(Screen);
