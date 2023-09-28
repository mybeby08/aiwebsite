import { MessageSquare, ImageIcon, Music, Code } from "lucide-react";

export const MAX_FREE_COUNTS = 3;
const GITHUB_URL = "https://github.com/mybeby08";
const EMAIL = "katisfish@gmail.com";
const PHONE_NUMBER = "+27665136681";
const LINKEDIN_URL = "https://www.linkedin.com/in/shefwkev/";
export const constants = {
  MAX_FREE_COUNTS,
  GITHUB_URL,
  EMAIL,
  PHONE_NUMBER,
  LINKEDIN_URL,
};
export const useTools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-400",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-yellow-400",
    href: "/music",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    href: "/image",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-blue-400",
    href: "/code",
  },
];
