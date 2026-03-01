import React from "react";
import { motion } from "framer-motion";

const About = () => (
  <section id="about" className="about">
    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
      About Me
    </motion.h2>

    <div className="about-content">
      <motion.p initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
        Hello, I am Pasindu Amarasinghe, a BSc (Hons) Software Engineering undergraduate with a strong passion for technology and innovation.
      </motion.p>

      
    </div>
  </section>
);

export default About;
