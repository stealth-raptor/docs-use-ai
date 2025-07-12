"use client";

import { Hospital, FolderPlus, CalendarCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { toast } from "sonner";

const DiagnosisList = () => {
  const router = useRouter();
  const { user } = useUser();
  const [diagnosis, setDiagnosis] = useState([]);
  const [todayCount, setTodayCount] = useState(0);

  const fetchData = async () => {
      const today = new Date();
      const todayStr = today.toISOString().split("T")[0]; // format: YYYY-MM-DD


      const { data, error } = await supabase
        .from("Diagnosis")
        .select("*")
        .eq("userEmail", user?.email);

      if (error) {
        console.error(error);
        toast("⚠️ There was an error. Please try again later");
      } else {
        setDiagnosis(data);
        console.log(data);

        const todayDiagnoses = data.filter((item) =>
          item.created_at?.startsWith(todayStr)
        );
        setTodayCount(todayDiagnoses.length);
      }
    };

  useEffect(() => {
    console.log(user?.email);
    if (user) fetchData();
  },[]);

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Recently Created Diagnosis</h2>

      {diagnosis.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-muted shadow-md rounded-xl p-5 flex flex-col items-center text-center">
            <Hospital className='p-3 text-primary bg-border rounded-xl h-12 w-12' />
            <h3 className="font-bold mt-2">Total Diagnoses</h3>
            <p className="text-gray-400 mt-2">{diagnosis.length}</p>
          </div>

          
          <div className="bg-card border border-muted shadow-md rounded-xl p-5 flex flex-col items-center text-center">
            <CalendarCheck className='p-3 text-primary bg-border rounded-xl h-12 w-12' />
            <h3 className="font-bold mt-2">Diagnoses Today</h3>
            <p className="text-gray-400 mt-2">{todayCount}</p>
          </div>

          <div className="bg-card border border-muted shadow-md rounded-xl p-5 flex flex-col items-center text-center">
            <FolderPlus className='p-3 text-primary bg-border rounded-xl h-12 w-12' />
            <h3 className="font-bold mt-2">Recently created diagnosis</h3>
            <Button className="mt-3" onClick={() => router.push("/all-diagnosis")}>
              View All
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-5 flex flex-col items-center bg-card border border-muted shadow-md rounded-xl">
          <Hospital className='p-3 text-primary bg-border rounded-xl h-12 w-12' />
          <h2 className="font-semibold mt-3 mb-1">No diagnosis yet</h2>
          <p className="text-sm text-muted-foreground text-center">
            You haven’t created any diagnoses. Let’s get started.
          </p>
          <Button className="mt-4" onClick={() => router.push("/dashboard/create-diagnosis")}>
            Create Diagnosis
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiagnosisList;
