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
            <Text style={{ fontSize: 12 }}>Pull down to refresh</Text>
        );
    }
}
