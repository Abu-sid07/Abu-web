import React from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

const Header: React.FC = () => {
  return (
    <div className="pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-emerald-500/5 group"
        >
          {/* Subtle noise/texture or pattern inside the card */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }} />

          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
            >
              Blog<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
            >
              This is where I share my writings on programming, tutorials, insights, and my journey as a developer.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-xl group"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-md group-hover:opacity-40 transition duration-500" />
              <div className="relative flex items-center w-full bg-black/60 border border-white/10 rounded-xl overflow-hidden focus-within:border-emerald-500/50 transition-colors">
                <Search className="absolute left-4 text-gray-500" size={20} />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full bg-transparent px-5 py-4 pl-12 text-white placeholder-gray-500 focus:outline-none text-sm md:text-base" 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Header