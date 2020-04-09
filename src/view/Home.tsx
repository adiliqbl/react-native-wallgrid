import React, {Component} from 'react';
import {connect} from 'react-redux';
import Pexels from "../data/Pexels";
import ViewError from "../data/views/ViewError";
import Image from "../data/models/Image";
import Store from "../store/Store";
import {SafeAreaView, ScrollView, StatusBar, Text, View} from "react-native";
import styles from "../styles";
import {Header} from "react-native/Libraries/NewAppScreen";

type Props = {}

type State = {
    loading: boolean
    page: number
    images: Array<Image>
    error?: ViewError
}

/** Redux */
const mapStateToProps = (store: Store) => ({
    totalFavourites: store.images.length
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

    render() {
        if (this.state.loading) return null;
        return (
            <>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <Header/>
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionDescription}>
                                    Test content
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}

export default connect(mapStateToProps)(Home);
