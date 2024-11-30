'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

interface Message {
  type: 'command' | 'response' | 'options'
  content: string[]
}

const sections = {
  about: `We are at the forefront of energy development, pioneering innovative solutions that power progress while preserving our planet. Our team of experts is dedicated to creating sustainable energy sources that will shape the future of global power consumption and distribution.`,
  team: `Our team consists of industry leaders and innovators:

• John Doe - CEO & Founder
• Jane Smith - CTO
• Mike Johnson - Lead Engineer
• Sarah Brown - Project Manager`,
  contact: `Want to know more? Reach out to us at contact@energyfuture.com`
}

const GlowingBubble = () => {
  const controls = useAnimation()
  const bubbleRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const bounds = document.documentElement.getBoundingClientRect()
    let currentX = Math.random() * bounds.width
    let currentY = Math.random() * bounds.height

    controls.start({
      scale: [0, 1],
      left: currentX,
      top: currentY,
      transition: { duration: 0.3, ease: "easeOut" }
    }).then(() => {
      const angle = Math.random() * Math.PI * 2
      const speed = 100 + Math.random() * 150
      let directionX = Math.cos(angle) * speed
      let directionY = Math.sin(angle) * speed
      let lastTime = performance.now()

      const animate = () => {
        const now = performance.now()
        const deltaTime = (now - lastTime) / 1000
        lastTime = now

        const bounds = document.documentElement.getBoundingClientRect()
        const bubble = bubbleRef.current?.getBoundingClientRect()
        
        if (bubble) {
          const effectiveRadius = bubble.width / 2 + 3
            // increased blur radius

          // Update position
          currentX += directionX * deltaTime
          currentY += directionY * deltaTime

          // Check horizontal boundaries
          if (currentX + effectiveRadius > bounds.width) {
            currentX = bounds.width - effectiveRadius
            directionX = -Math.abs(directionX)
          } else if (currentX - effectiveRadius < 0) {
            currentX = effectiveRadius
            directionX = Math.abs(directionX)
          }

          // Check vertical boundaries
          if (currentY + effectiveRadius > bounds.height) {
            currentY = bounds.height - effectiveRadius
            directionY = -Math.abs(directionY)
          } else if (currentY - effectiveRadius < 0) {
            currentY = effectiveRadius
            directionY = Math.abs(directionY)
          }

          controls.set({ left: currentX, top: currentY })
        }

        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    })
  }, [controls]) // Add controls to dependency array

  return (
    <motion.div
      ref={bubbleRef}
      className="fixed w-16 h-16 rounded-full bg-blue-500 opacity-20 blur-xl"
      initial={{ scale: 0 }}
      animate={controls}
    />
  )
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const validCommands = useMemo(() => ['about', 'team', 'contact'], [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { type: 'response', content: ['Welcome! Choose an option or type a command:'] },
        { type: 'options', content: validCommands }
      ])
    }
  }, [messages.length, validCommands])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTyping) return

      if (e.key === 'Enter' && currentCommand.trim()) {
        const command = currentCommand.trim().toLowerCase()
        if (validCommands.includes(command)) {
          handleOptionClick(command)
        } else {
          setMessages(prev => [
            ...prev,
            { type: 'command', content: [command] },
            { type: 'response', content: ['Invalid command. Available commands: about, team, contact'] }
          ])
        }
        setCurrentCommand('')
      } else if (e.key === 'Backspace') {
        setCurrentCommand(prev => prev.slice(0, -1))
      } else if (e.key.length === 1) {
        setCurrentCommand(prev => prev + e.key)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentCommand, isTyping, validCommands])

  const handleOptionClick = async (option: string) => {
    setIsTyping(true)
    setMessages(prev => [...prev, { type: 'command', content: [option] }])

    let response = ''
    if (option === 'about') {
      response = sections.about
    } else if (option === 'team') {
      response = sections.team
    } else if (option === 'contact') {
      response = sections.contact
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    setMessages(prev => [...prev, { type: 'response', content: [response] }])
    setIsTyping(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-mono flex flex-col relative overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <GlowingBubble key={`bubble-${i}`} />
      ))}
      <main className="flex-grow flex items-stretch relative z-10">
        <div className="w-full flex flex-col px-4">
          <motion.div 
            className="flex items-center mb-4 mt-4 cursor-pointer group"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setMessages([
                { type: 'response', content: ['Welcome! Choose an option or type a command:'] },
                { type: 'options', content: validCommands }
              ])
            }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500 group-hover:animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 ml-2 group-hover:animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 ml-2 group-hover:animate-pulse"></div>
            <span className="ml-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">/dev/energy-future</span>
          </motion.div>
          <div className="flex-grow overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <motion.div
                  key={`message-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  {message.type === 'command' && (
                    <motion.div 
                      className="flex items-center"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                    >
                      <span className="text-green-400 mr-2">❯</span>
                      <span>{message.content[0]}</span>
                    </motion.div>
                  )}
                  {message.type === 'response' && (
                    <motion.div 
                      className="text-gray-400 whitespace-pre-line"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {message.content[0]}
                    </motion.div>
                  )}
                  {message.type === 'options' && (
                    <div className="space-y-2">
                      {message.content.map((option) => (
                        <motion.button
                          key={`option-${option}`}
                          onClick={() => handleOptionClick(option)}
                          className="block text-blue-400 hover:text-blue-300 transition-colors duration-200 relative group"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isTyping}
                        >
                          <motion.span 
                            className="absolute -left-4 opacity-0 text-blue-500"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                          >
                            →
                          </motion.span>
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
            {!isTyping && (
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-green-400 mr-2">❯</span>
                <span>{currentCommand}</span>
                <span className="inline-block w-1 h-4 bg-gray-400 ml-1 animate-blink"></span>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <motion.div 
        className="fixed bottom-4 right-4 text-xs text-gray-600 pointer-events-none select-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Copyright 2024 Adrian Barbir
      </motion.div>
    </div>
  )
}
