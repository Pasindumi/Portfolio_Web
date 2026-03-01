import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts, uploadCV, markContactAsRead } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaUserShield,
    FaEnvelope,
    FaPhone,
    FaSignOutAlt,
    FaInbox,
    FaFilter,
    FaSearch,
    FaCalendarAlt,
    FaFileUpload,
    FaFilePdf,
    FaCheckCircle,
    FaRegCircle,
    FaEye
} from "react-icons/fa";

const AdminDashboard = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState({ type: "", message: "" });
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
            return;
        }

        const fetchContacts = async () => {
            try {
                const response = await getContacts();
                setContacts(response.data);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/");
    };

    const handleToggleRead = async (id) => {
        try {
            const response = await markContactAsRead(id);
            if (response.data.success) {
                setContacts(contacts.map(c =>
                    c._id === id ? { ...c, read: response.data.read } : c
                ));
            }
        } catch (error) {
            console.error("Error toggling read status:", error);
        }
    };

    const handleViewMessage = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
        // Automatically mark as read when viewed if not already read
        if (!contact.read) {
            handleToggleRead(contact._id);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContact(null);
    };

    const handleCVUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setUploadStatus({ type: "error", message: "Please select a file first" });
            return;
        }

        const formData = new FormData();
        formData.append("cv", selectedFile);

        try {
            setUploadStatus({ type: "info", message: "Uploading..." });
            await uploadCV(formData);
            setUploadStatus({ type: "success", message: "CV Uploaded Successfully!" });
            setSelectedFile(null);
            // Reset after 3 seconds
            setTimeout(() => setUploadStatus({ type: "", message: "" }), 3000);
        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus({ type: "error", message: "Upload failed. Try again." });
        }
    };

    const filteredContacts = contacts.filter(c =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="admin-loading">
            <div className="loader"></div>
            <p>Synchronizing Secure Data...</p>
        </div>
    );

    return (
        <div className="admin-portal">
            <nav className="admin-top-nav">
                <div className="admin-brand">
                    <FaUserShield className="brand-icon" />
                    <span>Admin Portal</span>
                </div>
                <div className="admin-user-info">
                    <span>Logged in as: Pasindu Amarasinghe</span>
                    <button onClick={handleLogout} className="logout-btn-premium">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </nav>

            <div className="admin-content-wrapper">
                <header className="content-header">
                    <div className="header-text">
                        <h1>Platform Overview</h1>
                        <p>Manage visitor inquiries and site analytics</p>
                    </div>
                    <div className="quick-stats">
                        <div className="q-stat">
                            <FaInbox />
                            <span>{contacts.length} Total</span>
                        </div>
                    </div>
                </header>

                <section className="dashboard-grid">
                    <motion.div
                        className="stat-panel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="stat-head">
                            <h3>Engagement Metrics</h3>
                        </div>
                        <div className="stat-body">
                            <div className="main-stat">
                                <span className="label">Total Inquiries</span>
                                <span className="value">{contacts.length}</span>
                            </div>
                            <div className="stat-sub-grid">
                                <div className="sub-stat">
                                    <span className="label text-blue">Active</span>
                                    <span className="value">100%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-panel cv-management"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="stat-head">
                            <h3>CV Management</h3>
                        </div>
                        <div className="stat-body">
                            <p className="sub-text">Upload your latest professional CV (PDF)</p>
                            <form onSubmit={handleCVUpload} className="cv-upload-form">
                                <label className="file-input-label">
                                    <FaFilePdf className="icon" />
                                    {selectedFile ? selectedFile.name : "Select PDF File"}
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </label>
                                {uploadStatus.message && (
                                    <p className={`status-msg ${uploadStatus.type}`}>{uploadStatus.message}</p>
                                )}
                                <button type="submit" className="upload-submit-btn">
                                    <FaFileUpload /> Update Resume
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div
                        className="message-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="section-toolbar">
                            <h2><FaEnvelope /> Inbound Messages</h2>
                            <div className="toolbar-actions">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Search messages..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="filter-btn">
                                    <FaFilter /> Filter
                                </button>
                            </div>
                        </div>

                        <div className="premium-table-container">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th><FaCalendarAlt /> Date</th>
                                        <th>Name</th>
                                        <th>Communication</th>
                                        <th>Topic</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContacts.length > 0 ? (
                                        filteredContacts.map((contact, index) => (
                                            <tr key={contact._id || index} className={contact.read ? 'msg-read' : 'msg-unread'}>
                                                <td data-label="Date">{new Date(contact.createdAt).toLocaleDateString()}</td>
                                                <td data-label="Name" className="font-semibold">{contact.name || "Anonymous"}</td>
                                                <td data-label="Communication">
                                                    <div className="comm-info">
                                                        <span className="email"><FaEnvelope /> {contact.email}</span>
                                                        <span className="phone"><FaPhone /> {contact.phone}</span>
                                                    </div>
                                                </td>
                                                <td data-label="Topic">
                                                    <div className="subject-box">
                                                        <strong>{contact.subject}</strong>
                                                        <p className="truncated-msg">{contact.message}</p>
                                                    </div>
                                                </td>
                                                <td data-label="Status">
                                                    <div className="action-buttons-cell">
                                                        <button
                                                            className="view-btn"
                                                            onClick={() => handleViewMessage(contact)}
                                                            title="View Full Message"
                                                        >
                                                            <FaEye /> View
                                                        </button>
                                                        <button
                                                            className={`status-btn ${contact.read ? 'read' : 'unread'}`}
                                                            onClick={() => handleToggleRead(contact._id)}
                                                        >
                                                            {contact.read ? <FaCheckCircle /> : <FaRegCircle />}
                                                            {contact.read ? 'Read' : 'Mark Read'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="empty-state">
                                                <FaInbox />
                                                <p>No messages matching your criteria</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </section>
            </div>

            {/* Message Viewer Modal */}
            <AnimatePresence>
                {isModalOpen && selectedContact && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <motion.div
                            className="message-modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <div className="modal-title-group">
                                    <h2>{selectedContact.subject}</h2>
                                    <span className="modal-date">{new Date(selectedContact.createdAt).toLocaleString()}</span>
                                </div>
                                <button className="close-modal-btn" onClick={closeModal}>&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="contact-info-strip">
                                    <div className="info-block">
                                        <span className="label">From</span>
                                        <span className="value">{selectedContact.name}</span>
                                    </div>
                                    <div className="info-block">
                                        <span className="label">Email</span>
                                        <span className="value">{selectedContact.email}</span>
                                    </div>
                                    <div className="info-block">
                                        <span className="label">Phone</span>
                                        <span className="value">{selectedContact.phone}</span>
                                    </div>
                                </div>

                                <div className="message-content">
                                    <h3>Message</h3>
                                    <div className="message-text-box">
                                        {selectedContact.message}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="modal-action-btn" onClick={closeModal}>Close View</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
