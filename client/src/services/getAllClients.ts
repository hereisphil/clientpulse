const baseUrl: string | undefined = "http://127.0.0.1:8001/api/v1/client";

const getAllClients = async () => {
  try {
    if (!baseUrl) return "No API URL Defined";

    const response = await fetch(baseUrl);
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
