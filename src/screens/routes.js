import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

import WelcomeScreen from './welcome/Welcome';
import HomeScreen from './home/Home';
import KnowledgebaseScreen from './home/Knowledgebase';
import ChooseTaxTypeScreen from './home/ChooseTaxType';
import TaxCalculatorScreen from './home/TaxCalculator';

const MainNavigation = createStackNavigator(
	{
		welcome: {
			screen: WelcomeScreen
		},
		home: {
			screen: HomeScreen
		},
		knowledgebase: {
			screen: KnowledgebaseScreen
		},
		'choose-tax-type': {
			screen: ChooseTaxTypeScreen
		},
		'tax-calculator': {
			screen: TaxCalculatorScreen
		}
	}, {
		defaultNavigationOptions: {
			header: null
		},
		initialRouteName: 'welcome'
	}
);

export default createAppContainer(MainNavigation);
