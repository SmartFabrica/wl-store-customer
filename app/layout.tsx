import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ParçaPazar",
    template: "%s · ParçaPazar",
  },
  description:
    "Endüstriyel yedek parçada B2B tedarik. Onaylı bayiler için toptan fiyatlar, gerçek zamanlı stok ve hızlı sipariş.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${archivo.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
