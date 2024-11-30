'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-blue-500 opacity-10" 
        style={{ y }}
      />
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
        >
          About Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-blue-300 leading-relaxed"
        >
          We are at the forefront of energy development, pioneering innovative solutions that power progress while preserving our planet. Our team of experts is dedicated to creating sustainable energy sources that will shape the future of global power consumption and distribution.
        </motion.p>
      </div>
    </section>
  )
}

