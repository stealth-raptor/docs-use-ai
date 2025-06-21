"use client"

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient'
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const Provider = ({ children }) => {
    const [user, setUser] = useState();
    const router = useRouter();
    const [loading,setLoading]=useState(true);


    const createNewUser = () => {
        supabase.auth.getUser()
            .then(async ({ data: { user } }) => {
                let { data: Users, error } = await supabase
                    .from('Users')
                    .select("*")
                    .eq('email', user?.email);


                console.log(Users);

                if (Users?.length == 0) {
                    const { data, error } = await supabase.from("Users")
                        .insert([
                            {
                                name: user?.user_metadata?.name,
                                email: user?.email,
                                picture: user?.user_metadata?.picture
                            }
                        ])
                    // console.log(data);
                    setUser(data);
                    return;
                }
                setLoading(false);
                setUser(Users[0]);

            })
    }

    const checkUser =  () => {
        supabase.auth.getUser()
            .then(async ({ data: { user } }) => {
                let { data: Users, error } = await supabase
                    .from('Users')
                    .select("*")
                    .eq('email', user?.email);

            if(Users?.length==0){
                router.push("/auth");
            }
            setLoading(false);
    })
    };


    useEffect(() => {
        createNewUser();
        checkUser();
    }, [])

    return (
        <UserDetailContext.Provider value={{ user, setUser }} >
            {loading?null:<div>{children}</div>}
            
        </UserDetailContext.Provider>
    )
}

export default Provider

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}