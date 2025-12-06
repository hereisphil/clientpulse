import { Schema, model } from "mongoose";

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
  createdAt: Date;
  updatedAt: Date;
}

const clientSchema = new Schema<Client>(
  {
    name: {
      type: String,
      unique: [true, "A client by this name already exists."],
      required: [true, "Your client needs a name."],
      trim: true,
      maxlength: [200, "Client's name cannot be more than 200 characters."],
    },
    status: {
      type: String,
      required: [true, "Your client's current status is required."],
      trim: true,
      enum: ["Lead", "Active", "Completed", "DNC"],
    },
    contactInfo: {
      phone: [{ type: String, trim: true }],
      email: [{ type: String, lowercase: true, trim: true }],
      website: [{ type: String, lowercase: true, trim: true }],
    },
    serviceType: {
      type: String,
      trim: true,
    },
    notes: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const ClientModel = model("Client", clientSchema);
export default ClientModel;
