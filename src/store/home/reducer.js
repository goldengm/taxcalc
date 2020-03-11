import { actionTypes } from 'config/vars';

const initialState = {
	taxType: ''
};

function reducer(state=initialState, action) {
	if (action.type == actionTypes.SET_TAX_TYPE ){
		return {
			...state,
			taxType: action.payload.taxType
		}
	}

	return state;
}

export default reducer;
