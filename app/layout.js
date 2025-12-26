
import "./globals.css";

export const metadata = {
  title: "EstateHub | Find Your Dream Home",
  description: "The best platform for buying and renting properties in Nigeria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
