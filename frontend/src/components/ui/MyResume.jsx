import { useRef } from 'react';
import { Download, Mail, Github, Calendar, Award, Code, BookOpen, Briefcase, User } from 'lucide-react';
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

function MyResume({user}) {
const resumeRef = useRef();

const handleDownload = async () => {
  try {
    const element = resumeRef.current;
    const canvas = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;

    const pageHeight = 277;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(canvas, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(canvas, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${user.firstName}_Resume.pdf`);
  } catch (err) {
    console.error("Error generating PDF", err);
  }
};

const formatDate = (dateStr) => {
  if (dateStr === "Present") return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  }); 
};


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6 print:hidden">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Download size={20} />
            Download Resume
          </button>
        </div>

        <div ref={resumeRef}  className="bg-white shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={user.profileImage.secureUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{user.firstName}</h1>
                <p className="text-xl text-blue-100 mb-4">Full Stack Developer</p>
                <div className="flex flex-col md:flex-row gap-4 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{user.emailId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github size={16} />
                    <a href={user.github} className="hover:text-white transition-colors">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{user.summary}</p>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              </div>
              {user.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                    </div>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              </div>
              {user.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6 pb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-green-600 font-medium mb-2">{edu.school}</p>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar size={16} />
                      <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    </div>
                    <p className="text-gray-700">{edu.description}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Technical Skills</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {user.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-center font-medium shadow-md"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}

export default MyResume;