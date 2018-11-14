import React from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios/index';
import GenericButton from "../components/buttons/GenericButton";
import * as Animatable from "react-native-animatable";

export default class ProductsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: null
        }
    }
    static navigationOptions = {
        title: 'Services',
        headerStyle: {
            backgroundColor: 'rgba(53, 96, 68, 1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    _changeAnimation = () => {
        this.setState({animation: "fadeOutDown"});
        this.setState({animation: null});
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <Animatable.View animation={this.state.animation} easing="ease-out">
                        <GenericButton onPress={() => {this.props.navigation.navigate('Hair')}} line1='Hair' line2='Cuts' />
                    </Animatable.View>
                    <Animatable.View animation={this.state.animation} easing="ease-out">
                        <GenericButton onPress={() => {this._changeAnimation(); this.props.navigation.navigate('Coloring')}} line1='Hair' line2='Coloring' />
                    </Animatable.View>
                </View>
                <View style={styles.buttons}>
                    <Animatable.View animation={this.state.animation} easing="ease-out">
                        <GenericButton onPress={() => {this._changeAnimation(); this.props.navigation.navigate('Beard')}} line1='Beard' />
                    </Animatable.View>
                    <Animatable.View animation={this.state.animation} easing="ease-out">
                        <GenericButton onPress={() => {this._changeAnimation(); this.props.navigation.navigate('Shave')}} line1='Shave' />
                    </Animatable.View>
                </View>
                <View style={styles.buttons}>
                    <Animatable.View animation={this.state.animation} easing="ease-out">
                        <GenericButton onPress={() => {this._changeAnimation(); this.props.navigation.navigate('Additional')}} line1='Additional' line2='Services'/>
                    </Animatable.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'

    }

});
