import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import TouchableItem from "react-navigation/src/views/TouchableItem";

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
                                <Text style={{ padding: 0, fontSize: 40, color: '#ffffff'}}>
                                    {this.state.item.first_name} {this.state.item.last_name}'s
                                </Text>
                                <Text style={{ padding: 0, fontSize: 40, color: '#ffffff'}}>
                                    Schedule
                                </Text>
                            </View>
                            <Text style={styles.hoursText}>Monday: {this.state.item.monday}</Text>
                            <Text style={styles.hoursText}>Tuesday: {this.state.item.tuesday}</Text>
                            <Text style={styles.hoursText}>Wednesday: {this.state.item.wednesday}</Text>
                            <Text style={styles.hoursText}>Thursday: {this.state.item.thursday}</Text>
                            <Text style={styles.hoursText}>Friday: {this.state.item.friday}</Text>
                            <Text style={styles.hoursText}>Saturday: {this.state.item.saturday}</Text>
                            <Text style={styles.hoursText}>Sunday: {this.state.item.sunday}</Text>
                                <TouchableOpacity style={styles.customerButton} onPress={() => this.hideModal(!this.state.modalVisible)}>
                                    <Animatable.View animation="bounceInDown">
                                        <Text style={styles.customerButtonText}>Return</Text>
                                    </Animatable.View>
                                </TouchableOpacity>
                        </View>
                    </Modal>
                {this.props.data ? this.props.data.map((item,index) => {
                    return (
                        <TouchableItem  key={index} onPress={() => this.setModalVisible(true, item)}>
                            <View style={{ width: '100%' }}>
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
        marginVertical: 8
    },
    modal: {
        backgroundColor: 'green',
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
