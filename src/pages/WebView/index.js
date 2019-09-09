import React from 'react';
import proptypes from 'prop-types';
import { WebView } from 'react-native-webview';

class Webview extends React.Component {
    static navigationOptions = ({navigation}) =>({
        title: navigation.state.params.name
    });
    static proptypes = {
        navigation: proptypes.shape({
            navigate: proptypes.func,
        }).isRequired,
    }
    render() {
        const url = this.props.navigation.state.params.url
        return(
            <WebView
                source={{ uri: url }}
            />
        );
    }

}

export default Webview;