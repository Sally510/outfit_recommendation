import {
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAIL,
    WARDROBE_SUCCESS,
    WARDROBE_FAIL,
    ADD_SUCCESS,
    ADD_FAIL,
    DELETE_SUCCESS,
    DELETE_FAIL
} from '../actions/types';

const initialState = {
    item_id: null,
    error: null,
    loading: true
};

export default function Wardrobe (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case ITEM_LIST_SUCCESS:
        case WARDROBE_SUCCESS:
        case ADD_SUCCESS:
        case DELETE_SUCCESS:    
            return {
                ...state,
                item_id: payload.id,
                loading: false
            }
        case ITEM_LIST_FAIL:
        case WARDROBE_FAIL:
        case ADD_FAIL:
        case DELETE_FAIL:
            console.log("error" + payload)
            return {
                ...state,
                error: payload,                
            }
        default:
            return state
    }
}