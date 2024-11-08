
export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sistema de Gestão</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="/">
              <a className="hover:underline">Home</a>
            </a>
          </li>
          <li>
            <a href="/dashboard">
              <a className="hover:underline">Dashboard</a>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
