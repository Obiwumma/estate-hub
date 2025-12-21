"use client"; // This allows us to check the browser URL

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`block w-full p-4 transition-colors ${
        isActive 
          ? "bg-purple-600 text-white rounded-r-[50px] font-semibold" 
          : "text-gray-900 hover:bg-gray-50"
      }`}    >
      {children}
    </Link>
  );
}