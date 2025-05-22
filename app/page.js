'use client'

import { useState, useRef, useEffect } from "react"
import { Box, Button, Stack, TextField, createTheme} from "@mui/material";
import { green, teal } from "@mui/material/colors";

export default function Home() {

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: green,
    },
  })

  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi! I'm Final Stretch's Support Agent. How may I help you today?`
    },
  ])

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async() => {
    if (!message.trim() || isLoading) return
    setIsLoading(true)

    setMessage('')
    setMessages((messages)=>[
      ...messages, 
      {role: "user", content: message},
      {role: "assistant", content: ''}
    ])

    try {
      const response = fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      }).then(async (res) => {
        const reader = res.body.getReader()  
        const decoder = new TextDecoder()  
    
        let result = ''

        return reader.read().then(function processText({ done, value }) {
          if (done) {
            return result
          }
          const text = decoder.decode(value || new Uint8Array(), { stream: true })  
          setMessages((messages) => {
            let lastMessage = messages[messages.length - 1]
            let otherMessages = messages.slice(0, messages.length - 1)  
            return [
              ...otherMessages,
              { ...lastMessage, content: lastMessage.content + text }, 
            ]
          })
          return reader.read().then(processText) 
        })
      })
    } 
    catch (error) {
    console.log('Error:', error)
    setMessages((messages) => [
      ...messages,
      {
        role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later"
      },
    ])
    }
    setIsLoading(false)
  }
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftkey){
      event.preventDefault()
      sendMessage()
    }
  }

  return (
  <Box
  width = '100vw'
  height = '100vh'
  displays = 'flex'
  flexDirection = 'column'
  justifyContent= 'center'
  alignItems= 'center'
  bgcolor={'white'}
  >
    <Stack
    direction = {"column"}
    width = "500px"
    height = "700px"
    border = "1px solid grey"
    p = {2}
    spacing = {3}
    >
      <Stack
      direction = {"column"}
      spacing = {2}
      flexGrow = {1}
      overflow = "auto"
      maxheight = "100%"
      >
        {
          messages.map((message, index) => (
            <Box key = {index}
            display = 'flex'
            justifyContent = {
              message.role=== 'assistant' ? 'flex-start' : 'flex-end'
            }>
              <Box
              bgcolor = {
                message.role === 'assistant' ? '#03a9f4' : '#607d8b'
              }
              color = "white"
              borderRadius = {16}
              p = {3}
              >
                {message.content}
              </Box>
            </Box>
          ))
        }
        <div ref ={messagesEndRef} />
      </Stack>
      <Stack
      direction = "row"
      spacing = {2}
      >
        <TextField
        label = "Message"
        fullWidth
        value = {message}
        onChange = {(e) => setMessage(e.target.value)}
        onKeyPress = {handleKeyPress}
        disabled = {isLoading}
        />
        <Button
        variant = "contained"
        onClick = {sendMessage}
        disabled = {isLoading}
        bgcolor = '#607d8b'
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Stack>
    </Stack>
  </Box>
  )
}
