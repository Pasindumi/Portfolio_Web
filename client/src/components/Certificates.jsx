import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import "./Certificates.css";

import devopsImg from "../assets/devops.png";
import awsImg from "../assets/aws.png";
import biImg from "../assets/bi.png";
import cert01Img from "../assets/cert01.jpg";
import cert02Img from "../assets/cert02.jpg";

const certificatesData = [
    {
        id: 1,
        title: "AI/ML Engineer – Stage 1",
        date: "Dec 2025 – Present",
        organization: "Faculty of Computing | SLIIT University",
        description:
            "Introduction to Artificial Intelligence and Machine Learning concepts including Python, data preprocessing, and basic model building.",
        image: "/images/cert-aiml.jpg", // Replace with an actual import if you have the image
        link: "#",
    },
    {
        id: 2,
        title: "DevOps Foundation Course",
        date: "Jan 2026",
        organization: "Intellipaat Academy",
        description:
            "Fundamentals of DevOps including CI/CD pipelines, Git, Docker, and automation basics.",
        image: devopsImg,
        link: "https://intellipaat.com/academy/certificate-link/?Yz0xNjU1JnU9MzE5ODkzJmV4dD0x",
    },
    {
        id: 3,
        title: "AWS Fundamentals",
        date: "Jan 2026",
        organization: "Intellipaat Academy",
        description:
            "Core AWS services such as EC2, S3, IAM, and cloud computing fundamentals.",
        image: awsImg,
        link: "https://intellipaat.com/academy/certificate-link/?Yz0xNjU0JnU9MzE5ODkzJmV4dD0x",
    },
    {
        id: 4,
        title: "HackBlast 2024 – 1st Runners Up",
        date: "March 2024",
        organization: "IEEE Student Branch CINEC | Hackathon Competition",
        description:
            "National-level hackathon focused on teamwork, problem solving, and innovative software solutions.",
        image: "/images/cert-hackblast.jpg", // Replace when image available
        link: "#",
    },
    {
        id: 5,
        title: "SQL Analytics and BI on Databricks",
        date: "Jan 2026",
        organization: "Simplilearn",
        description:
            "Advanced SQL analytics, business intelligence, and data visualization using Databricks.",
        image: biImg,
        link: "https://simpli-web.app.link/e/I56BAn3970b",
    },
    {
        id: 6,
        title: "KidneyCare",
        date: "December 2024",
        organization: "CINEC International Research Symposium (CIRS 2024) | CINEC Campus",
        description:
            "Published an abstract and participated in a poster presentation titled “KidneyCare: The Smart App for Early Detection and Management of Kidney Disorders” at the 5th CINEC International Research Symposium held at CINEC Campus, Malabe, Sri Lanka.",
        image: cert01Img,
        link: cert01Img,
        buttonText: "View Certificate"
    },
    {
        id: 7,
        title: "TrueVision: AI-Generated Media Detection ",
        date: "December 2024",
        organization: "CINEC International Research Symposium (CIRS 2024) | CINEC Campus",
        description:
            "Published an abstract and presented research titled “TrueVision: Advanced Detection of AI-Generated and Fake Media Using Deep Learning” at the 5th CINEC International Research Symposium held at CINEC Campus, Malabe, Sri Lanka.",
        image: cert02Img,
        link: cert02Img,
        buttonText: "View Certificate"
    },
];

const Certificates = () => {
    return (
        <section id="certificates" className="certificates-section">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="certificates-container"
            >
                <div className="resume-section-heading">
                    <span className="timeline-date">Achievements</span>
                    <h2>Professional Certifications</h2>
                    <p className="cert-subtitle">
                        Professional certifications and achievements that validate my expertise
                    </p>
                </div>

                <div className="cert-grid">
                    {certificatesData.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            className="cert-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            <div className="cert-image-wrapper">
                                {/* 
                  Using a decorative div as fallback if the image path does not exist yet. 
                  Once you place images in public/images/, they will load.
                */}
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="cert-img"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="cert-img-fallback" style={{ display: 'none' }}>
                                    <div className="cert-fallback-icon">📜</div>
                                </div>
                            </div>

                            <div className="cert-content">
                                <div className="cert-date">
                                    <FaCalendarAlt className="date-icon" />
                                    <span>{cert.date}</span>
                                </div>

                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-org">{cert.organization}</p>
                                <p className="cert-desc">{cert.description}</p>

                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-btn"
                                >
                                    <FaExternalLinkAlt className="btn-icon" /> {cert.buttonText || "View Credential"}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Certificates;
