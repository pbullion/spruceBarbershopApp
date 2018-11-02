import React from 'react';
import {ScrollView, StyleSheet, View, Text, Image, ImageBackground} from 'react-native';
import axios from 'axios/index';

export default class StylistsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: null
        }
    }
    static navigationOptions = {
        title: 'Stylists',
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.state.menu ? this.state.menu.breakfast.map((item,index) => {
                    return (
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }} key={index}>
                            <ImageBackground source={{uri: item.imgURL}} style={styles.foodPics}>
                                <Text style={styles.menuItem}>{item.title}</Text>
                            </ImageBackground>
                        </View>
                    )
                }) : null}
            </ScrollView>
        );
    }

    componentDidMount() {
        axios.get(`http://api.jsonbin.io/b/5b69b7d92b23fb1f2b70a7ea/6`)
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
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    foodPics: {
        width: '100%',
        height: 650,
        opacity: .8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 75
    },
    menuItem: {
        fontSize: 30,
        fontFamily: 'nanum-gothic',
        color: '#000000'
    }
});
