import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Text, 
	TouchableOpacity,
	Image,
	ScrollView
} from 'react-native';
import Orientation from 'react-native-orientation';
import { actionTypes } from 'config/vars';
import { w, h, fullWidth, fullHeight, isPortrait } from 'utils/screen';
import { colors, fontNames } from 'config/ui';
import Accordion from 'react-native-collapsible/Accordion';
import HeaderOnTax from './components/HeaderOnTax';
import BottomBar from './components/BottomBar';
import { Dimensions } from 'react-native';

class Screen extends Component {
	state = {
		activeSections: [],
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
		const { _t } = this.props;		

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
				<ScrollView
					style={{
						flex: 1,
						marginHorizontal: 20, marginTop: 10, marginBottom: this.isPortrait()?20:120
					}}
				>
					{this.renderAccordion()}
				</ScrollView>
				<BottomBar goHome={this.goHome}/>
			</View>
		);
	}

	renderAccordion = () => {
		const { _t } = this.props;		
		const { activeSections } = this.state;
		const sections = [
			{
				title: _t['kn.What_Is_Tax_Accounting.title'],
				content: _t['kn.What_Is_Tax_Accounting.content'],
			},
			{
				title: _t['kn.Tax_Accounting_Explained.title'],
				content: _t['kn.Tax_Accounting_Explained.content'],
			},
			{
				title: _t['kn.Tax_Principles_vs_GAAP.title'],
				content: _t['kn.Tax_Principles_vs_GAAP.content'],
			},
			{
				title: _t['kn.Tax_Accounting_for_an_Individual.title'],
				content: _t['kn.Tax_Accounting_for_an_Individual.content'],
			},
			{
				title: _t['kn.Tax_Accounting_for_a_Business.title'],
				content: _t['kn.Tax_Accounting_for_a_Business.content'],
			},
			{
				title: _t['kn.Tax_Accounting_for_a_Tax-Exempt_Organization.title'],
				content: _t['kn.Tax_Accounting_for_a_Tax-Exempt_Organization.content'],
			}
		]

		return (
			<Accordion
				sections={sections}
				activeSections={activeSections}
				renderHeader={section => (
					<View
						style={{
							backgroundColor: '#e33d64',
							padding: 10,
							marginVertical: 3
						}}
					>
						<Text
							style={{
								color: '#fff', fontSize: 16, fontWeight: 'bold'
							}}
						>
							{section.title}
						</Text>
					</View>
				)}
				renderContent={section => (
					<View>
						<Text>{section.content}</Text>
					</View>
				)}
				onChange={activeSections => {
					this.setState({...this.state, activeSections});
				}}
				underlayColor='transparent'
			/>
		)
	}

	goHome = () => {
		this.props.navigation.navigate('home');
	}
}

export default connect(
	state => ({
		_t: state.setting._t
	}),
	dispatch => ({
	})
)(Screen);
