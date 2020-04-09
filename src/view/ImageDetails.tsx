import React, {Component} from 'react';
import Pexels from "../data/Pexels";
import ViewError from "../data/views/ViewError";
import Image from "../data/models/Image";
import {connect} from "react-redux";
import actions from "../store/actions";

type Props = {
    id: string
}

type State = {
    loading: boolean,
    image?: Image,
    error?: ViewError
}


/** Redux */
const mapDispatchToProps = (dispatch: Function) => {
    return {
        addToFavourites: (image: Image) => dispatch(actions.addFavouriteImage(image)),
        removeFromFavourites: (id: string) => dispatch(actions.removeFavouriteImage(id))
    }
};

class ImageDetails extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            image: undefined,
            error: undefined
        };
    }

    componentDidMount() {
        this.fetchImageDetails()
    }

    fetchImageDetails() {
        this.setState({loading: true});
        Pexels.getImage(this.props.id)
            .then(image => this.setState({image: image}))
            .catch(error => {
                this.setState({error: {message: 'Failed to fetch image'}});
                console.log(error);
            })
            .finally(() => this.setState({loading: false}))
    }

    render() {
        if (this.state.loading) return null;
        return null;
    }
}

export default connect(null, mapDispatchToProps)(ImageDetails);
