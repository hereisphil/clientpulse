import CreateClientForm from "@/components/CreateClientForm";
import deleteClient from "@/services/deleteClient";
import getAllClients from "@/services/getAllClients";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ContactInfo = {
  phone?: string[];
  email?: string[];
  website?: string[];
};

interface Client {
  name: string;
  status: string;
  contactInfo?: ContactInfo;
  serviceType?: string;
  notes?: string[];
}

export function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllClients();
        console.log("All Clients >>>", response);

        if (response) {
          setClients(response.clients);
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

  const handleDelete = async (id) => {
    const response = await deleteClient(id);
    console.log("Response >>>", response);
    if (response.ok) {
      toast.success("Successfully deleted");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      {clients.length > 0 ? (
        clients.map((client) => (
          <article key={client._id}>
            Name: {client.name} Status: {client.status}
            <button
              onClick={() => handleDelete(client._id)}
              className="secondary-button"
            >
              Delete
            </button>
          </article>
        ))
      ) : (
        <p>No clients.</p>
      )}
      <CreateClientForm />
    </main>
  );
}

export default Dashboard;
