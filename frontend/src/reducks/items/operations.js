import API from '../../API';
import { fetchItemsAction } from './actions';

const api = new API();

export const fetchItems = (page, category) => {
    return async dispatch => {
        return api
            .getItems(page, category)
            .then(items => {
                dispatch(fetchItemsAction(items));
            })
            .catch(error => {
                alert('Failed to connect API: /items/');
            });
    };
};
