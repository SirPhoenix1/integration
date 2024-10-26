import {
  Anton,
  Arimo,
  Baskervville,
  Comic_Neue,
  Courier_Prime,
  EB_Garamond,
  Fraunces,
  Inter,
  Josefin_Sans,
  Lato,
  Merriweather,
  Montserrat,
  Open_Sans,
  Outfit,
  Playfair_Display,
  Poppins,
  Radley,
  Roboto,
  Tangerine,
  Tinos,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
  display: "swap",
});
export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400",
  display: "swap",
});
export const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open_sans",
  weight: "400",
});
export const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
  display: "swap",
});
export const courier_prime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier_prime",
  weight: "400",
});
export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400",
  display: "swap",
});
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "400",
  display: "swap",
});
export const playfair_display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair_display",
  weight: "400",
  display: "swap",
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "400",
  display: "swap",
});
export const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: "400",
  display: "swap",
});
export const radley = Radley({
  subsets: ["latin"],
  variable: "--font-radley",
  weight: "400",
  display: "swap",
});
export const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  weight: "400",
  display: "swap",
});
export const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin_sans",
  weight: "400",
  display: "swap",
});
export const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: "400",
  display: "swap",
});
export const tangerine = Tangerine({
  subsets: ["latin"],
  variable: "--font-tangerine",
  weight: "700",
  display: "swap",
});
export const tinos = Tinos({
  subsets: ["latin"],
  variable: "--font-tinos",
  weight: "400",
  display: "swap",
});
export const comic_neue = Comic_Neue({
  subsets: ["latin"],
  variable: "--font-comic_neue",
  weight: "400",
  display: "swap",
});
export const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  weight: "400",
  display: "swap",
});
export const baskervville = Baskervville({
  subsets: ["latin"],
  variable: "--font-baskervville",
  weight: "400",
  display: "swap",
});

export type Font = {
  name: string;
  className: string;
};

export const fontList: Font[] = [
  { name: "Inter", className: inter.className },
  { name: "Roboto", className: roboto.className },
  { name: "Open Sans", className: open_sans.className },
  { name: "Lato", className: lato.className },
  { name: "Courier Prime", className: courier_prime.className },
  { name: "Poppins", className: poppins.className },
  { name: "Fraunces", className: fraunces.className },
  { name: "Playfair Display", className: playfair_display.className },
  { name: "Montserrat", className: montserrat.className },
  { name: "Anton", className: anton.className },
  { name: "Outfit", className: outfit.className },
  { name: "Radley", className: radley.className },
  { name: "Arimo", className: arimo.className },
  { name: "Josefin Sans", className: josefin_sans.className },
  { name: "Merriweather", className: merriweather.className },
  { name: "Tangerine", className: tangerine.className },
  { name: "Tinos", className: tinos.className },
  { name: "Comic Neue", className: comic_neue.className },
  { name: "Garamond", className: garamond.className },
  { name: "Baskervville", className: baskervville.className },
];
