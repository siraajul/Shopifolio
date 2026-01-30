
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, ArrowLeft } from "lucide-react";

export const revalidate = 60;

const JOBS_QUERY = `*[_type == "job"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  department,
  location,
  type,
  publishedAt
}`;

interface Job {
  _id: string;
  title: string;
  slug: { current: string };
  department: string;
  location: string;
  type: string;
  publishedAt: string;
}

export default async function CareersPage() {
  const jobs: Job[] = await client.fetch(JOBS_QUERY);

  // Group jobs by department
  const jobsByDepartment = jobs.reduce((acc, job) => {
    const dept = job.department || "Other";
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  const departments = Object.keys(jobsByDepartment).sort();

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're looking for passionate individuals to help us build the future of e-commerce. 
            Check out our open positions below.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-lg">
            <p className="text-xl text-muted-foreground">No open positions at the moment.</p>
            <p className="mt-2 text-sm text-muted-foreground">Check back later!</p>
          </div>
        ) : (
          <div className="space-y-16">
            {departments.map((dept) => (
              <section key={dept}>
                <h2 className="text-2xl font-bold mb-6 border-b border-border/50 pb-2 inline-block">
                  {dept}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {jobsByDepartment[dept].map((job) => (
                    <Link 
                      key={job._id} 
                      href={`/careers/${job.slug.current}`}
                      className="group relative flex flex-col p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {job.department}
                        </span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      
                      <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
