import React from 'react';
import {Text} from 'react-native';

export default class RefreshText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    render() {
        return (
            <Text style={{ fontSize: 13, marginBottom: 3 }}>Pull down to refresh</Text>
        );
    }
}
