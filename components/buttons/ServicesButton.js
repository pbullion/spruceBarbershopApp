import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

class ServicesButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        // console.log('home screen props', this.props.currentUser);
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <View style={styles.customerButton}>
                    <Text style={styles.customerButtonText}>{this.props.line1}</Text>
                    {this.props.line2 ? <Text style={styles.customerButtonText}>{this.props.line2}</Text> : null}
                </View>
            </TouchableOpacity>
        );
    }
}

export default ServicesButton

const styles = StyleSheet.create({
    customerButton: {
        height: 75,
        width: 175,
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(53, 96, 68, 1)',
        backgroundColor: 'rgba(53, 96, 68, 1)',
        marginVertical: 15,
        borderRadius: 5,
    },
    customerButtonText: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 6,
        fontFamily: 'neutra-text-light'
    },
    head: { height: 40, backgroundColor: '#f1f8ff', alignItems: 'center' },
    tableHeaderText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center', fontFamily: 'nanum-gothic' },
});
