import { actionTypes } from 'config/vars';
import en from 'config/langs/en.json';
import fr from 'config/langs/fr.json';

const initialState = {
	lang: 'en',
	_t: {}
}

function reducer(state=initialState, action) {
	if (action.type == actionTypes.SETTTING_CHANGE_LANGUAGE) {
		let { lang } = action.payload;
		let _t = 'en';
		if (lang == 'en') {
			_t = en;
		}
		if (lang == 'fr') {
			_t = fr;
		}
		return {
			...state,
			lang,
			_t
		};
	}
	
	if (state.lang == 'en') {
		state._t = en;
	}
	if (state.lang == 'fr') {
		state._t = fr;
	}
	return state;
}

export default reducer;
