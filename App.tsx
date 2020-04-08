import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View,} from 'react-native';
import styles from './src/styles';
import {NavigationContainer} from '@react-navigation/native';

import {Header} from 'react-native/Libraries/NewAppScreen';

declare var global: { HermesInternal: null | {} };

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Header/>
                    {global.HermesInternal == null ? null : (
                        <View style={styles.engine}>
                            <Text style={styles.footer}>Engine: Hermes</Text>
                        </View>
                    )}
                    <View style={styles.body}>
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionDescription}>
                                Test content
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default App;
