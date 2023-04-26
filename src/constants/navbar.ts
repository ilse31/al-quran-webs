const NavbarData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Quran",
    link: "/quran",
  },
  {
    name: "Hadist",
    link: "/hadist",
  },
  {
    name: "Doa",
    link: "/doa",
  },
];

const AnimationNavbarData = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.4,
    },
  },
};

export { NavbarData, AnimationNavbarData };
