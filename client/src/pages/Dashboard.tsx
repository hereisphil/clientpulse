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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setMessage("");
      try {
        const response = await getAllClients();
        if (!response) {
          setClients([]);
          return toast.error("Something went wrong. No clients loaded");
        } else if (response === 1) {
          setClients([]);
          setMessage(
            "No clients found. You may add a client with the form below."
          );
        } else if (response === 2) {
          setClients([]);
          toast.error("Something went wrong. No clients loaded");
          setMessage("Something went wrong. No clients loaded");
        } else {
          setClients(response.clients);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reload]);

  const handleDelete = async (id: string) => {
    const response = await deleteClient(id);
    console.log("Response >>>", response);
    if (response) {
      toast.success("Successfully deleted");
      setReload((state) => state + 1);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <h1>Dashboard</h1>
      {isLoading && (
        <p className="text-amber-400 text-2xl font-bold my-6">
          Loading clients...
        </p>
      )}
      {message && (
        <p className="text-red-600 text-2xl font-bold my-6">{message}</p>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clients &&
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
          ))}
      </div>

      <CreateClientForm onCreation={() => setReload((state) => state + 1)} />
    </main>
  );
}

export default Dashboard;
