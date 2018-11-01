import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import axios from 'axios/index';

export default class ServicesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: null
        }
    }
    static navigationOptions = {
        title: 'Services',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.menu ? this.state.menu.breakfast.map((item,index) => {
                    return (
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }} key={index}>
                            <Image source={{uri: item.imgURL}} style={styles.foodPics}/>
                            <View style={styles.menuItemRow}>
                                <Text style={styles.menuItem}>{item.title}</Text>
                                <Text style={styles.menuItemPrice}>${item.price}</Text>
                            </View>
                        </View>
                    )
                }) : null}
            </ScrollView>
        );
    }

    componentDidMount() {
        axios.get(`http://api.jsonbin.io/b/5b69b7d92b23fb1f2b70a7ea/5`)
            .then(res => {
                const menu = res.data.menu;
                console.log(res.data.menu);
                this.setState({ menu });
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    foodPics: {
        width: '100%',
        height: 300,
        opacity: .6
    },
    menuHeader: {
        fontSize: 40,
        paddingBottom: 10,
        fontFamily: 'nanum-gothic',
        textAlign: 'center'
    },
    menuItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
        marginVertical: 2
    },
    menuItem: {
        fontSize: 30,
        fontFamily: 'nanum-gothic',
        marginVertical: -85
    },
    menuItemPrice: {
        fontSize: 30,
        fontFamily: 'nanum-gothic',
        marginVertical: -85
    }
});
