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
import LanguageSelector from './LanguageSelector';

export default class Section extends Component {
	state = {

	};

	componentDidMount() {
	}

	render() {
		const { bannerImage } = this.props;

		return (
			<View
				style={{
					width: fullWidth, height: 150,
					position: 'relative'
				}}
			>
				<Image
					style={{
						width: '100%', height: '100%',
						position: 'absolute', left: 0, top: 0,
						resizeMode: 'cover'
					}}
					source={bannerImage}
				/>
				<Image 
					source={require('assets/img/banner-logo.png')}
					style={{ 
						width: 240, height: 80,
						position: 'absolute', left: 10, top: 40,
						resizeMode: 'cover'
					}}
				/>
				<View
					style={{
						position: 'absolute', right: 160, top: 110,
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: '#205492',
							padding: 5,
							borderRadius: 10
						}}
					>
						<Text style={{
							color: 'white', fontSize: 14
						}}
						>
							Tax Caluculator
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						position: 'absolute', right: 10, top: 110,
					}}
				>
					<TouchableOpacity
						style={{
							backgroundColor: '#205492',
							padding: 5,
							borderRadius: 10
						}}
					>
						<Text style={{
							color: 'white', fontSize: 14
						}}
						>
							Knowledgebase
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						position: 'absolute', right: 10, top: 50,
						flexDirection: 'row'
					}}
				>
					<View
						style={{
							flexDirection: 'row'
						}}
					>
						<LanguageSelector label='Language: ' 
							onChangeLanguage={(lang) => this.props.onChangeLanguage(lang)}
						/>
					</View>
				</View>
			</View>
		);
	}
}
