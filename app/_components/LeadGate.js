'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button'; // Or your button component

export default function LeadGate({ agentName, agentPhone, agentEmail }) {
  const [user, setUser] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    checkUser();
  }, []);

  const handleReveal = () => {
    if (!user) {
      // User is Guest -> Send to Login
      router.push('/login'); 
    } else {
      // User is Logged In -> Show Number
      setRevealed(true);
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-2xl mb-2">
          👤
        </div>
        <h3 className="font-bold">{agentName}</h3>
      </div>

      {!revealed ? (
        <Button 
          onClick={handleReveal}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition"
        >
          Contact Agent
        </Button>
      ) : (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-left space-y-2 animate-in fade-in">
          <p className="text-sm font-bold text-green-800">✅ Contact Info Unlocked</p>
          <p>📞 <a href={`tel:${agentPhone}`} className="hover:underline">{agentPhone}</a></p>
          <p>✉️ <a href={`mailto:${agentEmail}`} className="hover:underline">{agentEmail}</a></p>
        </div>
      )}
      
      {!user && !revealed && (
        <p className="text-xs text-gray-400 mt-2">Login required to view contact info</p>
      )}
    </div>
  );
}