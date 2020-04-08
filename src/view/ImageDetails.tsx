import React, {Component} from 'react';
import Pexels from "../data/Pexels";
import ViewError from "../data/views/ViewError";
import Image from "../data/models/Image";

export interface Props {
    id: string
}

export interface State {
    loading: boolean,
    image?: Image,
    error?: ViewError
}

export default class ImageDetails extends Component<Props, State> {
    constructor(props: any) {
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
