import axios from 'axios';
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


export const item_list = (item_id) => async dispatch => {
if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
        
    }; 
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/item-list/`, config);

        dispatch({
            type: ITEM_LIST_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: ITEM_LIST_FAIL,
            payload: err.response.data
        });
    }
} else {
        console.log( " else ITEM_LIST_FAIL");
        dispatch({      
            type: ITEM_LIST_FAIL,
        });
    }
};
export const wardrobe = (item_id) => async dispatch => {
if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
        
    }; 
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/wardrobe`, config);

        dispatch({
            type: WARDROBE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: WARDROBE_FAIL,
            payload: err.response.data
        });
    }
} else {
        console.log( " else WARDROBE_FAIL");
        dispatch({      
            type: WARDROBE_FAIL,
        });
    }
};


export const add_to_wardrobe = (item_id) => async dispatch => {
if (localStorage.getItem('access')) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
        
    }; 
    const body = JSON.stringify({ item_id });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-to-wardrobe`, body, config);

        dispatch({
            type: ADD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: ADD_FAIL,
            payload: err.response.data
        });
    }
} else {
        console.log( " else ADD_FAIL");
        dispatch({      
            type: ADD_FAIL,
        });
    }
};

export const delete_to_wardrobe = (item_id) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 
        
        const body = JSON.stringify({ item_id });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/delete-to-wardrobe`, body, config);
    
            dispatch({
                type: DELETE_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: DELETE_FAIL,
                payload: err.response.data
            });
        }
    } else {
            console.log( " else DELETE_FAIL");
            dispatch({      
                type: DELETE_FAIL,
            });
        }
    };