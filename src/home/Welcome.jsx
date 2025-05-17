// import { Link, animateScroll as scroll } from "react-scroll";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Close icon
import {
  FaReact,
  FaCode,
  FaJava,
  FaDatabase,
  FaGit,
  FaCloud,
  FaArrowUp,
  FaEnvelope,
  FaLinkedin,
  FaTimes,
  FaBars,
  FaFileAlt,
  FaGithub,
} from "react-icons/fa"; // Import icons
import { SiApachekafka } from "react-icons/si";
import "./Welcome.css";
import Modal, { ModalBody, ModalHeader } from "./Modal";
import ThemeSelector from "./ThemeSelector";
import { useAutoVhHeight } from "./useAutoVhHeight";

function NavItem({ to, label }) {
  return (
    <a href={`#${to}`} className="nav-link">
      {label}
    </a>
  );
}

// Back To Top Button
function BackToTop() {
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(false);
  let isScrolling = false;

  useEffect(() => {
    const divElement = document.getElementById("body_container");

    const handleScroll = () => {
      if (divElement) {
        setScrollPosition(divElement.scrollTop);
      }
    };

    const handleWheel = (event) => {
      if (!divElement || isScrolling) return;
      event.preventDefault(); // prevent normal scroll

      isScrolling = true;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextScroll = divElement.scrollTop + direction * window.innerHeight;

      divElement.scrollTo({
        top: nextScroll,
        behavior: "smooth",
      });

      // Debounce next scroll
      setTimeout(() => {
        isScrolling = false;
      }, 200); // Adjust delay as needed
    };

    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
      divElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
        divElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    setVisible(scrollPosition > 300);
  }, [scrollPosition]);

  const scrollToPosition = () => {
    const divElement = document.getElementById("body_container");
    if (divElement) {
      divElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToPosition}
      className={`scroll-to-top ${visible ? "visible" : "hidden"}`}
    >
      <FaArrowUp size={20} />
    </button>
  );
}

// Section Component
function Section({ id, content, classProp }) {
  return (
    <section id={id} className={`section ${classProp}`}>
      {content}
    </section>
  );
}

// Main Welcome Component
export default function Welcome() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-container">
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">MyPortfolio</h1>

          <div className="navbar-second-section">
            <ThemeSelector />
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
              <NavItem
                to="home"
                label="Home"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="experience"
                label="Experience"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="projects"
                label="Projects"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="skills"
                label="Skills"
                onClick={() => setIsOpen(false)}
              />
              <NavItem
                to="contact"
                label="Contact"
                onClick={() => setIsOpen(false)}
              />
            </ul>
            <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>
      <div className="body_container" id="body_container">
        <Section
          id="home"
          classProp="home_page"
          content={<HomeAboutSection />}
        />
        <Section
          id="experience"
          classProp="experience_section"
          content={<ExperienceContent />}
        />
        <Section id="projects" content={<ProjectsContent />} />
        <Section id="skills" content={<SkillsContent />} />
        <Section
          id="contact"
          classProp="contact_section"
          content={<ContactContent />}
        />
        <BackToTop />
      </div>
    </div>
  );
}

