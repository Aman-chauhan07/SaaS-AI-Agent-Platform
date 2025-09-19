import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Link href="/sign-in">
   
   <Button variant="outline">
    sign in
   </Button>
    </Link>
  );
}
