import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://brew.siddharthkhanna.com"),
  title: "Brew My Coffee",
  description: "Small-batch coffee, brewed with intention.",
  openGraph: {
    title: "Brew My Coffee",
    description: "Small-batch coffee, brewed with intention.",
    url: "https://brew.siddharthkhanna.com",
    siteName: "Brew My Coffee",
    type: "website",
    images: [
      {
        url: "/coffee-hero.jpg",
        width: 2000,
        height: 1333,
        alt: "A French press and glass mug surrounded by scattered coffee beans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brew My Coffee",
    description: "Small-batch coffee, brewed with intention.",
    images: ["/coffee-hero.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
