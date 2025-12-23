"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AuthGuard from "@/app/_components/AuthGuard";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Ensure you have this: npx shadcn-ui@latest add badge
import { FaHome, FaKey, FaTag, FaCheckCircle, FaPlus, FaEdit, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  
  // State for Dashboard Data
  const [stats, setStats] = useState({ total: 0, rent: 0, sale: 0, active: 0 });
  const [recentProperties, setRecentProperties] = useState([]);

  useEffect(() => {
    async function getDashboardData() {
      // 1. Get User
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return; 
      
      setUser(user);

      // 2. Get Profile Name (for the Greeting)
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();
      
      if (profile) setFirstName(profile.first_name);

      // 3. Get Property Stats (Counts)
      const { data: properties } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (properties) {
        // Calculate Stats on the fly
        setStats({
          total: properties.length,
          rent: properties.filter(p => p.status === 'rent').length,
          sale: properties.filter(p => p.status === 'sale').length,
          active: properties.filter(p => p.status !== 'inactive').length,
        });

        // Slice the first 5 for the "Recent" list
        setRecentProperties(properties.slice(0, 5));
      }

      setLoading(false);
    }

    getDashboardData();
  }, []);

  // Format Currency (Naira)
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  return (
    <AuthGuard>
      <div className=" p-4 md:p-6 max-w-7xl mx-auto space-y-8">
        
        {/* --- 1. HEADER & QUICK ACTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {loading ? "Welcome..." : `Welcome back, ${firstName || "Partner"}`}
            </h1>
            <p className="text-gray-500 mt-1">Here is what is happening with your listings today.</p>
          </div>
          <Link href="/properties/new"> 
            <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
              <FaPlus /> Post New Property
            </Button>
          </Link>
        </div>

        {/* --- 2. METRIC CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Properties" 
            value={stats.total} 
            icon={<FaHome className="text-purple-600" />} 
            desc="All time listings"
          />
          <StatsCard 
            title="For Rent" 
            value={stats.rent} 
            icon={<FaKey className="text-purple-500" />} 
            desc="Active rentals"
          />
          <StatsCard 
            title="For Sale" 
            value={stats.sale} 
            icon={<FaTag className="text-purple-500" />} 
            desc="Properties for sale"
          />
          <StatsCard 
            title="Active Now" 
            value={stats.active} 
            icon={<FaCheckCircle className="text-purple-500" />} 
            desc="Publicly visible"
          />
        </div>

        {/* --- 3. MAIN DASHBOARD CONTENT (Split Layout) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* LEFT SIDE: RECENT INVENTORY (Takes up 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Inventory</h2>
            
            <Card className="border shadow-sm">
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading properties...</div>
                ) : recentProperties.length === 0 ? (
                  <div className="p-6 md:p-12 text-center flex flex-col items-center gap-3">
                    <div className="p-4 bg-gray-100 rounded-full text-gray-400">
                      <FaHome size={24} />
                    </div>
                    <p className="text-gray-900 font-medium">No properties yet</p>
                    <p className="text-gray-500 text-sm">Upload your first listing to see it here.</p>
                    <Link href="/properties/add">
                      <Button variant="outline" className="mt-2">Create Listing</Button>
                    </Link>
                  </div>
                ) : (
                  recentProperties.map((property) => {

                    const images = property.image_url ? JSON.parse(property.image_url) : [];
                    const mainImage = images[0] || '/placeholder.jpg';

                    return (
                      <div key={property.id} className="p-4 flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Thumbnail Image */}
                        <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden relative shrink-0">
                           {/* Add an <img> tag here if you have image_url */}
                           {property.image_url ? (
                             <img src={mainImage} alt="" className="h-full w-full object-cover" />
                           ) : (
                             <div className="h-full w-full flex items-center justify-center text-gray-400"><FaHome /></div>
                           )}
                        </div>
                        
                        {/* Details */}
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{property.title || "Untitled Property"}</p>
                          <p className="text-sm text-gray-500">{formatMoney(property.price)}</p>
                        </div>
                      </div>

                      {/* Status & Action */}
                      <div className="flex items-center gap-4">
                         <Badge variant={property.status === 'active' ? "default" : "secondary"} 
                                className={property.status === 'active' ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600"}>
                            {property.status || 'Draft'}
                         </Badge>
                         <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-purple-600">
                           <Link href={`/properties/${property.id}/edit`}><FaEdit /></Link>
                         </Button>
                      </div>
                    </div>
                    )
                  })
                )}
              </div>
              
              {/* Footer Link */}
              {recentProperties.length > 0 && (
                <div className="p-4 border-t bg-gray-50 rounded-b-xl text-center">
                  <Link href="/dashboard/my-properties" className="text-sm text-purple-600 font-medium hover:underline">
                    View all properties &rarr;
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* RIGHT SIDE: PROFILE & QUICK ACTIONS (Takes up 1 col) */}
          <div className="space-y-6">
            
            {/* Profile Health Widget */}
            <Card className="p-6 border shadow-sm bg-purple-50 border-purple-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full text-purple-600 shadow-sm">
                  <FaUserCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900">Your Profile</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Complete your profile to gain trust from potential clients.
                  </p>
                  <Link href="/dashboard/account">
                    <Button variant="link" className="p-0 h-auto mt-2 text-purple-800 font-bold">
                      Go to Settings &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Placeholder for future features */}
            <Card className="p-6 border shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
               <p className="text-sm text-gray-500 mb-4">
                 Having trouble uploading? Check our guide or contact support.
               </p>
               <Link href="/dashboard/help">
                 <Button variant="outline" className="w-full">Contact Support</Button>
               </Link>
            </Card>

          </div>

        </div>
      </div>
    </AuthGuard>
  );
}

// Simple Sub-Component for the Stats Cards
function StatsCard({ title, value, icon, desc }) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
           {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 mt-1">
          {desc}
        </p>
      </CardContent>
    </Card>
  )
}