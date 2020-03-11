import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isPortrait = height > width;
const designBaseWidth = 375;
const designBaseHeight = 812;

const scale = size => isPortrait ? (width / designBaseWidth) * size : (height / designBaseWidth) * size;
const heightScale = size => isPortrait ? (height / designBaseHeight) * size : (width / designBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const isIphoneX = () => {
	return Platform.OS === 'ios' && (height == 812 || width == 812);
};

export { scale as w, heightScale as h, moderateScale as m, isIphoneX };
const fullWidth = width;
const fullHeight = height;

export { fullWidth, fullHeight };
export { isPortrait };