function HomeAboutSection() {
  const sectionRef = useAutoVhHeight();
  const handleDownload = async () => {
    const pdfUrl = `https://anusha-mandya-krishna.github.io/portfolio/Anusha_M_K_Resume.pdf`;
    
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Anusha_software_developer.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={sectionRef}>
      <div className="home-about-section">
        <div style={{ display: "flex" }}>
          <div className="left-section">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ marginTop: "1.5rem" }}
            >
              Hello, I'm
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Anusha Krishna
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Software Developer
            </motion.h3>
            <div className="action-buttons">
              <a onClick={handleDownload} download aria-label="Download Resume">
                <FaFileAlt size={20} style={{ marginRight: "0.5rem" }} />
                Resume
              </a>
              <div className="action_btn_container">
                <a
                  href="https://www.linkedin.com/in/anusha-m-k-0925b02ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn_styles"
                  aria-label="Visit LinkedIn Profile"
                >
                  <FaLinkedin size={24} style={{ marginRight: "1rem" }} />
                </a>
                <a
                  href="https://github.com/Anusha-Mandya-Krishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn Profile"
                  className="btn_styles"
                >
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="right-section">
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Enthusiastic MSc Software Development graduate with 2+ years of
              experience in designing and delivering scalable, high-performance
              software solutions. Proficient in Golang and cloud-native
              architectures, with expertise in building distributed,
              event-driven systems. Skilled in developing maintainable,
              efficient, and secure applications within Agile frameworks.
            </motion.p>
            <div className="experience-education">
              <motion.div
                className="card"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Experience</h3>
                <p>
                  2+ years of hands-on experience building scalable, distributed backend systems using Golang, Java, cloud-native technologies.
                </p>
              </motion.div>
              <motion.div
                className="card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3>Education</h3>
                <p>
                  MSc Software Development - University of Strathclyde (2023 -
                  2024)
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  const sectionRef = useAutoVhHeight();
  return (
    <div ref={sectionRef}>
      <div className="experience-content">
        <motion.h2
          className="experience-title"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>
        <div className="experience-container">
          <motion.section
            className="experience-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-left">
              <h3>Software Developer - Edu-Easy</h3>
              <p>Sep 2024 - Mar 2025</p>
              <p className="description">
                Developed and maintained high-performance, distributed backend
                services using Golang.
              </p>
              <div className="responsibilities">
                <p>
                  <strong>Key Responsibilities:</strong>
                </p>
                <ul>
                  <li>
                    Designed and implemented Microservices for scalable
                    service-to-service communication.
                  </li>
                  <li>
                    Utilized goroutines and channels to enhance concurrency,
                    improving system throughput.
                  </li>
                  <li>
                    Worked on fault-tolerant distributed architectures with high
                    availability.
                  </li>
                  <li>Optimized API response times and system efficiency.</li>
                  <li>
                    Conducted performance tuning and debugging in distributed
                    environments.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
          <motion.section
            className="experience-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-left">
              <h3>Software Backend Developer - C-Square Info Solutions</h3>
              <p>Apr 2022 - Aug 2023</p>
              <p className="description">
                Worked on server-side applications using Go (Golang) and Java.
              </p>
              <div className="responsibilities">
                <p className="heading">
                  <strong>Key Responsibilities:</strong>
                </p>
                <ul>
                  <li>
                    Optimized queries and data structures to improve API
                    response times.
                  </li>
                  <li>
                    Launched a key feature that increased user engagement by
                    30%.
                  </li>
                  <li>
                    Developed event-driven applications using Kafka for
                    distributed message streaming.
                  </li>
                  <li>
                    Integrated SQL databases and optimized queries for
                    high-traffic systems.
                  </li>
                  <li>
                    Collaborated with frontend teams for seamless React-Golang
                    integrations.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useAutoVhHeight();

  const projects = [
    {
      id: 1,
      title: "MySmartShala",
      description:
        "MySmartShala is an EdTech platform that digitizes educational institutions by providing a paperless system for managing assignments, evaluations, and student-teacher communication.",
      roles: [
        "Built the backend system for student-teacher communication.",
        "Developed RESTful APIs using Golang for real-time interactions.",
        "Collaborated with frontend teams for seamless integration.",
      ],
      link: "https://www.mysmartshala.com/",
    },
    {
      id: 2,
      title: "Abbott",
      description:
        "Abbott OSV is a comprehensive Sales Information System designed to streamline sales reporting and data access for Abbott’s sales teams.",
      roles: [
        "Developed and maintained backend services using Golang.",
        "Optimized system performance and reduced response times.",
        "Implemented event-driven architectures using Kafka.",
        "Worked on real-time order processing features.",
      ],
      link: "https://www.abbott.in/",
    },
    {
      id: 3,
      title: "SFA 360",
      description:
        "SFA360 is a cloud-based Sales Force Automation platform that automates lead management, field force tracking, and reporting.",
      roles: [
        "Developed frontend features using React.",
        "Built RESTful APIs using Golang and integrated them with React.",
        "Optimized database queries with PostgreSQL and MS SQL.",
      ],
      link: "https://sfa360.in/",
    },
  ];

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedProject]);

  return (
    <React.Fragment>
      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)}>
          <ModalBody>
            <AnimatePresence>
              {selectedProject && (
                <motion.div
                  className="modal-content"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <button
                    className="modal-close-btn"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X size={24} />
                  </button>
                  <h3>{selectedProject.title}</h3>
                  <p>
                    <strong>Description:</strong> {selectedProject.description}
                  </p>
                  <div>
                    <strong>Roles & Responsibilities:</strong>
                    <ul>
                      {selectedProject.roles.map((role, index) => (
                        <li key={index}>{role}</li>
                      ))}
                    </ul>
                  </div>
                  {selectedProject.link && (
                    <div>
                      <strong>Project Link:</strong>{" "}
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        {selectedProject.link}
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </ModalBody>
        </Modal>
      )}
      <div ref={sectionRef} style={{ width: "100%" }}>
        <div className="projects-content">
          <motion.h2
            className="projects-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Projects
          </motion.h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button
                  className="view-details-btn"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function SkillsContent() {
  const sectionRef = useAutoVhHeight();
  return (
    <div ref={sectionRef} style={{ width: "100%" }}>
      <div id="skills" className="skills-container">
        <h2 className="skills-title">Skills</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <FaCode className="skill-icon" style={{ color: "#1e40af" }} />
            <h3 className="skill-title">Golang</h3>
          </div>

          <div className="skill-card">
            <FaJava className="skill-icon" style={{ color: "#dc2626" }} />
            <h3 className="skill-title">Java</h3>
          </div>

          <div className="skill-card">
            <FaReact className="skill-icon" style={{ color: "#3b82f6" }} />
            <h3 className="skill-title">React</h3>
          </div>

          <div className="skill-card">
            <FaDatabase className="skill-icon" style={{ color: "#ea580c" }} />
            <h3 className="skill-title">HTML</h3>
          </div>

          <div className="skill-card">
            <FaCloud className="skill-icon" style={{ color: "#0d9488" }} />
            <h3 className="skill-title">CSS</h3>
          </div>

          <div className="skill-card">
            <FaDatabase className="skill-icon" style={{ color: "#9333ea" }} />
            <h3 className="skill-title">SQL</h3>
          </div>

          <div className="skill-card">
            <FaGit className="skill-icon" style={{ color: "black" }} />
            <h3 className="skill-title">Git</h3>
          </div>

          <div className="skill-card">
            <SiApachekafka
              className="skill-icon"
              style={{ color: "#16a34a" }}
            />
            <h3 className="skill-title">Kafka</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  const sectionRef = useAutoVhHeight();
  return (
    <div ref={sectionRef}>
      <div className="contact-content-container">
        <h2 className="contact-heading">Contact</h2>
        <div className="contact-card">
          <h3 className="contact-title">Get in Touch</h3>
          <p className="contact-description">
            Feel free to reach out to me via email or LinkedIn!
          </p>
          <div className="contact-buttons">
            <a href="mailto:mkanushagowda@gmail.com" className="contact-button">
              <FaEnvelope size={20} />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/anusha-m-k-0925b02ab/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              <FaLinkedin size={20} />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
