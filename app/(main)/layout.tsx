export default function MainLayout({ children }) {
  return (
    <div>
      <header><h2>Main Area</h2></header>
      <main>{children}</main>
    </div>
  );
}
