// This is the root layout for all pages.
import NavBar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/* `export const metadata` is exporting an object that contains metadata information about the website.
This information includes the title of the website, 
a description of the website, 
and the path to the website's favicon. 

This metadata can be used by search engines
and social media platforms to display information about the website. */
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout(
  // This is a React component that takes in a children prop of type React.ReactNode
  {
    children,
  }: {
    children: React.ReactNode;
  }
) {
  return (
    <html lang="en">
      {/* href is relative to the public folder */}
      <body className={inter.className}>
        <main className="bg-gray-100 min-h-s width-100vw">
          {/* AuthContext is a React component that takes in a children prop of type React.ReactNode */}
          <AuthContext>
            <main className="m-auto bg-white max-w-1536">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
