'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-blue-900 opacity-10" 
        style={{ y }}
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8">
            Get in Touch
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-blue-300 mb-4">
            We'd love to hear from you. Reach out to us for any inquiries or collaborations.
          </motion.p>
          <motion.a
            href="mailto:contact@energyfuture.com"
            variants={itemVariants}
            className="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 inline-block"
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            contact@energyfuture.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

