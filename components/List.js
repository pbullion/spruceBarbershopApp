import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import spruceLogo from "../assets/images/logos/spruceLogo.png";

export default class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            modalVisible: false,
            item: {
                first_name: null,
                last_name: null,
                monday: null,
                tuesday: null,
                wednesday: null,
                thursday: null,
                friday: null,
                saturday: null,
                sunday: null,
            }
        };
    }

    convertTime = (time) => {
        console.log(time);
        if (time) {
            const newtime = time.split(':'); // convert to array

// fetch
            const hours = Number(newtime[0]);
            const minutes = Number(newtime[1]);
            const seconds = Number(newtime[2]);

// calculate
            let timeValue;

            if (hours > 0 && hours <= 12) {
                timeValue = "" + hours;
            } else if (hours > 12) {
                timeValue = "" + (hours - 12);
            } else if (hours === 0) {
                timeValue = "12";
            }

            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

            console.log(timeValue);
            return timeValue;
        } else {
            return "OFF"
        }
    };

    setModalVisible = (visible, item) => {
        this.setState({modalVisible: visible});
        this.setState({item: item});
    };
    hideModal = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        presentationStyle="pageSheet"
                        visible={this.state.modalVisible}>
                        <View style={styles.modal}>
                            <View style={{padding: 15, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.logoContainer}>
                                    <Image style={styles.logo} source={{ uri: this.state.item.staffpicture }} />
                                </View>
                                <Text style={{ padding: 0, fontSize: 40, color: '#ffffff'}}>
                                    {this.state.item.first_name} {this.state.item.last_name}'s
                                </Text>
                                <Text style={{ padding: 0, fontSize: 40, color: '#ffffff'}}>
                                    Schedule
                                </Text>
                            </View>
                            <Text style={styles.hoursText}>Monday: {this.convertTime(this.state.item.monday_start)} - {this.convertTime(this.state.item.monday_end)}</Text>
                            <Text style={styles.hoursText}>Tuesday: {this.convertTime(this.state.item.tuesday_start)} - {this.convertTime(this.state.item.tuesday_end)}</Text>
                            <Text style={styles.hoursText}>Wednesday: {this.convertTime(this.state.item.wednesday_start)} - {this.convertTime(this.state.item.wednesday_end)}</Text>
                            <Text style={styles.hoursText}>Thursday: {this.convertTime(this.state.item.thursday_start)} - {this.convertTime(this.state.item.thursday_end)}</Text>
                            <Text style={styles.hoursText}>Friday: {this.convertTime(this.state.item.friday_start)} - {this.convertTime(this.state.item.friday_end)}</Text>
                            <Text style={styles.hoursText}>Saturday: {this.convertTime(this.state.item.saturday_start)} - {this.convertTime(this.state.item.saturday_end)}</Text>
                            <Text style={styles.hoursText}>Sunday: {this.convertTime(this.state.item.sunday_start)} - {this.convertTime(this.state.item.sunday_end)}</Text>
                                <TouchableOpacity style={styles.customerButton} onPress={() => this.hideModal(!this.state.modalVisible)}>
                                    <Text style={styles.customerButtonText}>Return</Text>
                                </TouchableOpacity>
                        </View>
                    </Modal>
                {this.props.data ? this.props.data.map((item,index) => {
                    return (
                        <TouchableItem  key={index} onPress={() => this.setModalVisible(true, item)}>
                            <View style={{ width: '100%' }}>
                                <Animatable.View animation="bounceIn">
                                    <Card style={styles.card}>
                                        <Card.Cover source={{ uri: item.staffpicture }} style={styles.cardCover}/>
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
                        </TouchableItem>
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
        marginVertical: 8,
        // height: 1000
    },
    cardCover: {
        width: '100%',
        height: Dimensions.get('window').width > 500 ? 500 : 250
    },
    modal: {
        backgroundColor: '#356044',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    hoursText: {
      padding: 10,
      fontSize: 20,
      color: '#ffffff'
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 70,
    },
    customerButton: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: .5,
        borderColor: '#356044',
        backgroundColor: '#356044',
        marginVertical: 15,
        borderRadius: 25,
    },
    customerButtonText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'nanum-gothic'
    }
});
