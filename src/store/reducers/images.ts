import {Actions} from "../actions";

export default (state = [], action: any) => {
    switch (action.type) {
        case Actions.ADD_FAVOURITE:
            return [...state, action.image];
        case Actions.REMOVE_FAVOURITE:
            return state.filter((it: any) => it.id !== action.id);
    }
    return state;
}
