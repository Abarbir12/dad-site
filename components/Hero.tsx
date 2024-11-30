'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [text, setText] = useState('')
  const fullText = "Energizing the Future"
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setText(fullText.slice(0, text.length + 1))
    }, 100)

    return () => clearTimeout(timeout)
  }, [text])

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div className="text-center relative z-10" style={{ opacity }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          <span className="inline-block">{text}</span>
          <span className="inline-block animate-blink">|</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-xl md:text-2xl text-blue-300"
        >
          Innovative Energy Solutions for a Sustainable World
        </motion.p>
      </motion.div>
    </section>
  )
}

