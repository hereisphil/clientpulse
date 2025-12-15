const baseUrl = "https://clientpulse-dusky.vercel.app/api/v1";
// const baseUrl = "http://127.0.0.1:8001/api/v1";

const getAllClients = async () => {
  try {
    const response = await fetch(`${baseUrl}/client`);
    console.log("getAllClients Raw Response >>>", response);
    if (response.ok) {
      const body = await response.json();
      if (body.clients.length < 1) {
        return 1;
      }
      return body;
    } else {
      return 2;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getAllClients;
