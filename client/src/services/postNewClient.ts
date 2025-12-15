type ContactInfo = {
  phone?: string[];
  email?: string[];
  website?: string[];
};

interface Client {
  name: string;
  status: string;
  contactInfo?: ContactInfo;
  serviceType?: string;
  notes?: string[];
}

const baseUrl = "https://clientpulse-dusky.vercel.app/api/v1";
// const baseUrl = "http://127.0.0.1:8001/api/v1";

const postNewClient = async (body: Client) => {
  try {
    const response = await fetch(`${baseUrl}/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("Response >>>", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default postNewClient;
