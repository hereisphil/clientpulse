const baseUrl = "https://clientpulse-dusky.vercel.app/api/v1";

const getAllClients = async () => {
  try {
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
