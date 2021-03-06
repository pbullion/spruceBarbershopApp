import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import * as Animatable from "react-native-animatable";
import {
    Title,
    Paragraph,
    Card,
    Caption
} from 'react-native-paper';

export default class ServicesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.props.data ? this.props.data.map((item,index) => {
                    return (
                        <View style={{ width: '100%' }} key={index}>
                            <Animatable.View animation="bounceInUp">
                                <Card style={styles.card}>
                                    <Card.Content style={styles.cardContent}>
                                        <Title style={{ color: '#ffffff', fontFamily: 'neutra-text-light', fontSize: 25 }}>{item.name.toUpperCase()}</Title>
                                        <Text style={styles.subTitle}>${item.price / 100}</Text>
                                        <Text style={styles.subTitle}>{item.time} MINUTES</Text>
                                        <View>
                                            {item.description.map((item,index) => {
                                                return (
                                                    <Text key={index} style={{ textAlign: 'center', color: '#ffffff', fontFamily: 'neutra-text-light', padding: 3 }}>• {item.toUpperCase()}</Text>
                                                )})
                                            }
                                        </View>
                                    </Card.Content>
                                </Card>
                            </Animatable.View>
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
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5
    },
    card: {
        marginHorizontal: 4,
        backgroundColor: '#356044',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'neutra-text-light'
    },
    subTitle: {
        fontSize: 22,
        paddingBottom: 5,
        color: '#ffffff',
        fontFamily: 'neutra-text-light'
    }
});
