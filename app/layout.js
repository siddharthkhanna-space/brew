import "./globals.css";

export const metadata = {
  title: "Brew My Coffee",
  description: "Small-batch coffee, brewed with intention.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
