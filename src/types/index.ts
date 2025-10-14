export type Theme = "light" | "dark";
export type ColorSelectedEvent = CustomEvent<{ color: string }>;
export type Link = {
  href: string;
  text: string;
};
