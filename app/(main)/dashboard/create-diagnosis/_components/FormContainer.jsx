"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/services/supabaseClient";
import { useSearchParams } from "next/navigation";

const FormContainer = ({ formData, onHandleInputChange, GoToNext }) => {
    const [patientId, setPatientId] = useState("");
    const searchParams = useSearchParams();
    const patId = searchParams.get("patientId");

    useEffect(() => {
        const init = async () => {
            if (patId) {
                setPatientId(patId);
                onHandleInputChange("patient_id", patId);

                const { data, error } = await supabase
                    .from("Diagnosis")
                    .select("*")
                    .eq("patient_id", patId);

                if (data?.[0]) {
                    const p = data[0];
                    onHandleInputChange("patientName", p.patientName || "");
                    onHandleInputChange("patientAge", p.patientAge || "");
                    onHandleInputChange("patientWeight", p.patientWeight || "");
                    onHandleInputChange("patientGender", p.patientGender || "");
                    onHandleInputChange("patientHistory", p.patientHistory || "");
                    onHandleInputChange("patient_id", p.patient_id || "");
                    onHandleInputChange("patientAllergies", p.patientAllergies || "");
                    // Leave symptoms, vitals, diagnosis blank for now
                }
            } else {
                const id = uuidv4();
                setPatientId(id);
                onHandleInputChange("patient_id", id);
            }
        };

        init();
    }, []);

    const handleInputChange = (key, value) => {
        onHandleInputChange(key, value);
    };

    return (
        <div className="p-5 bg-card rounded-xl border border-muted shadow-md mt-5">
            <h2 className="mt-2">Patient ID</h2>
            <Input value={formData.patient_id} className="mt-2" disabled onChange={(e) => handleInputChange("patientName", e.target.value)}/>

            <h2 className="mt-2">Patient Name</h2>
            <Input
                placeholder="e.g. Rahul Sharma"
                className="mt-2"
                value={formData.patientName}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
            />

            <h2 className="mt-2">Patient Age</h2>
            <Input
                placeholder="e.g. 35"
                className="mt-2"
                value={formData.patientAge}
                onChange={(e) => handleInputChange("patientAge", e.target.value)}
            />

            <h2 className="mt-2">Patient Weight</h2>
            <Input
                placeholder="e.g. 65kg"
                className="mt-2"
                value={formData.patientWeight}
                onChange={(e) => handleInputChange("patientWeight", e.target.value)}
            />

            <h2 className="mt-2">Patient Vitals</h2>
            <Input
                placeholder="e.g. Temp, BP, Heart Rate"
                className="mt-2"
                value={formData.patientVitals}
                onChange={(e) => handleInputChange("patientVitals", e.target.value)}
            />

            <h2 className="mt-2">Patient Gender</h2>
            <Select
                value={formData.patientGender?.toLowerCase() || ""}
                onValueChange={(value) => handleInputChange("patientGender", value)}
            >
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="e.g. Male, Female" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                </SelectContent>
            </Select>

            <h2 className="mt-2">Patient History</h2>
            <Textarea
                placeholder="e.g. Diabetic for 5 years, no recent surgeries, history of seasonal allergies"
                className="mt-2 h-[100px]"
                value={formData.patientHistory}
                onChange={(e) => handleInputChange("patientHistory", e.target.value)}
            />

            <h2 className="mt-2">Patient Symptoms</h2>
            <Textarea
                placeholder="e.g. Fever for 3 days, sore throat, mild body ache"
                className="mt-2 h-[100px]"
                value={formData.patientSymptoms}
                onChange={(e) => handleInputChange("patientSymptoms", e.target.value)}
            />

            <h2 className="mt-2">Any Allergies</h2>
            <Textarea
                placeholder="e.g. Allergic to penicillin and sulfa drugs"
                className="mt-2 h-[100px]"
                value={formData.patientAllergies}
                onChange={(e) => handleInputChange("patientAllergies", e.target.value)}
            />

            <h2 className="mt-2">Doctor's Diagnosis</h2>
            <Textarea
                placeholder="e.g. Suspected bacterial pharyngitis"
                className="mt-2 h-[100px]"
                value={formData.patientDiagnosis}
                onChange={(e) => handleInputChange("patientDiagnosis", e.target.value)}
            />

            <Button className="mt-4" onClick={GoToNext}>
                Generate Diagnosis
            </Button>
        </div>
    );
};

export default FormContainer;
