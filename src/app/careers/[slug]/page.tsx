
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import ApplicationForm from "@/components/careers/application-form";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, Brain, Heart, Briefcase, Timer } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

const JOB_DETAIL_QUERY = `
  *[_type == "job" && slug.current == $slug][0] {
    title,
    department,
    location,
    type,
    description,
    requirements,
    publishedAt,
    lastDate,
    salary,
    workingHours,
    probationPeriod,
    benefits,
    softSkills
  }
`;

export default async function JobPage({ params }: PageProps) {
  const { slug }  = await params;
  const job = await client.fetch(JOB_DETAIL_QUERY, { slug });

  if (!job) {
    notFound();
  }

  const sections = [
    { 
      label: "Salary", 
      value: job.salary, 
      icon: TbCurrencyTaka,
      visible: !!job.salary 
    },
    { 
      label: "Working Hours", 
      value: job.workingHours, 
      icon: Clock,
      visible: !!job.workingHours 
    },
    { 
      label: "Probation Period", 
      value: job.probationPeriod, 
      icon: Timer,
      visible: !!job.probationPeriod 
    },
    { 
      label: "Job Type", 
      value: job.type, 
      icon: Briefcase,
      visible: !!job.type 
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/careers"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Link>
        
        {/* Header Section */}
        <div className="mb-10 border-b border-border/40 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {job.department}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              {job.location}
            </span>
             <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              Posted: {new Date(job.publishedAt).toLocaleDateString()}
            </span>
             {job.lastDate && (
                <span className="flex items-center gap-1.5 text-sm text-red-400">
                  <Calendar className="w-3.5 h-3.5" />
                  Apply by: {new Date(job.lastDate).toLocaleDateString()}
                </span>
             )}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">{job.title}</h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-12">
            
            {/* Quick Stats Grid */}
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sections.filter(s => s.visible).map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-card border border-border">
                    <stat.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className="font-semibold text-sm">{stat.value}</p>
                  </div>
                ))}
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
              <h2 className="text-2xl font-bold mb-4 text-foreground">About the Role</h2>
              <PortableText 
                value={job.description} 
                components={{
                  block: {
                    normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                    h3: ({children}) => <h3 className="text-xl font-bold mb-3 mt-6 text-foreground">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-semibold mb-2 mt-4 text-foreground">{children}</h4>,
                  },
                  list: {
                    bullet: ({children}) => <ul className="space-y-2 mb-6">{children}</ul>,
                    number: ({children}) => <ol className="space-y-2 mb-6 list-decimal list-inside">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({children}) => (
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{children}</span>
                      </li>
                    ),
                    number: ({children}) => <li className="pl-1">{children}</li>,
                  }
                }}
              />
            </div>
            
            {/* Requirements */}
            {job.requirements && (
                <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Requirements</h2>
                <PortableText 
                  value={job.requirements} 
                  components={{
                    block: {
                      normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                      h3: ({children}) => <h3 className="text-xl font-bold mb-3 mt-6 text-foreground">{children}</h3>,
                      h4: ({children}) => <h4 className="text-lg font-semibold mb-2 mt-4 text-foreground">{children}</h4>,
                    },
                    list: {
                      bullet: ({children}) => <ul className="space-y-2 mb-6">{children}</ul>,
                      number: ({children}) => <ol className="space-y-2 mb-6 list-decimal list-inside">{children}</ol>,
                    },
                    listItem: {
                      bullet: ({children}) => (
                        <li className="flex items-start gap-2.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{children}</span>
                        </li>
                      ),
                      number: ({children}) => <li className="pl-1">{children}</li>,
                    }
                  }}
                />
                </div>
            )}

            {/* Soft Skills */}
            {job.softSkills && job.softSkills.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                   <Brain className="w-6 h-6 text-primary" /> 
                   Soft Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.softSkills.map((skill: string) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

             {/* Benefits */}
             {job.benefits && job.benefits.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                   <Heart className="w-6 h-6 text-primary" /> 
                   Benefits
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {job.benefits.map((benefit: string) => (
                    <li key={benefit} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <ApplicationForm jobTitle={job.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
