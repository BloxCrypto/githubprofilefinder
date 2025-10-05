import { Star, GitFork, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface RepositoryListProps {
  repos: Repository[];
}

export const RepositoryList = ({ repos }: RepositoryListProps) => {
  if (repos.length === 0) {
    return (
      <div className="text-center py-12 animate-slide-up">
        <p className="text-muted-foreground text-lg">No public repositories found</p>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-slide-up">
      <h3 className="text-2xl font-bold mb-6">Popular Repositories</h3>
      <div className="grid gap-4">
        {repos.slice(0, 6).map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <Card className="p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    {repo.name}
                  </h4>
                  {repo.description && (
                    <p className="mt-2 text-foreground/70 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    {repo.language && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Circle className="h-3 w-3 fill-primary text-primary" />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks_count.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};
