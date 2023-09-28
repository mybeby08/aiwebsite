/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Starter Next.js + tailwind + shadcn-ui + TypeScript",
  titleTemplate: "%s | shadcn-ui-starter",
  defaultTitle: "shadcn-tailwind-starter",
  description:
    "Kevin's personalized Next.js + shadcn-ui + TypeScript starter template",
  canonical: "https://nextjs.com",
  openGraph: {
    url: "https://yehez-nextchakra-starter.yehezgun.com",
    title: "shadcn-ui-starter",
    description: "Next.js + shadcn-ui + TypeScript template",
    type: "website",
    images: [
      {
        url: "https://yehez-og-image.yehezgun.com/**yehez-nextchakra-starter**.yehezgun.com.png?theme=dark&md=1&fontSize=50px&images=https%3A%2F%2Fres.cloudinary.com%2Fyehez%2Fimage%2Fupload%2Fv1631970666%2Fyehez_avatar_vkv7pc.png&widths=200&heights=200",
        alt: "shadcn-ui og-image",
        width: 800,
        height: 600,
      },
    ],
    site_name: "kevinsaas",
  },
  twitter: {
    handle: "@shefwkev_",
    site: "@site",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "https://res.cloudinary.com/yehez/image/upload/v1630902976/Assassination_Classroom_-_Koro-sensei_smiling_head_fwpndi.svg",
    },
  ],
};

export default defaultSEOConfig;
