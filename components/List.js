import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';
import * as Animatable from "react-native-animatable";

export default class ListComponent extends React.Component {
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
                        <View key={index} style={{ width: '100%' }}>
                            <Animatable.View animation="bounceIn">
                                <Card style={styles.card}>
                                    <Card.Cover source={{ uri: item.staffpicture }} style={{ width: '100%' }}/>
                                    <Card.Content>
                                        <Title>{item.first_name} {item.last_name}</Title>
                                        <Paragraph>
                                            The Abandoned Ship is a wrecked ship located on Route 108 in
                                            Hoenn, originally being a ship named the S.S. Cactus. The second
                                            part of the ship can only be accessed by using Dive and contains
                                            the Scanner.
                                        </Paragraph>
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
        backgroundColor: '#356044',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 5
    },
    card: {
        marginHorizontal: 4,
        marginVertical: 8
    },
});
