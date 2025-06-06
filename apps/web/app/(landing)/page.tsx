import { WavyBackgroundDemo } from "@/components/wavy-hero";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getServerSession(authOptions))?.user;

  if (user) {
    redirect("/dashboard");
  }

  return <WavyBackgroundDemo />;
}
