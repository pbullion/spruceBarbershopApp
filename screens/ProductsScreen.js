import React from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios/index';
import GenericButton from "../components/buttons/GenericButton";

export default class ProductsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: null
        }
    }
    static navigationOptions = {
        title: 'Products',
        headerStyle: {
            backgroundColor: 'rgba(53, 96, 68, 1)',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <GenericButton onPress={() => this.props.navigation.navigate('Home')} line1='Brushes' />
                    <GenericButton onPress={() => this.props.navigation.navigate('Home')} line1='Oils' />
                </View>
                <View style={styles.buttons}>
                    <GenericButton onPress={() => this.props.navigation.navigate('Home')} line1='Combs' />
                    <GenericButton onPress={() => this.props.navigation.navigate('Home')} line1='Hats' />
                </View>
                <View style={styles.buttons}>
                    <GenericButton onPress={() => this.props.navigation.navigate('Home')} line1='Razors' />
                    <GenericButton onPress={() => this.props.navigation.navigate('Home')} line1='Balms' />
                </View>
            </View>
        );
    }

    componentDidMount() {
        axios.get(`http://api.jsonbin.io/b/5b69b7d92b23fb1f2b70a7ea/5`)
            .then(res => {
                const menu = res.data.menu;
                this.setState({ menu });
            });
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
