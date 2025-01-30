import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RiddleQuestion from './RiddleQuestion'

function App() {
  const [count, setCount] = useState(0)
  const [questions, setQuestions] = useState([
    {
      question:"This is a long ass question to see how it will look like? So anyways how was your day been? Tell me everything in detail please or i will be mad!",
      options:["red", "blue", "green", "black"],
      answer:"blue",
      message_right:"Yes! You are correct! The sky is very blue like a river",
      message_wrong:"Uggh you got that one wrong! The sky is actually blue!"
    },
    {
      question:"Who is the real God?",
      options:["Jesus", "Zeus", "Trump", "Allah"],
      answer:"Allah",
      message_right:"Yes! Allah wakbar babe!",
      message_wrong:"Istaghfarallh its allah ofcource"
    },
    {
      question:"How old is Beanie?",
      options:["5", "4", "3", "2"],
      answer:"2",
      message_right:"Yes! She is a young bi***!",
      message_wrong:"You think she is that old!"
    },
    {
      question:"How tall am I?",
      options:["4'11", "5'3","5'6", "5'7"],
      answer:"5'7",
      message_right:"Yes! Sucks to be average height!",
      message_wrong:"How dare you think I am that short!"
    }
  ])

  return (
    <>
    {questions.map((question, index)=>{
      return(
        <RiddleQuestion index={index} question={question}/>

      )
    })}
    
    </>
  )
}

export default App
