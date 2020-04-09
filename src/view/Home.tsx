import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pexels from "../data/Pexels";
import ViewError from "../data/views/ViewError";
import Image from "../data/models/Image";
import Store from "../store/Store";
import {FlatList, SafeAreaView, StatusBar, Text} from "react-native";
import {NavigationProp} from "../data/views/ViewProps";
import Screens from "./navigation/Screens";
import ImageListItem from "../components/ImageListItem";

type Props = NavigationProp<Screens.Home> & ReduxProps

type State = {
    loading: boolean
    page: number
    images: Array<Image>
    error?: ViewError
}

/** Redux */
interface ReduxProps {
    totalFavourites: number
}

const mapStateToProps = (store: Store) => ({
    totalFavourites: store.favouriteImages.length
});

class Home extends Component<Props, State> {
    constructor(props: Props) {
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

    onImageClick = (id: string) => this.props.navigation.navigate(Screens.ImageDetails, {id: id});

    renderContent = (content: any) => (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>{content}</SafeAreaView>
        </>
    );

    render() {
        if (this.state.loading) {
            return this.renderContent((<Text>Loading</Text>));
        } else if (this.state.error != null) {
            return this.renderContent((
                <Text>{this.state.error}</Text>
            ))
        } else return this.renderContent((
            <FlatList
                data={this.state.images}
                renderItem={({item}) => (
                    <ImageListItem url={item.src.medium}
                                   onPress={() => this.onImageClick(item.id)}/>
                )}
                ListHeaderComponent={() => (
                    <Text>Favourite Images: {this.props.totalFavourites}</Text>
                )}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                initialNumToRender={30}
                keyExtractor={item => item.id.toString()}
                legacyImplementation={false}/>
        ))
    }
}

export default connect(mapStateToProps)(Home);
