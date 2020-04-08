import {Actions} from "./index";

export const addFavouriteImage = (image: object) => ({
    type: Actions.ADD_FAVOURITE,
    image: image
});

export const removeFavouriteImage = (id: string) => ({
    type: Actions.REMOVE_FAVOURITE,
    id: id
});
