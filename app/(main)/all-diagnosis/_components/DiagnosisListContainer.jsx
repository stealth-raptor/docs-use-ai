import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const DiagnosisListContainer = ({ data }) => {
  const router = useRouter();

  const simplifyDate=(date)=>{
    const result=date.slice(0,10);
    return result;
  }

  return (
    <Card className="w-full h-full shadow-md">
      <CardHeader>
        <CardTitle>{data.patientName}</CardTitle>
        <CardDescription>
          {data.patientAge} yrs / {data.patientGender === 'male' ? 'M' : 'F'} / {data.patientWeight}
        </CardDescription>
        <CardDescription>
          {simplifyDate(data.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p><b>Diagnosis: </b>{data.patientDiagnosis}</p>
        <p><b>Symptoms: </b>{data.patientSymptoms}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push(`/all-diagnosis/${data.diagnosis_id}`)}>View Prescription</Button>
      </CardFooter>
    </Card>
  );
};

export default DiagnosisListContainer;
