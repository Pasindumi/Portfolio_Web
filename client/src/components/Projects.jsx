import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaStar } from "react-icons/fa";
import "./Projects.css";

import techstrikeImg from "../assets/techstrike.png";
import posfrontendImg from "../assets/posfrontenfd.png";
import backendGif from "../assets/chiullgrand backend.gif";
import easyautofrontendImg from "../assets/easyautofrontend.png";
import easyautoadminImg from "../assets/easyautoadmin.png";
import lmsImg from "../assets/lmsspringboot.png";

const projectsData = [
  {
    id: 1,
    title: "Techstrike Club Official Website",
    period: "Sep 2025 – Jan 2026",
    featured: true,
    description: "Full-featured web app for CINEC Campus tech club with event management, user registration, and Admin Dashboard. Deployed live on Vercel.",
    tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    liveDemo: "https://techstrike.vercel.app/",
    code: "https://github.com/Pasindumi/Techstrike_WebSite",
    image: techstrikeImg
  },
  {
    id: 2,
    title: "Chill Grand Restaurant – POS Frontend",
    period: "Nov 2025 – Present",
    featured: true,
    description: "Real-client POS frontend with QR-based ordering, live menu display, and responsive cashier interface synced with backend API.",
    tech: ["React.js", "Tailwind CSS", "REST APIs"],
    liveDemo: "#",
    code: "https://github.com/Pamod0504/chillgrand-restaurant-frontend",
    image: posfrontendImg
  },
  {
    id: 3,
    title: "Chill Grand Restaurant – POS Backend",
    period: "Nov 2025 – Present",
    featured: false,
    description: "REST API backend for Chill Grand POS handling orders, billing, and ML-powered bill verification and inventory prediction.",
    tech: ["Node.js", "Python", "PostgreSQL", "Machine Learning"],
    liveDemo: "#",
    code: "https://github.com/Pamod0504/chillgrand-restaurant-api",
    image: backendGif
  },
  {
    id: 4,
    title: "Learning Management System (LMS)",
    period: "Jan 2026 – Present",
    featured: true,
    description: "Java Spring Boot LMS with Firebase backend, course and assignment CRUD, and automated email notifications. Live on Koyeb.",
    tech: ["Java", "Spring Boot", "Firebase", "JavaMailSender"],
    liveDemo: "https://inappropriate-clare-lmsstudy-9381bc75.koyeb.app/",
    code: "https://github.com/Pasindumi/LMS-SpringBoot",
    image: lmsImg
  },
  {
    id: 5,
    title: "Parking Spot Finder",
    period: "2025 – Present",
    featured: true,
    description: "Flutter mobile app for real-time parking discovery, slot reservation, Google Maps navigation, online payments, and Admin Panel.",
    tech: ["Flutter", "Dart", "Firebase", "MySQL", "Google Maps API"],
    liveDemo: "#",
    code: "https://github.com/Pasindumi/parking_spot_finder",
    image: null
  },
  {
    id: 6,
    title: "Easy Auto – Mobile App Frontend",
    period: "Nov 2025 – Present",
    featured: true,
    description: "Cross-platform mobile app for vehicle buying/selling with service booking, vehicle tracking, and PayHere secure payments.",
    tech: ["React Native", "REST APIs", "PayHere"],
    liveDemo: "#",
    code: "https://github.com/Pasindumi/Easy_Auto_Application_Frontend",
    image: easyautofrontendImg
  },
  {
    id: 7,
    title: "Easy Auto – Mobile App Backend",
    period: "Nov 2025 – Present",
    featured: false,
    description: "Scalable Node.js REST API for Easy Auto handling listings, bookings, payments, and AWS S3 image storage.",
    tech: ["Node.js", "PostgreSQL", "AWS S3", "PayHere"],
    liveDemo: "#",
    code: "https://github.com/Pasindumi/Easy_Auto_Application_Backend",
    image: backendGif
  },
  {
    id: 8,
    title: "Easy Auto – Admin Dashboard",
    period: "Nov 2025 – Present",
    featured: false,
    description: "Web admin panel for Easy Auto with full control over users, listings, bookings, and platform analytics.",
    tech: ["React.js", "Node.js", "PostgreSQL", "REST APIs"],
    liveDemo: "#",
    code: "https://github.com/Pasindumi/Easy_Auto_Application_Admin",
    image: easyautoadminImg
  }
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title"><span>My</span> Projects</h2>
        </motion.div>

        <div className="project-grid">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="project-img-wrapper">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-cover-img" />
                ) : (
                  <div className="project-img-placeholder">💻</div>
                )}
              </div>

              <div className="project-content">
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <h4 className="project-period">{project.period}</h4>
                  <p className="project-desc">{project.description}</p>
                </div>

                <div className="project-tech">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-pill">{t}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-action btn-demo">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                  <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn-action btn-code">
                    <FaGithub /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
