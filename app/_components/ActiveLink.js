"use client"; // This allows us to check the browser URL

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={isActive ? "bg-purple-600 font-bold flex w-full p-4 rounded-[200px]" : "text-gray-900" }
    >
      {children}
    </Link>
  );
}