import React, { useState } from 'react';
import {
    Code,
    Database,
    Globe,
    Server,
    Mail,
    Github,
    MapPin,
    Send,
    Star,
    Calendar,
    Briefcase,
    GraduationCap,
    Menu,
    X,
    Download,
    ExternalLink,
    Heart,
} from 'lucide-react';

const MyPortfolio = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    console.log("my portfolio bhai", user);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-white">
                            {user?.firstName} {user?.lastName}<span className="text-orange-500">.</span>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            {['home', 'about', 'experience', 'contact'].map((section) => (
                                <button key={section} onClick={() => scrollToSection(section)} className="text-gray-300 hover:text-orange-500 transition-colors duration-300">
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </button>
                            ))}
                        </nav>
                        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
                            <nav className="flex flex-col space-y-4 mt-4">
                                {['home', 'about', 'experience', 'contact'].map((section) => (
                                    <button key={section} onClick={() => scrollToSection(section)} className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-left">
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero */}
            <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center pt-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-orange-500 text-lg font-medium">Hello.</p>
                                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">I'm <span className="text-orange-500">{user.firstName}</span></h1>
                                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-300">Full Stack Developer</h2>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                                Passionate full-stack developer with expertise in JavaScript, React, Node.js, and MongoDB.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href={user?.linkedin} target="_blank" rel="noopener noreferrer" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                                    <ExternalLink size={20} /> Linkedin
                                </a>
                                <a href={user?.github} target="_blank" rel="noopener noreferrer" className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                                    <ExternalLink size={20} /> My GitHub
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 p-2">
                                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                        <img src={user?.profileImage?.secureUrl} alt="Sonu" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-500/10 rounded-full blur-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="about" className="py-20 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {user.summary}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
                            {user?.skills?.map((skill, index) => {
                                //   const Icon = skill.icon;
                                return (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-white font-medium">{skill}</span>
                                            </div>
                                            {skill?.level &&
                                                <span className="text-gray-400">{skill?.level}%</span>
                                            }
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-1000"
                                                style={{ width: `${skill?.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="experience" className="py-20 bg-gray-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Experience & Education</h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {user?.experience?.map((exp) => (
                            <div key={exp._id} className="mb-16">
                                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <Briefcase className="text-orange-500" size={24} />
                                    Professional Experience
                                </h3>

                                <div className="relative">
                                    <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-orange-500"></div>

                                    <div className="relative bg-gray-900 p-8 rounded-xl ml-16 border-l border-orange-500">
                                        <div className="absolute -left-3 top-8 w-6 h-6 bg-orange-500 rounded-full border-4 border-gray-800"></div>

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <h4 className="text-xl font-bold text-white">{exp.position}</h4>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Calendar size={16} />
                                                <span>
                                                    {new Date(exp.startDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                    })}{" "}
                                                    -{" "}
                                                    {new Date(exp.endDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-orange-500 font-medium mb-4">
                                            <MapPin size={16} />
                                            <span>{exp.company}</span>
                                        </div>

                                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <GraduationCap className="text-orange-500" size={24} />
                                Education
                            </h3>

                            <div className="relative">
                                <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-orange-500"></div>

                                {user?.education?.map((edu, index) => (
                                    <div
                                        key={edu._id || index}
                                        className="relative bg-gray-900 p-8 rounded-xl ml-16 border-l border-orange-500 mb-8"
                                    >
                                        <div className="absolute -left-3 top-8 w-6 h-6 bg-orange-500 rounded-full border-4 border-gray-800"></div>

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                            <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <Calendar size={16} />
                                                <span>
                                                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-orange-500 font-medium mb-4">
                                            <MapPin size={16} />
                                            <span>{edu.school}</span>
                                        </div>

                                        <p className="text-gray-300 leading-relaxed mb-4">
                                            Specialized in {edu.fieldOfStudy} with focus on software development, algorithms, and system design.
                                            <br />
                                            {edu.description?.trim() && (
                                                <span>{edu.description}</span>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="py-20 bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
                        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    Whether you have a project in mind, want to collaborate, or just want to say hello,
                                    I'd love to hear from you. Feel free to reach out through any of the channels below.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                        <Mail className="text-orange-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Email</h4>
                                        <a href="mailto:mdsonu74621@gmail.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                                            {user?.emailId}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                        <Github className="text-orange-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">GitHub</h4>
                                        <a
                                            href="https://github.com/CodeBase404"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-orange-500 transition-colors"
                                        >
                                            {user?.github}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                                        <MapPin className="text-orange-500" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Location</h4>
                                        <p className="text-gray-400">{user?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-white font-medium mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-white font-medium mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white font-medium mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                                        placeholder="Tell me about your project or just say hello..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default MyPortfolio;
