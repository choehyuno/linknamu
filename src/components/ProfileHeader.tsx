import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className="h-36 w-36 rounded-full object-cover ring-4 ring-white shadow-md dark:ring-gray-800"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-5xl font-bold text-white ring-4 ring-white shadow-md dark:ring-gray-800"
        >
          {name.charAt(0)}
        </div>
      )}

      <h1 className="mt-5 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{bio}</p>
    </section>
  );
}
