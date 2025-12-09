const baseUrl: string | undefined = process.env.BUN_PUBLIC_BASE_URL;

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
