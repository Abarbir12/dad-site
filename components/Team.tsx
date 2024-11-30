'use client'

import { motion } from 'framer-motion'

const teamMembers = [
  { name: 'John Doe', linkedin: 'https://www.linkedin.com/in/johndoe' },
  { name: 'Jane Smith', linkedin: 'https://www.linkedin.com/in/janesmith' },
  { name: 'Mike Johnson', linkedin: 'https://www.linkedin.com/in/mikejohnson' },
  { name: 'Sarah Brown', linkedin: 'https://www.linkedin.com/in/sarahbrown' },
]

export default function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Our Team
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="text-center"
            >
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-300 hover:text-blue-400 transition-colors duration-300 inline-block"
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {member.name}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

