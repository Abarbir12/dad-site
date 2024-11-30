'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = {
  about: `We are at the forefront of energy development, pioneering innovative solutions that power progress while preserving our planet. Our team of experts is dedicated to creating sustainable energy sources that will shape the future of global power consumption and distribution.`,
  team: `Our team consists of industry leaders and innovators:

• John Doe - CEO & Founder
• Jane Smith - CTO
• Mike Johnson - Lead Engineer
• Sarah Brown - Project Manager`,
  contact: `We'd love to hear from you. Reach out to us for any inquiries or collaborations at contact@energyfuture.com.`
}

export function ChatInterface() {
  const [output, setOutput] = useState<string[]>(['Welcome to /dev/energy-future. What would you like to know?'])
  const [options, setOptions] = useState<string[]>(['about', 'team', 'contact'])
  const bottomRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleOptionClick = (option: string) => {
    setOutput(prev => [...prev, `> ${option}`, sections[option as keyof typeof sections]])
    setOptions(['about', 'team', 'contact'])
  }

  return (
    <div className="relative z-10">
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 30%)`,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
      />
      <div className="mb-4 h-[calc(100vh-200px)] overflow-y-auto bg-white p-4 rounded-lg shadow">
        <AnimatePresence>
          {output.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {options.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

