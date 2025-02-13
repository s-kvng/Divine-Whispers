import React from "react";
import Navbar from "@/components/shared/Navigation/Navbar";
import Footer from "@/components/shared/Footer/Footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full overflow-hidden">
      <Navbar />
      <main className="px-4 md:px-6 lg:px-8 h-[calc(100vh_-_4rem)] -mb-[4rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
