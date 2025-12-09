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
  _id: string;
  name: string;
  status: string;
  contactInfo?: ContactInfo;
  serviceType?: string;
  notes?: string[];
}

export function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllClients();
        console.log("All Clients >>>", response);

        if (response) {
          setClients(response.clients);
        } else {
          toast.error("No clients were loaded");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, [reload]);

  const handleDelete = async (id: string) => {
    const response = await deleteClient(id);
    console.log("Response >>>", response);
    if (response!.ok) {
      toast.success("Successfully deleted");
      setReload((state) => state + 1);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clients.length > 0 ? (
          clients.map((client) => (
            <article key={client._id} className="flex flex-col p-4">
              <p>
                Name: <span className="text-amber-400">{client.name}</span>
              </p>
              <p>
                Status: <span className="text-amber-400">{client.status}</span>
              </p>
              <button
                onClick={() => handleDelete(client._id)}
                className="mt-4 ghost-button max-w-fit"
              >
                Delete
              </button>
            </article>
          ))
        ) : (
          <p className="text-red-600 text-2xl font-bold my-6">No clients.</p>
        )}
      </div>

      <CreateClientForm onCreation={() => setReload((state) => state + 1)} />
    </main>
  );
}

export default Dashboard;
