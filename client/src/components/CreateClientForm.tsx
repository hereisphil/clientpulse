import postNewClient from "@/services/postNewClient";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreateClientForm = () => {
  const nameInput = useRef<HTMLInputElement | null>(null);
  const statusInput = useRef<HTMLInputElement | null>(null);
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
      if (response && response.ok) {
        toast.success("Client Added! 🥳");
        clearInputs();
      } else {
        const body = await response!.json();
        toast.error(
          `Client was not successful: ${body.message || JSON.stringify(body)}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setButtonstate(false);
    }
  };

  return (
    <section>
      <h2>Add a new client:</h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center">
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
        <input
          type="text"
          name="status"
          id="status"
          ref={statusInput}
          placeholder="not empty"
          required
        />
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
