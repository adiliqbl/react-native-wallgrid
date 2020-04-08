import React, {Component} from 'react';
import Pexels from "../data/Pexels";
import ViewError from "../data/views/ViewError";
import Image from "../data/models/Image";

export interface Props {
}

export interface State {
    loading: boolean,
    page: number,
    images: Array<Image>,
    error?: ViewError
}

export default class Home extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            page: 1,
            images: [],
            error: undefined
        };
    }

    componentDidMount() {
        this.fetchImages()
    }

    fetchImages() {
        this.setState({loading: true});
        Pexels.getFeaturedList(this.state.page)
            .then(images => this.setState({images: [...this.state.images, ...images]}))
            .catch(error => {
                this.setState({error: {message: 'Failed to get images'}});
                console.log(error);
            })
            .finally(() => this.setState({loading: false}))
    }

    render() {
        if (this.state.loading) return null;
        return null;
    }
}
