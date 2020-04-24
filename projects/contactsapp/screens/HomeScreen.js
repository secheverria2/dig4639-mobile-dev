import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Button, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView} from 'react-native';
import { Card } from 'react-native-elements'

const HEADERS = {
  "method": "GET",
    "headers": {
    "api":"echeverria",
    "Content-Type" : "application/json",
    "Accept":"application/json"
  }
}

const HEADERS2 = {
  "method": "POST",
  "headers": {
    "api":"echeverria",
    "Content-Type" : "application/json",
    "Accept":"application/json"
  }
}


export default class HomeScreen extends React.Component {
  state = {
    contacts:[], 
    userName:"", 
    number:"", 
    add:[], 
    delete:[]
  }

  callApi() {
    fetch("http://plato.mrl.ai:8080", HEADERS)
    .then(response => response.json())
    .then(body => console.log(body))
   }

   componentDidMount() {
     console.log("Effect has run")
     this.profile();
     this.setState({contacts:[]})
     new Promise((resolve, reject) => {
         resolve(fetch("http://plato.mrl.ai:8080/contacts", HEADERS)
            .then(response => response.json())
            .then(body => this.setState({contacts:body.contacts})))})
     }

   add() {
    console.log(this.state.userName)
    console.log(this.state.number)
    var userName = this.state.userName 
    var userNumber = this.state.number 
    var newContacts = this.state.contacts.concat({name:userName, number:userNumber, 
    position:'1'})
    this.setState({contacts:newContacts})
    console.log(this.state.contacts); 
    fetch("http://plato.mrl.ai:8080/contacts/add", 
      {
        ...HEADERS2,
        body: JSON.stringify({name: this.state.userName, number: this.state.number })
      })
      .then(() => this.profile())
      
        }

  

  delete = (position) => {
    console.log('test'); 
    var newContacts = [...this.state.contacts]
    var lastContact = newContacts.filter( (v,i) => position != i)
    this.setState({contacts:lastContact})
    fetch ('http://plato.mrl.ai:8080/contacts/remove' , { 
      method: "POST", 
      headers: { 
        "API": "echeverria", 
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({position: position})
    }) 
    .then(() => this.profile())
      } 

      profile() {
        fetch ('http://plato.mrl.ai:8080/profile', { 
          "method": "GET", 
          "headers": { 
            "API": "echeverria", 
            "Content-Type": "application/json", 
            "Accept": "application/json"
          }
      }) 
        .then(response => response.json())
        .then((body) => { 
          console.log(body)
          console.log(body.name)
          console.log(body.count)
          this.setState({ 
            name: body.name, 
            count: body.count, 

          })

        })}               

  
   render() {
  return (
  
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TextInput style = {styles.input}
        placeholder = "  Enter Contact's Name"
        placeholderTextColor = "#516365"
        onChangeText={text => {
          this.setState({userName:text})
        }}
      />
       <TextInput style = {styles.input}
        placeholder = "  Enter Contact's Number"
        placeholderTextColor = "#516365"
        onChangeText={text => {
          this.setState({number:text})
        }}
      />

      <Text style={{ textAlign: 'center' }}>Name:

      {this.state.name}

      </Text> 

      <Text style={{ textAlign: 'center' }}>Number of Contacts: 

       {this.state.count}
       
       </Text>

      <Button
        color = "#516365"
        style = {styles.submitButton}
        title="Add Contact "
        onPress = {() => this.add()}>
        </Button>

  
         
  


      <Button 
        onPress={() => this.callApi()}
        color = "#516365"
        title="Call the API"
        accessibilityLabel="Calls the remote API for contacts"
      />

      
    
    
        {
        this.state.contacts.map((contact, i) => <>
         <Card key={i} title={`name: ${contact.name} number: ${contact.number}`} >

        <Button 
        onPress ={ () => this.delete(i)} 
        color = "#7F9D9D"
        title = "Delete Contact" 
        /> 

  
         </Card>

         </>) 
      }
      </ScrollView> 

      </View>
  );
}
}
HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    margin: 50,
      height: 50,
      borderColor: '#7F9D9D',
      borderWidth: 2.5
     
  },
  submitButton: {
    backgroundColor: '#E77051',
    padding: 10,
    width: 40, 
    height:40,
 },

});

