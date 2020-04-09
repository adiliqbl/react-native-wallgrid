import {Actions} from "../actions";
import {ImageAction} from "../actions/images";
import Image from "../../data/models/Image";

export default (state = [], action: ImageAction) => {
    switch (action.type) {
        case Actions.ADD_FAVOURITE:
            return [...state, action.image];
        case Actions.REMOVE_FAVOURITE:
            return state.filter((it: Image) => it.id !== action.id);
    }
    return state;
}
