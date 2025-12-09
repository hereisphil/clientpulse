const baseUrl: string | undefined = process.env.BUN_PUBLIC_BASE_URL;

const getAllClients = async () => {
  try {
    if (!baseUrl) return "No API URL Defined";

    const response = await fetch(`${baseUrl}/client`);
    if (response.ok) {
      const body = await response.json();
      return body;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getAllClients;
