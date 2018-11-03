import React from 'react';
import axios from 'axios/index';
import ListComponent from "../../components/List";

export default class BeardOilScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    static navigationOptions = {
        title: 'Barbers',
    };

    render() {
        return (
            <ListComponent data={this.state.data} imageHeight={650}/>
        );
    }

    componentDidMount() {
        axios.get(`http://api.jsonbin.io/b/5b69b7d92b23fb1f2b70a7ea/6`)
            .then(res => {
                const data = res.data.menu.breakfast;
                this.setState({ data });
            });
    }
}
