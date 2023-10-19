import Navbar from "@/components/navbar/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;