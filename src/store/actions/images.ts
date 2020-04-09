import Actions from "./actions";
import Image from "../../data/models/Image";

export const addFavouriteImage = (image: Image) => ({
    type: Actions.ADD_FAVOURITE,
    image: image
});

export const removeFavouriteImage = (id: string) => ({
    type: Actions.REMOVE_FAVOURITE,
    id: id
});

export type ImageAction = {
    type: string
    id?: string
    image?: Image
}
