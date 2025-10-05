import { useState } from "react";
import { Github } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ProfileCard } from "@/components/ProfileCard";
import { RepositoryList } from "@/components/RepositoryList";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const searchUser = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    setUserData(null);
    setRepos([]);

    try {
      const userResponse = await fetch(`https://api.github.com/users/${username.trim()}`);
      
      if (!userResponse.ok) {
        throw new Error("User not found");
      }

      const user = await userResponse.json();
      setUserData(user);

      const reposResponse = await fetch(
        `https://api.github.com/users/${username.trim()}/repos?sort=stars&per_page=6`
      );
      
      if (reposResponse.ok) {
        const repositories = await reposResponse.json();
        setRepos(repositories);
      }

      toast({
        title: "Profile found!",
        description: `Successfully loaded ${user.name || user.login}'s profile`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "User not found. Please check the username and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-gradient">GitHub Profile Finder</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and explore GitHub profiles with ease. Search for any developer and view their
            repositories, stats, and contributions.
          </p>
        </header>

        <SearchBar
          value={username}
          onChange={setUsername}
          onSearch={searchUser}
          isLoading={isLoading}
        />

        {userData && (
          <div className="max-w-5xl mx-auto">
            <ProfileCard user={userData} />
            <RepositoryList repos={repos} />
          </div>
        )}

        {!userData && !isLoading && (
          <div className="text-center py-20 animate-slide-up">
            <Github className="h-24 w-24 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground/60 mb-2">
              Ready to explore?
            </h2>
            <p className="text-muted-foreground">
              Enter a GitHub username above to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
