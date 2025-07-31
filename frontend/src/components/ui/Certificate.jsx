import React, { useRef } from 'react';
import { Award, Code, Calendar, User, Download } from 'lucide-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toPng } from 'html-to-image';
import signature from "/signature.png";

const Certificate = ({

  user, solved50
}) => {
  const certificateRef = useRef(null);

  const handleDownload = async () => {
    try {
      const element = certificateRef .current;
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
  
      pdf.save(`My_Certificate.pdf`);
    } catch (err) {
      console.error("Error generating PDF", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div ref={certificateRef} className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Decorative Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-6">
          <div className="w-full h-full bg-white rounded-xl"></div>
        </div>

        {/* Certificate Content */}
        <div className="relative p-12 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-4 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
              <Code size={28} />
              <span className="text-xl font-bold">CodeYatra</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800">
              Certificate of Completion
            </h1>
            <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            <p className="text-lg mb-6 text-gray-600">
              This is to certify that
            </p>

            <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <User className="text-blue-500" size={24} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {user?.firstName}{" "}{user?.lastName}
                </h2>
              </div>
            </div>

            <p className="text-lg mb-4 text-gray-600">
              has successfully completed
            </p>

            <div className="mb-20 p-4 rounded-lg bg-blue-50">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                {solved50 && <div>50 Problems Solved on CodeYatra</div>}
              </h3>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Badge */}
            <div className="flex items-center gap-3 p-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg">
              <Award size={24} />
              <span className="font-semibold">Certified Developer</span>
            </div>

            {/* Signature */}
            <div className="text-center">
              <img className='h-15 w-30 rotate-12' src={signature} alt="" />
              <div className="w-32 h-0.5 mb-2 mx-auto bg-gray-300"></div>
              <p className="font-semibold text-gray-800">Sonu Parvej</p>
              <p className="text-sm text-gray-500">Lead Instructor</p>
            </div>
          </div>

          
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 rounded-full opacity-10 bg-blue-500" />
        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full opacity-10 bg-purple-500" />
        <div className="absolute top-20 right-20 w-8 h-8 rounded-full opacity-10 bg-green-500" />
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
      >
        <Download size={20} />
      </button>
    </div>
  );
};

export default Certificate;
