// "use client";

// import { createClient } from "../../lib/supabase/server.server.js"; // Your client import
// import { useRouter } from "next/navigation";

// export default function LogoutButton() {
//   const supabase = createClient();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await supabase.auth.signOut({ scope: 'local' }); // Clears localStorage + cookies
//     router.push("/login");
//     router.refresh(); // Re-runs server logic, invalidates cache
//     window.location.href = "/login"; // Hard redirect as backup (clears any lingering state)
//   };

//   return (
//     <button 
//       onClick={handleLogout} 
//       className="px-3 py-2 bg-red-500 text-white rounded-md"
//     >
//       Logout
//     </button>
//   );
// }