import React, {Component} from 'react';
import Pexels from "../data/Pexels";
import ViewError from "../data/views/ViewError";
import Image from "../data/models/Image";
import {connect} from "react-redux";
import actions from "../store/actions";
import {NavigationProp} from "../data/views/ViewProps";
import Store from "../store/Store";
import {Button, Image as ImageView, SafeAreaView, StatusBar, Text} from "react-native";
import Screens from "./navigation/Screens";
import {Styles} from "../styles";

export type Props = {}

type State = {
    loading: boolean,
    image?: Image,
    error?: ViewError,
    isFavourite: boolean
}

type OwnProps = NavigationProp<Screens.ImageDetails> & ActionProps & ReduxProps & Props


/** Redux */
interface ReduxProps {
    isFavourite: boolean
}

interface ActionProps {
    addToFavourites: (image: Image) => void,
    removeFromFavourites: (id: string) => void
}

function find(store: Store, ownProps: OwnProps) {
    return store.favouriteImages.find((it: Image) => it.id == ownProps.route.params.id) != null
}

const mapStateToProps = (store: Store, ownProps: OwnProps): ReduxProps => ({
    isFavourite: find(store, ownProps)
});

const mapDispatchToProps = (dispatch: Function): ActionProps => {
    return {
        addToFavourites: (image: Image) => dispatch(actions.addFavouriteImage(image)),
        removeFromFavourites: (id: string) => dispatch(actions.removeFavouriteImage(id))
    }
};

class ImageDetails extends Component<OwnProps, State> {
    constructor(props: OwnProps) {
        super(props);
        this.state = {
            loading: false,
            image: undefined,
            error: undefined,
            isFavourite: props.isFavourite
        };
    }

    componentDidMount() {
        this.fetchImageDetails()
    }

    fetchImageDetails() {
        this.setState({loading: true});
        Pexels.getImage(this.props.route.params.id)
            .then(image => this.setState({image: image}))
            .catch(error => {
                console.log(error);
                this.setState({error: {message: 'Failed to fetch image'}});
            })
            .finally(() => this.setState({loading: false}))
    }

    toggleFavourite() {
        if (this.state.image == null) return;
        if (this.state.isFavourite) {
            this.props.removeFromFavourites(this.state.image.id);
        } else {
            this.props.addToFavourites(this.state.image)
        }

        this.setState({isFavourite: !this.state.isFavourite})
    }

    renderContent = (content: any) => (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>{content}</SafeAreaView>
        </>
    );

    render() {
        if (this.state.loading) {
            return this.renderContent((<Text>Loading</Text>));
        } else if (this.state.error != null || this.state.image == null) {
            return this.renderContent((
                <Text>{this.state.error ? this.state.error.message : "Unknown error occurred."}</Text>
            ))
        } else return this.renderContent((
            <>
                <ImageView source={{
                    uri: this.state.image.src.original
                }} style={Styles.fullscreenImage}/>

                <Button title={this.state.isFavourite ? "Remove Favourite" : "Mark Favourite"}
                        onPress={this.toggleFavourite.bind(this)}/>
            </>
        ));
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetails);
