import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Resume.css";
import Certificates from "./Certificates"; // Reusing existing component for one of the tabs

const AccordionItem = ({ title, subtitle, date, description, delay, isOpenInitially }) => {
    const [isOpen, setIsOpen] = useState(isOpenInitially || false);

    return (
        <motion.div
            className={`accordion-item ${isOpen ? 'open' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <h4 className="acc-title">{title}</h4>
            <div className="acc-meta">
                <span className="acc-subtitle">{subtitle}</span>
                <span className="acc-date">{date}</span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="acc-desc-wrapper"
                    >
                        <p className="acc-desc">{description}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="acc-divider">
                <div className="acc-line"></div>
                <button className="acc-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? '−' : '+'}
                </button>
            </div>
        </motion.div>
    );
};

const Resume = () => {
    const [activeTab, setActiveTab] = useState("skills");

    const tabs = [
        { id: "skills", label: "Technical Skills" },
        { id: "journey", label: "Education & Experience" },
        { id: "certifications", label: "Certifications" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "journey":
                return (
                    <motion.div
                        key="journey"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="resume-content-section"
                    >
                        <div className="journey-header">
                            <h2><span>My</span> Resume</h2>
                        </div>

                        <div className="journey-grid">
                            <div className="journey-column">
                                <div className="column-header-container">
                                    <span className="column-supertitle">Academic Background</span>
                                    <h4 className="column-title">Education</h4>
                                </div>
                                <AccordionItem
                                    title="BSc (Hons) in Software Engineering"
                                    subtitle="CINEC Maritime Campus, Malabe"
                                    date="Sep 2022 - Present"
                                    description="Currently pursuing a Bachelor of Science Honors degree in Software Engineering, focusing on advanced software design, modern programming paradigms, and real-world technological solutions."
                                    delay={0.1}
                                    isOpenInitially={true}
                                />
                            </div>
                            <div className="journey-column">
                                <div className="column-header-container">
                                    <span className="column-supertitle">Professional Experience</span>
                                    <h4 className="column-title">Experience & Volunteering</h4>
                                </div>
                                <AccordionItem
                                    title="Director"
                                    subtitle="Techstrike Club, CINEC Campus"
                                    date="2025 – 2026"
                                    description="Lead club activities, organized events, and managed team projects."
                                    delay={0.2}
                                    isOpenInitially={true}
                                />
                                <AccordionItem
                                    title="Professional Development Head"
                                    subtitle="Techstrike Club, CINEC Campus"
                                    date="2024 – 2025"
                                    description="Planning web development and IoT projects, guided team members."
                                    delay={0.3}
                                    isOpenInitially={false}
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case "skills":
                const skillsData = [
                    {
                        category: "Programming Languages",
                        skills: [
                            { name: "Java", level: 80 },
                            { name: "Python", level: 85 },
                            { name: "C", level: 70 },
                            { name: "C++", level: 70 }
                        ]
                    },
                    {
                        category: ".NET Development",
                        skills: [
                            { name: "ASP.NET Core", level: 75 },
                            { name: "C#", level: 75 },
                            { name: "MVC Architecture", level: 70 },
                            { name: "Web APIs", level: 75 }
                        ]
                    },
                    {
                        category: "Server-side Development",
                        skills: [
                            { name: "Node.js", level: 80 },
                            { name: "Express.js", level: 80 },
                            { name: "PHP", level: 70 },
                            { name: "RESTful APIs", level: 80 }
                        ]
                    },
                    {
                        category: "Web Design & Development",
                        icon: "🌐",
                        skills: [
                            { name: "Next.js", level: 75 },
                            { name: "React", level: 85 },
                            { name: "JavaScript", level: 85 },
                            { name: "TypeScript", level: 80 },
                            { name: "HTML", level: 90 },
                            { name: "CSS", level: 90 },
                            { name: "TailwindCSS", level: 85 }
                        ]
                    },
                    {
                        category: "Database Technologies",
                        skills: [
                            { name: "MySQL", level: 85 },
                            { name: "MongoDB", level: 80 },
                            { name: "PostgreSQL", level: 75 }
                        ]
                    },
                    {
                        category: "Cloud & DevOps",
                        skills: [
                            { name: "AWS", level: 70 },
                            { name: "Docker", level: 65 },
                            { name: "Linux", level: 70 },
                            { name: "Git", level: 85 }
                        ]
                    },
                    {
                        category: "Mobile App Development",
                        skills: [
                            { name: "Flutter", level: 75 },
                            { name: "Dart", level: 70 },
                            { name: "React Native", level: 85 },
                            { name: "App Deployment", level: 80 }
                        ]
                    },
                    {
                        category: "Software Design Tools",
                        skills: [
                            { name: "Figma", level: 65 },
                            { name: "Adobe XD", level: 70 },
                            { name: "Selenium", level: 65 }
                        ]
                    },
                    {
                        category: "Project Management",
                        skills: [
                            { name: "Jira", level: 80 },
                            { name: "Agile Practices", level: 80 },
                            { name: "Scrum", level: 75 },
                            { name: "GitHub", level: 90 }
                        ]
                    }
                ];

                return (
                    <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="resume-content-section"
                    >
                        <div className="resume-section-heading">
                            <span className="timeline-date">Expertise</span>
                            <h3>Technical Skills</h3>
                        </div>

                        <div className="skills-grid-container">
                            {skillsData.map((skillCategory, index) => (
                                <motion.div
                                    key={index}
                                    className="skill-category-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <h3 className="category-title">
                                        {skillCategory.category}
                                    </h3>
                                    <div className="skills-list">
                                        {skillCategory.skills.map((skill, i) => (
                                            <div className="skill-item" key={i}>
                                                <div className="skill-info">
                                                    <span className="skill-name">{skill.name}</span>
                                                    <span className="skill-percentage">{skill.level}%</span>
                                                </div>
                                                <div className="skill-bar-bg">
                                                    <motion.div
                                                        className="skill-bar-fill"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${skill.level}%` }}
                                                        transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                                        viewport={{ once: true }}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                );
            case "certifications":
                return (
                    <motion.div
                        key="certifications"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="resume-content-section certs-override"
                    >
                        <Certificates />
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <section id="resume" className="resume-section">
            <div className="resume-container">
                <h2 className="section-title">Resume</h2>

                <div className="resume-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`resume-tab-btn ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="resume-content-wrapper">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Resume;
