export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로. 비워두면 이름 첫 글자가 표시됩니다. */
  imageUrl?: string;
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값입니다. 실제 정보·사진·링크로 바꿔주세요.
export const profile: Profile = {
  name: "최현호",
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile-placeholder.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/your-id" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/your-id" },
    { id: "blog", title: "Blog", url: "https://velog.io/@your-id" },
  ],
};
