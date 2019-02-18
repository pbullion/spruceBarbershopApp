import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';
import * as Animatable from "react-native-animatable";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import {ButtonGroup, SocialIcon, Icon, Tile, Button} from "react-native-elements";
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import {WebBrowser} from "expo";

export default class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            modalVisible: false,
            selectedIndex: 0,
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
        this.updateIndex = this.updateIndex.bind(this);
        this._facebookHandleOpenWithWebBrowser = this._facebookHandleOpenWithWebBrowser.bind(this);
        this._instagramHandleOpenWithWebBrowser = this._instagramHandleOpenWithWebBrowser.bind(this);
    }

    _facebookHandleOpenWithWebBrowser = (link) => {
        this.setState({modalVisible: false});
        WebBrowser.openBrowserAsync(link);
    };

    _instagramHandleOpenWithWebBrowser = (link) => {
        this.setState({modalVisible: false});
        WebBrowser.openBrowserAsync(link);
    };

    _handleAppointmentBooking = (link) => {
        this.setState({modalVisible: false});
        WebBrowser.openBrowserAsync(link);
    };

    convertTime = (time) => {
        // console.log(time);
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

            // timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
            timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

            // console.log(timeValue);
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
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
    viewSelection = () => {
        if (this.state.selectedIndex === 0) {
            return (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.hoursText}>Monday: {this.convertTime(this.state.item.monday_start) !== "OFF" ? this.convertTime(this.state.item.monday_start) + " - " + this.convertTime(this.state.item.monday_end) : "OFF"}</Text>
                    <Text style={styles.hoursText}>Tuesday: {this.convertTime(this.state.item.tuesday_start) !== "OFF" ? this.convertTime(this.state.item.tuesday_start) + " - " + this.convertTime(this.state.item.tuesday_end) : "OFF"}</Text>
                    <Text style={styles.hoursText}>Wednesday: {this.convertTime(this.state.item.wednesday_start) !== "OFF" ? this.convertTime(this.state.item.wednesday_start) + " - " + this.convertTime(this.state.item.wednesday_end) : "OFF"}</Text>
                    <Text style={styles.hoursText}>Thursday: {this.convertTime(this.state.item.thursday_start) !== "OFF" ? this.convertTime(this.state.item.thursday_start) + " - " + this.convertTime(this.state.item.thursday_end) : "OFF"}</Text>
                    <Text style={styles.hoursText}>Friday: {this.convertTime(this.state.item.friday_start) !== "OFF" ? this.convertTime(this.state.item.friday_start) + " - " + this.convertTime(this.state.item.friday_end) : "OFF"}</Text>
                    <Text style={styles.hoursText}>Saturday: {this.convertTime(this.state.item.saturday_start) !== "OFF" ? this.convertTime(this.state.item.saturday_start) + " - " + this.convertTime(this.state.item.saturday_end) : "OFF"}</Text>
                    <Text style={styles.hoursText}>Sunday: {this.convertTime(this.state.item.sunday_start) !== "OFF" ? this.convertTime(this.state.item.sunday_start) + " - " + this.convertTime(this.state.item.sunday_end) : "OFF"}</Text>
                </View>
        )
        } else if (this.state.selectedIndex === 1) {
            return (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontFamily: 'neutra-text-light'}}>COMING SOON</Text>
                </View>
                )
        } else {
            return (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontFamily: 'neutra-text-light'}}>COMING SOON</Text>
                </View>
            )
        }
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
                            <HeaderImageScrollView
                                maxHeight={350}
                                minHeight={100}
                                headerImage={{ uri: this.state.item.staffpicture }}
                                renderForeground={() => (
                                    <View style={{ height: 350, justifyContent: "flex-end", alignItems: "center" }} >
                                        <View style={styles.buttonView}>
                                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                                                <SocialIcon
                                                    raised={true}
                                                    type='instagram'
                                                    onPress={() => this._instagramHandleOpenWithWebBrowser(this.state.item.instagram)}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 45, marginTop: 0, fontFamily: 'neutra-text-bold', fontWeight: 'bold', color: '#ffffff' }}>{this.state.item.first_name + " " + this.state.item.last_name}</Text>
                                        </View>
                                    </View>
                                )}
                            >
                                {this.state.item.appt_only === true && this.state.item.appointment_link === true ?
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                                        <Button
                                        title="Book an Appointment"
                                        titleStyle={{fontFamily: 'neutra-text-light', color: 'blue'}}
                                        buttonStyle={{ backgroundColor: '#356044', width: '100%', fontFamily: 'neutra-text-light' }}
                                        containerStyle={{ width: '100%' }}
                                        onPress={() => this._handleAppointmentBooking(this.state.item.appointment_link)}
                                        />
                                    </View>
                                     : null}
                                <View style={{ height: '100%' }}>
                                    <TriggeringView onHide={() => console.log("text hidden")}>
                                        <ButtonGroup
                                            buttons={['HOURS', 'REVIEWS', 'PICTURES']}
                                            selectedIndex={this.state.selectedIndex}
                                            onPress={selectedIndex => {
                                                this.setState({ selectedIndex });
                                            }}
                                            buttonStyle={{backgroundColor: '#356044'}}
                                            textStyle={{fontFamily: 'neutra-text-light', color: '#ffffff', marginTop: 4}}
                                            containerStyle={{ marginBottom: 20 }}
                                            selectedTextStyle={{ color: '#356044' }}
                                            selectedButtonStyle={{ backgroundColor: '#ffffff' }}
                                        />
                                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                                            {this.viewSelection()}
                                        </ScrollView>
                                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity style={styles.customerButton} onPress={() => this.hideModal(!this.state.modalVisible)}>
                                                <Text style={styles.customerButtonText}>Return</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </TriggeringView>
                                </View>
                            </HeaderImageScrollView>
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
                                            <Title  style={{fontFamily: 'neutra-text-bold', marginTop: 5}}>{item.first_name} {item.last_name}</Title>
                                            <Paragraph  style={{fontFamily: 'neutra-text-light'}}>
                                                {item.bio}
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
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        // height: '100%',
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
        // backgroundColor: '#356044',
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: "100%"
    },
    hoursText: {
      padding: 10,
      fontSize: 20,
      color: '#000000',
      fontFamily: 'neutra-text-light'
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        width: "100%",
        height: 225,
        // borderRadius: 70,
    },
    buttonView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        fontFamily: 'neutra-text-light'
    },
    customerButton: {
        height: 50,
        width: '90%',
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
        fontFamily: 'neutra-text-light'
    }
});
