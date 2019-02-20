import React from 'react';
import {Alert, ScrollView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import * as Animatable from "react-native-animatable";
import {
    Title,
    Paragraph,
    Card,
    Caption
} from 'react-native-paper';
import connect from "react-redux/es/connect/connect";
import {addService1, addService2, addStaffMember} from "../actions";

class TouchableServicesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem = (props, secondService, item) => {
        if (!secondService) {
            this.props.addService1(item);
            Alert.alert(
                'Would you like to select another service?',
                '',
                [
                    {text: 'Yes', onPress: () => props.props.navigation.navigate('WaitTimes5')},
                    {text: 'No', onPress: () => props.props.navigation.navigate('WaitTimes7')},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ],
                { cancelable: false }
            );
        } else {
            this.props.addService2(item);
            props.props.navigation.navigate('WaitTimes7')
        }
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.props.data ? this.props.data.map((item,index) => {
                    return (
                        <View style={{ width: '100%' }} key={index}>
                            <Animatable.View animation="bounceInUp">
                                <TouchableOpacity onPress={() => this.selectItem(this.props, this.props.secondService, item)}>
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
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    )
                }) : null}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        waitListFlow: state.waitListFlow
    }
}

export default connect(mapStateToProps, { addStaffMember, addService1, addService2 })(TouchableServicesList)

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
    },
    subTitle: {
        fontSize: 18,
        paddingBottom: 5,
        color: '#ffffff'
    }
});
