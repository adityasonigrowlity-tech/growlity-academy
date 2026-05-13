export const siteConfig = {
  name: "Growlity Academy",
  description:
    "Next-generation EdTech Platform for Professionals and Businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  ogImage: "/Assets/icons/logo.png",
  links: {
    twitter: "https://twitter.com/growlity",
    github: "https://github.com/growlity",
    linkedin: "https://linkedin.com/company/growlity",
  },
  contact: {
    email: "support@growlity.com",
    phone: "+1 (555) 000-0000",
    address: "123 Learning Way, Tech City",
  },
  mainNav: [
    { title: "Explore", href: "/explore" },
    { title: "Subscribe", href: "/subscribe" },
    { title: "Growlity Business", href: "/business" },
    { title: "Tech on Growlity", href: "/instructor" },
  ],
};
