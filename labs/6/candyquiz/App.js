import React from 'react'; 

import questions from './questions.json'

import {StyleSheet, Text, Button, View } from 'react-native'; 

const TIME_LIMIT = 5
const TITLE_STATE = 0
const QUESTION_STATE = 1

// const FINAL_STATE = 2

class QuizQuestion extends React.Component {
  render() {
    return<>
      <Text>{this.props.question}</Text>

      {this.props.answers.map((v, i) =>

      <Button color="#FF48A5" title={v.text} onPress={()=> this.props.nextQuestion(v.correct)} key={i}/>)}</>
  }
}

class TitlePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      titleText: "How well do you know your sweets?",
      counter: 0,
      currentState: TITLE_STATE,
      currentQuestion: 0
    }
    this.timeLimit = TIME_LIMIT
  }
  nextQuestion(correct) {
    console.log("BUTTON PRESSED")
    if(correct){
      this.setState({score: this.state.score+1})
    }
    if(this.state.currentQuestion === questions.length - 1) {
      console.log("DONE")
    } else {
      clearInterval(this.timer)
        console.log(this.state.currentQuestion)
          this.setState({
          titleText:"You answers X",
          currentState: QUESTION_STATE,
          currentQuestion: this.state.currentQuestion +1
      })
    }
  }
  countdown() {
    console.log("Handling interval")
    console.log(this.state.counter)
    if(this.state.counter < this.timeLimit) {
      this.setState({
        titleText: 'Starting the Quiz',
        counter: this.state.counter +1
      })
    } else {
        this.setState({
          titleText: "Beggining Quiz!",
          currentState: QUESTION_STATE,
          counter: 0
        })
        if(this.state.currentState === TITLE_STATE) {
          this.timer = setInterval(() => this.countdown(), 1000)
          clearInterval(this.timer)
        } else {
          this.setState({titleText:"You answered!"})
        }
        }
      }
    start() {
      console.log("Starting!")
        this.setState({titleText: "Starting the Quiz!", counter: 0})
        this.timer = setInterval(() => this.countdown(), 1000)
    }
    render() {
      return (
        <>
        <Text>{this.timeLimit - this.state.counter}</Text>

        {((this.state.currentState === TITLE_STATE) ?
        <>
        <Text>{this.state.titleText}</Text>

        <Button title="start" onPress={()=>this.start()} />
        </>
        :
          <QuizQuestion answers={questions[this.state.currentQuestion].possibleAnswers} question=
          {questions[this.state.currentQuestion].question} nextQuestion={(correct) => this.nextQuestion(correct)}
          ></QuizQuestion>)}

        <Text>Score: {this.state.score}</Text>
          </>)
    }
    }

    class App extends React.Component {

      render(){
        return (
        <View style = {styles.container}>

        <Text style={styles.Text}>Candy Quiz</Text>


        <TitlePage>Candy Quiz</TitlePage>

        
        </View>
  
  );
}
}
    export default App;


  const styles = StyleSheet.create({

   container: {
      flex: 1,
      backgroundColor: '#E8EFF5',
      alignItems: 'center',
     justifyContent: 'center',
   },
 
   Text: {
    color:"#FF48A5",
    fontSize: "28px", 
  },
 
});