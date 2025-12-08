import CreateClientForm from "@/components/CreateClientForm";
import getAllClients from "@/services/getAllClients";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function Dashboard() {
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const allClients = await getAllClients();
        console.log("All Clients >>>", allClients);
        if (allClients) {
          toast.success("All clients loaded");
        } else {
          toast.error("No clients were loaded");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <CreateClientForm />
    </main>
  );
}

export default Dashboard;
