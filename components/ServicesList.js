import React from 'react';
import {ScrollView, StyleSheet, View, Text, ImageBackground} from 'react-native';

export default class ServicesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    render() {
        console.log(this.props.data);
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.props.data ? this.props.data.map((item,index) => {
                    return (
                        <View style={styles.listItem} key={index}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>${item.price / 100}</Text>
                            <Text style={styles.time}>{item.time} minutes</Text>
                            {item.description.map((item,index) => {
                                return (
                                    <Text key={index} style={styles.description}>•{item}</Text>
                                )})
                            }
                        </View>
                    )
                }) : null}
            </ScrollView>
        );
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
        width: '100%',
        paddingBottom: 75,
    },
    listItem: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    name: {
        fontSize: 30,
        fontFamily: 'nanum-gothic',
        padding: 15,
        color: '#ffffff',
        backgroundColor: 'rgba(53, 96, 68, 1)',
        width: '100%',
        textAlign: 'center'
    },
    price: {
        fontSize: 25,
        marginTop: 15,
        marginBottom: 5,
        fontFamily: 'nanum-gothic',
    },
    time: {
        fontSize: 20,
        paddingVertical: 5,
        fontFamily: 'nanum-gothic',
    },
    description: {
        fontSize: 15,
        paddingVertical: 5,
        fontFamily: 'nanum-gothic',
        textAlign: 'center'
    }
});
