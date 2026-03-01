import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaJava, FaPython, FaReact, FaNodeJs, FaLeaf, FaDatabase, FaAws, FaDocker, FaDownload, FaEye } from "react-icons/fa";
import { SiJavascript, SiExpress, SiMysql, SiMongodb } from "react-icons/si";
import ProfileImage from "../assets/profile.png";
import "./Hero.css";

// --- Social Links ---
const socialLinks = [
  { icon: <FaFacebookF />, url: "https://www.facebook.com/share/1EmNAzhhfF/" },
  { icon: <FaGithub />, url: "https://github.com/Pasindumi" },
  { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/pasindu-amarasinghe-49510a283/" },
];

// --- Typewriter Component (fast typing & deleting) ---
const Typewriter = ({ words, typingSpeed = 100, deletingSpeed = 50, pause = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // pause after typing full word
    if (!deleting && subIndex === words[index].length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    // move to next word after deleting
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, typingSpeed, deletingSpeed, pause]);

  // blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <h2 className="typewriter">
      {words[index].substring(0, subIndex)}
      <span className="cursor">{blink ? "|" : " "}</span>
    </h2>
  );
};

// --- Hero Component ---
const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero-bg-animation">
      <span className="bg-symbol">{"{ }"}</span>
      <span className="bg-symbol">{"</>"}</span>
      <span className="bg-symbol">{"const"}</span>
      <span className="bg-symbol">{"01"}</span>
      <span className="bg-symbol">{"[]"}</span>
      <span className="bg-symbol">{"=>"}</span>
      <span className="bg-symbol">{"#"}</span>
    </div>
    <div className="hero-overlay">
      <div className="hero-content">
        {/* Left - Profile & Social */}
        <motion.div
          className="hero-left"
          initial={{ x: -100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={ProfileImage}
            alt="Profile"
            className="profile-img"
            animate={{
              boxShadow: [
                "0 0 20px #1e90ff",
                "0 0 40px #00bfff",
                "0 0 20px #1e90ff",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          />

          {/* Social buttons */}
          <motion.div
            className="social-container"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <h3 className="social-title">Find Me In</h3>
            <div className="social-buttons">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  whileHover={{
                    scale: 1.2,
                    boxShadow: `0 0 25px #ffffff`,
                    rotate: [0, 10, -10, 0],
                  }}
                  style={{ color: "#ffffff" }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="hero-divider"
          initial={{ height: 0 }}
          animate={{ height: 500 }}
          transition={{ duration: 1.2 }}
        ></motion.div>

        {/* Right - Text */}
        <motion.div
          className="hero-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3>Welcome !</h3>
          <h1>
            Hi, I'm <span className="gold-text">Pasindu Mihiran</span>
          </h1>
          <Typewriter
            words={["a Student", "a Software Developer"]}
            typingSpeed={10}
            deletingSpeed={20}
            pause={3000}
          />
          <p className="hero-description">
            I am an undergraduate Software Engineer with a passion for creating innovative solutions and learning new technologies. I enjoy taking on challenges, leading projects, and turning opportunities into achievements. I strive to grow my skills continuously, embrace responsibility, and contribute effectively to every team I join. With a strong interest in software development, I am eager to face real-world problems and deliver accurate, efficient, and creative solutions.
          </p>

          <div className="hero-bottom-wrap">
            <div className="skills-section">
              <h4 className="skills-title">BEST SKILL ON</h4>
              <div className="skills-grid">
                {/* Row 1 - 4 items */}
                <div className="skill-card"><FaJava /></div>
                <div className="skill-card"><FaPython /></div>
                <div className="skill-card"><FaReact /></div>
                <div className="skill-card"><FaNodeJs /></div>

                {/* Row 2 - 4 items */}
                <div className="skill-card"><FaLeaf /></div> {/* Spring Boot style */}
                <div className="skill-card"><FaDatabase /></div> {/* MySQL */}
                <div className="skill-card"><SiMongodb /></div>
                <div className="skill-card"><FaAws /></div>

                {/* Row 3 - 1 item (will be centered via grid layout) */}
                <div className="skill-card centered-skill"><FaDocker /></div>
              </div>
            </div>

            <div className="hero-btns-container">
              <motion.a
                href="http://localhost:5000/uploads/cv.pdf"
                download="Pasindu_CV.pdf"
                className="cv-download-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload /> Download CV
              </motion.a>

              <ScrollLink
                to="projects"
                smooth={true}
                duration={800}
                offset={-100}
                className="view-work-btn"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaEye /> View My Work
                </motion.span>
              </ScrollLink>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
