const baseUrl = "https://clientpulse-dusky.vercel.app/api/v1";

const deleteClient = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/client/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default deleteClient;
