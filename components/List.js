import React from 'react';
import {ScrollView, StyleSheet, View, Text, ImageBackground} from 'react-native';

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
                        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }} key={index}>
                            {item.imgURL ?
                            <ImageBackground source={{uri: item.imgURL}} style={[styles.image, {height: this.props.imageHeight}]}>
                                <Text style={styles.listItem}>{item.title}</Text>
                            </ImageBackground> :
                                null}
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
        width: '100%'
    },
    image: {
        width: '100%',
        opacity: .8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 75
    },
    listItem: {
        fontSize: 30,
        fontFamily: 'nanum-gothic',
        color: '#ffffff'
    }
});
