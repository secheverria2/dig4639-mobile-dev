import React from 'react';
import {View, Text, StyleSheet} from "react-native";
const headers = {
    "method": "GET",
    "headers": {
        "api": "echeverria",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {profile: []};

  }

  componentDidMount() {

    window.fetch("http://plato.mrl.ai:8080/profile", headers)
    .then((res) => res.json())
    .then((data) => {
      this.setState({profile: data});
    });
  }

  render() {
    return (
        <View>
            <Text>Name: { this.state.profile.name }</Text>
            <Text>Contacts: { this.state.profile.count }</Text>
        </View>
    );
  }
}

export default Profile;