import { MapPin, Link as LinkIcon, Users, BookOpen, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface ProfileCardProps {
  user: GitHubUser;
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
      <div className="h-32 bg-gradient-to-r from-primary to-accent" />
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-16">
          <div className="flex-shrink-0">
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              className="w-32 h-32 rounded-full border-4 border-background shadow-lg"
            />
          </div>
          <div className="flex-1 mt-16 md:mt-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {user.name || user.login}
                </h2>
                <p className="text-muted-foreground text-lg">@{user.login}</p>
              </div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
              >
                View on GitHub
              </a>
            </div>

            {user.bio && (
              <p className="mt-4 text-foreground/80 text-lg leading-relaxed">{user.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 mt-6">
              {user.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <LinkIcon className="h-5 w-5" />
                  <span>{user.blog}</span>
                </a>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <Badge variant="secondary" className="px-4 py-2 text-base">
                <BookOpen className="h-4 w-4 mr-2" />
                {user.public_repos} repos
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                <Users className="h-4 w-4 mr-2" />
                {user.followers} followers
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-base">
                <Users className="h-4 w-4 mr-2" />
                {user.following} following
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
