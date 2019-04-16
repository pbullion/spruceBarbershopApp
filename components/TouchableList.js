import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
    Title,
    Paragraph,
    Card,
} from 'react-native-paper';
import { addStaffMember, addService } from "../actions";
import * as Animatable from "react-native-animatable";
import connect from "react-redux/es/connect/connect";

class TouchableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.selectItem = this.selectItem.bind(this);
    }

    selectItem = (props, item) => {
        // console.log("***********************************staff member item", item);
        this.props.addStaffMember(item);
        props.props.navigation.navigate('WaitTimes3')
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.props.data ? this.props.data.map((item,index) => {
                    return (
                        <View key={index} style={{ width: '100%' }}>
                            <Animatable.View animation="bounceIn">
                                <TouchableOpacity onPress={() => this.selectItem(this.props, item)}>
                                    <Card style={styles.card}>
                                        <Card.Cover source={{ uri: item.staffpicture }} style={{ width: '100%' }}/>
                                        <Card.Content>
                                            <Title>{item.first_name} {item.last_name}</Title>
                                            <Paragraph>
                                                The Abandoned Ship is a wrecked ship located on Route 108 in
                                                Hoenn, originally being a ship named the S.S. Cactus.
                                            </Paragraph>
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

export default connect(mapStateToProps, { addStaffMember })(TouchableList)

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
});
