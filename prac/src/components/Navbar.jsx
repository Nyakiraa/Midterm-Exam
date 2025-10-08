"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-blue-600 hover:bg-blue-100"
    } transition`;

  return (
    <nav className="bg-white shadow-md p-4 flex justify-center space-x-4 sticky top-0 z-50">
      <Link href="/login" className={linkClass("/login")}>
        Login
      </Link>
      <Link href="/tasks" className={linkClass("/tasks")}>
        Tasks
      </Link>
      <Link href="/projects" className={linkClass("/projects")}>
        Projects
      </Link>
    </nav>
  );
}
