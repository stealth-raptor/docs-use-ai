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

  return (
    <Card className="w-full h-full max-w-[220px] min-h-[200px] shadow-md hover:shadow-lg transition duration-200">
      <CardHeader>
        <CardTitle>{data.patientName}</CardTitle>
        <CardDescription>
          {data.patientAge} yrs / {data.patientGender === 'male' ? 'M' : 'F'} / {data.patientWeight}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.patientDiagnosis}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push(`/all-diagnosis/${data.diagnosis_id}`)}>See More</Button>
      </CardFooter>
    </Card>
  );
};

export default DiagnosisListContainer;
