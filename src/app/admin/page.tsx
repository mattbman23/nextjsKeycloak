import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/app/admin/components/AdminDashboard";

const AdminPage = async () => {
  const session = await auth();

  if (!session || !session.roles.includes("admin")) {
    redirect("/");
  }

  return (
    <div className="flex-1 ">
      <AdminDashboard POSTGREST_API_URL={process.env.POSTGREST_API_URL} />
    </div>
  );
};

export default AdminPage;
