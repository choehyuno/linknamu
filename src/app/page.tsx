import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center px-4 py-16 sm:py-20">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

      <ul className="mt-10 flex w-full flex-col gap-6">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-16 text-xs text-gray-400 dark:text-gray-500">
        🌳 링크나무
      </footer>
    </main>
  );
}
