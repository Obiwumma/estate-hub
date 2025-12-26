"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function MyPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Fetch Data on Component Mount
  useEffect(() => {
    async function fetchMyProperties() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        // Fetch properties strictly for this user
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error("Error fetching properties:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyProperties();
  }, [router]);

  // 2. Handle Delete Action
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this property? This cannot be undone.")) return;

    try {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update UI immediately without refreshing
      setProperties(properties.filter((prop) => prop.id !== id));
      alert("Property deleted successfully.");
    } catch (error) {
      alert("Error deleting property: " + error.message);
    }
  }

  // --- UI RENDER ---

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-96 w-full bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Listings</h1>
          <p className="text-sm text-gray-500">Manage your active and sold properties.</p>
        </div>
        <Link 
          href="/properties/new" 
          className="bg-purple-600 w-full md:w-auto justify-centerhover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span> Create New Listing
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {properties.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven&apos;t posted any properties yet.</p>
            <Link href="/properties/new" className="text-purple-600 font-medium hover:underline">
              Create your first listing &rarr;
            </Link>
          </div>
        ) : (
          // Data Table
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                    {/* Name / Title */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">
                        {property.description}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${property.price?.toLocaleString()}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${property.status === 'sold' 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {property.status || 'Active'}
                      </span>
                    </td>

                     {/* Location */}
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.location}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/properties/${property.id}/edit`} 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(property.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}