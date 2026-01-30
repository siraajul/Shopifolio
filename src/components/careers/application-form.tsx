
"use client";

import { useState } from "react";
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ApplicationFormProps {
  jobTitle: string;
}

export default function ApplicationForm({ jobTitle }: ApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget; // Capture form reference
    formData.append("jobTitle", jobTitle); // Ensure job title is sent

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setStatus("success");
      // Reset form
      form.reset();
      setFileName("");
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-green-500">Application Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thanks for applying to be a {jobTitle}. We've received your application and will review it shortly.
        </p>

      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-6 rounded-xl">
      <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">
        Apply for this position
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full h-10 px-3 rounded-md border border-input bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Your Name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full h-10 px-3 rounded-md border border-input bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Your Email Address"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full h-10 px-3 rounded-md border border-input bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          placeholder="Phone Number With Country Code"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="resume" className="text-sm font-medium">
          Resume/CV (PDF, DOCX) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
          />
          <div className="w-full h-12 flex items-center justify-between px-3 rounded-md border border-dashed border-input bg-background/50 hover:bg-accent/5 transition-colors">
            <span className={`text-sm ${fileName ? 'text-primary' : 'text-muted-foreground'}`}>
              {fileName || "Click to upload your resume"}
            </span>
            <Upload className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="coverLetter" className="text-sm font-medium">
          Cover Letter
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          rows={4}
          className="w-full p-3 rounded-md border border-input bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          placeholder="Tell us why you're a great fit..."
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-500 bg-red-500/10 rounded-md">
          <AlertCircle className="w-4 h-4" />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
