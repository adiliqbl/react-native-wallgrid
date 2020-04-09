import {Actions} from "../actions";
import {ImageAction} from "../actions/images";

export default (state = [], action: ImageAction) => {
    switch (action.type) {
        case Actions.ADD_FAVOURITE:
            return [...state, action.image];
        case Actions.REMOVE_FAVOURITE:
            return state.filter((it: any) => it.id !== action.id);
    }
    return state;
}
