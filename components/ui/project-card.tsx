import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; 

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  techStack?: string[];
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, link, linkText = "View Project", techStack, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
          className
        )}
        {...props}
      >
        {/* Card Image Section */}
        <div className="aspect-video overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            width={800}
            height={450}
            priority={false}
          />
        </div>

        {/* Card Content Section */}
        <div className="flex flex-1 flex-col p-6 relative bg-white">
          <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-3 flex-1 text-muted-foreground text-sm text-gray-500">{description}</p>
          
          {/* Optional Tech Stack display to keep some of the old info if needed */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-600 rounded-md border border-gray-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          
          {/* Card Link/CTA */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button mt-4 inline-flex items-center gap-2 text-sm font-medium text-yellow-600 transition-all duration-300 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
