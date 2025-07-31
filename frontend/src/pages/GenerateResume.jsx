import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaBrain,
  FaTrash,
  FaPaperPlane,
  FaEdit,
  FaRocket,
  FaMagic,
  FaPlusCircle,
} from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import Resume from "../components/ui/Resume";
import axiosClient from "../utils/axiosClient";

const defaultValues = {
  personalInformation: {
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    linkedIn: "",
    gitHub: "",
    portfolio: "",
  },
  summary: "",
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  interests: [],
  achievements: [],
  description: "",
};

const GenerateResume = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const description = watch("description");
  const formData = watch(); // ✅ current full form data for preview

  const [currentStep, setCurrentStep] = useState("input");
  const [loading, setLoading] = useState(false);

  // Field arrays
  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });
  const achievementsFields = useFieldArray({ control, name: "achievements" });

  const onSubmit = (data) => {
    setCurrentStep("preview");
    toast.success("Resume updated successfully!", {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description!");
      return;
    }

    try {
      setLoading(true);
      const responseData = await axiosClient.post("/chat/resume/generate", {
        description,
      });

      const jsonString =
        responseData.data.response.candidates[0].content.parts[0].text;
      const cleanText = jsonString.replace(/```json\n?/, "").replace(/```$/, "");
      const parsedData = JSON.parse(cleanText);

      reset(parsedData); // ✅ update form values
      setCurrentStep("form");
      toast.success("Resume generated successfully!", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error generating resume!");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name, label, type = "text", placeholder = "") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text font-medium text-base-content dark:text-white pb-1.5">
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="input input-bordered input-info dark:border-none placeholder:text-gray-400 text-black dark:text-blue-300 w-full bg-base-100 dark:bg-white/20"
      />
    </div>
  );

  const renderTextarea = (name, label, rows = 3, placeholder = "") => (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text font-medium text-base-content dark:text-white pb-1.5">
          {label}
        </span>
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="textarea textarea-bordered textarea-info w-full bg-base-100 dark:bg-white/10 placeholder:text-gray-400 dark:border-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );

  const renderFieldArray = (fields, label, name, fieldKeys) => (
    <div className="form-control w-full mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaMagic className="text-primary" />
        <h3 className="text-xl font-bold text-base-content dark:text-white">
          {label}
        </h3>
      </div>

      {fields.fields.map((field, index) => (
        <div
          key={field.id}
          className="card dark:bg-white/10 border border-black/10 dark:border-white/15 shadow-md p-4 mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldKeys.map((key) => {
              if (key === "technologiesUsed") {
                return renderTextarea(
                  `${name}.${index}.${key}`,
                  "Technologies Used (comma-separated)",
                  2,
                  "React, Node.js, MongoDB..."
                );
              }
              return renderInput(
                `${name}.${index}.${key}`,
                key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1"),
                key.includes("email")
                  ? "email"
                  : key.includes("phone")
                  ? "tel"
                  : key.includes("link") || key.includes("hub")
                  ? "url"
                  : "text",
                getPlaceholder(key)
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => fields.remove(index)}
            className="btn btn-error text-white btn-sm mt-3 gap-2"
          >
            <FaTrash />
            Remove {label.slice(0, -1)}
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          fields.append(fieldKeys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))
        }
        className="btn btn-dash btn-primary btn-outline gap-2"
      >
        <FaPlusCircle />
        Add {label.slice(0, -1)}
      </button>
    </div>
  );

  const getPlaceholder = (key) => {
    const placeholders = {
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      linkedIn: "https://linkedin.com/in/johndoe",
      gitHub: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev",
      jobTitle: "Senior Software Developer",
      company: "Tech Company Inc.",
      duration: "2021 - Present",
      degree: "Bachelor of Computer Science",
      university: "Stanford University",
      graduationYear: "2019",
      title: "Project/Certification Title",
      name: "English (Native)",
      level: "Expert",
    };
    return placeholders[key] || "";
  };

  const InputStep = () => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 dark:bg-purple-500/20 shadow-2xl">
        <div className="card-body text-center">
          <div className="mb-6">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4 border border-white/10">
              <FaBrain className="text-4xl text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
              AI Resume Generator
            </h1>
            <p className="text-lg opacity-70 dark:text-white">
              Tell us about yourself and let AI create your professional resume
            </p>
          </div>

          <textarea
            {...register("description", { required: "Description is required" })}
            disabled={loading}
            className="textarea textarea-bordered textarea-success bg-white dark:bg-purple-500/50 w-full h-48 mb-6 resize-none text-base dark:text-white"
            placeholder="I am a software developer with 5 years of experience in React and Node.js..."
            autoFocus
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled={loading}
              onClick={handleGenerate}
              className="btn btn-primary btn-lg gap-2 min-w-48"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Generating...
                </>
              ) : (
                <>
                  <FaMagic />
                  Generate Resume
                </>
              )}
            </button>

            <button
              onClick={() => reset(defaultValues)}
              className="btn btn-ghost btn-lg border-black/20 dark:border-white/20 dark:hover:text-black dark:text-white gap-2"
              disabled={loading}
            >
              <FaTrash />
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FormStep = () => (
    <div className="relative z-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-secondary/10 dark:bg-white/10 rounded-full mb-4">
            <BiBook className="text-4xl text-secondary dark:text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2 dark:text-green-500">
            Review & Edit Your Resume
          </h1>
          <p className="text-lg opacity-70 dark:text-gray-300">
            Fine-tune the generated information before creating your final resume
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="card bg-base-100 dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-lg">
            <div className="card-body">
              <h2 className="card-title dark:text-white text-2xl mb-4 flex items-center gap-2">
                <FaMagic className="text-primary" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput("personalInformation.fullName", "Full Name")}
                {renderInput("personalInformation.email", "Email", "email")}
                {renderInput("personalInformation.phoneNumber", "Phone", "tel")}
                {renderInput("personalInformation.location", "Location")}
                {renderInput("personalInformation.linkedIn", "LinkedIn", "url")}
                {renderInput("personalInformation.gitHub", "GitHub", "url")}
              </div>
            </div>
          </div>

          <div className="card bg-base-100 dark:bg-white/15 border border-black/10 dark:border-white/10 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl text-black dark:text-white mb-4 flex items-center gap-2">
                <FaMagic className="text-primary" />
                Professional Summary
              </h2>
              {renderTextarea("summary", "Summary", 4)}
            </div>
          </div>

          <div className="space-y-6">
            {renderFieldArray(skillsFields, "Skills", "skills", ["title", "level"])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(certificationsFields, "Certifications", "certifications", [
              "title",
              "issuingOrganization",
              "year",
            ])}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}
            {renderFieldArray(achievementsFields, "Achievements", "achievements", [
              "title",
              "year",
              "extraInformation",
            ])}
            <div className="grid md:grid-cols-2 gap-6">
              {renderFieldArray(languagesFields, "Languages", "languages", ["name"])}
              {renderFieldArray(interestsFields, "Interests", "interests", ["name"])}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setCurrentStep("input")}
              className="btn btn-ghost border border-black/20 dark:border-white/20 dark:text-white dark:hover:text-black btn-lg gap-2"
            >
              <FaTrash />
              Start Over
            </button>
            <button type="submit" className="btn btn-soft btn-primary btn-lg gap-2 min-w-48">
              <FaRocket />
              Generate Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const PreviewStep = () => (
    <div className="min-h-screen p-4 relative z-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 dark:text-yellow-500">
          Your Professional Resume
        </h1>
        <p className="text-lg opacity-70 dark:text-gray-300">
          Here's your beautifully crafted resume ready for download
        </p>
      </div>
      <Resume data={formData} />
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentStep("input")}
          className="btn btn-ghost btn-lg border border-black/10 dark:border-white/30 dark:text-white dark:hover:text-black gap-2"
        >
          <FaMagic />
          Generate New
        </button>
        <button
          onClick={() => setCurrentStep("form")}
          className="btn btn-soft btn-secondary btn-lg gap-2"
        >
          <FaEdit />
          Edit Resume
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen pt-15">
      <Toaster />
      {currentStep === "input" && <InputStep />}
      {currentStep === "form" && <FormStep />}
      {currentStep === "preview" && <PreviewStep />}
    </div>
  );
};

export default GenerateResume;
