import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Dimensions, DeviceEventEmitter} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store';

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    componentDidMount() {

    }

    render() {
        DeviceEventEmitter.addListener('namedOrientationDidChange', data => {data.isLandscape ? Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE) : Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT) });

        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </View>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                'nanum-gothic': require('./assets/fonts/NanumGothic-Regular.ttf'),
                'neutra-text-light': require('./assets/fonts/NeutraText-Light.otf'),
                'neutra-text-bold': require('./assets/fonts/NeutraText-Bold.otf')
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
