import React from 'react';
import { motion } from 'framer-motion';

export default function NavBar(): JSX.Element {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4}} style={{padding:8}}>
      <div style={{fontWeight:700}}>Pro-2 Assistant</div>
    </motion.div>
  );
}
