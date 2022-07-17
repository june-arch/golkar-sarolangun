import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6 } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
