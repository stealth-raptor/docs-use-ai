"use client";

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const initUser = async () => {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      console.error(authError || 'User not logged in');
      toast('You are not logged in.');
      router.push('/auth');
      setLoading(false);
      return;
    }

    const { email, user_metadata } = authUser;
    const name = user_metadata?.name;
    const picture = user_metadata?.picture;

    if (!email || !name) {
      toast('Incomplete user data.');
      router.push('/auth');
      setLoading(false);
      return;
    }

    const { data: users, error: fetchError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', email);

    if (fetchError) {
      console.error(fetchError);
      toast('Error fetching user data');
      router.push('/auth');
      setLoading(false);
      return;
    }

    if (!users || users.length === 0) {
      const { data: newUser, error: insertError } = await supabase
        .from('Users')
        .insert([{ name, email, picture }])
        .select();

      if (insertError || !newUser || newUser.length === 0) {
        console.error(insertError);
        toast('Failed to create user.');
        router.push('/auth');
        setLoading(false);
        return;
      }

      setUser(newUser[0]);
    } else {
      setUser(users[0]); 
    }

    setLoading(false);
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center px-6 md:px-24 lg:px-44 xl:px-56 bg-background">
          <div className="w-full max-w-xl bg-card border border-muted rounded-2xl shadow-md p-6 flex items-center gap-4">
            <Loader2Icon className="animate-spin text-primary w-6 h-6" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Loading</h2>
              <p className="text-sm text-muted-foreground">Please wait while we log you in</p>
            </div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUser = () => useContext(UserDetailContext);
