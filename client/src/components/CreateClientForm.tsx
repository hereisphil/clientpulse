import postNewClient from "@/services/postNewClient";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreateClientForm = ({ onCreation }: { onCreation: () => void }) => {
  const nameInput = useRef<HTMLInputElement | null>(null);
  const statusInput = useRef<HTMLSelectElement | null>(null);
  const clearInputs = () => {
    if (nameInput.current) nameInput.current.value = "";
    if (statusInput.current) statusInput.current.value = "";
  };
  const [buttonstate, setButtonstate] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonstate(true);
    try {
      console.log("Signup Form Submitted");
      const nameValue = nameInput.current?.value ?? "";
      const statusValue = statusInput.current?.value ?? "";
      const clientData = {
        name: nameValue,
        status: statusValue,
      };

      const response = await postNewClient(clientData);
      if (response) {
        toast.success("Client Added! 🥳");
        onCreation();
        clearInputs();
      } else {
        toast.error("Something went wrong. Client wasn't added.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setButtonstate(false);
    }
  };

  return (
    <section className="mt-6 flex flex-col md:place-items-center">
      <h2 className="text-2xl">Add a new client:</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center max-w-fit"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          ref={nameInput}
          placeholder="Client Name"
          required
        />
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          id="status"
          ref={statusInput}
          required
          className="border rounded px-2 py-1"
          defaultValue=""
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="DNC">DNC</option>
        </select>
        <button
          type="submit"
          disabled={buttonstate}
          className="primary-button mt-2 max-w-fit"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default CreateClientForm;
