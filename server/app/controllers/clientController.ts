import type { Request, Response } from "express";
import mongoose from "mongoose";
import Client from "../models/Client.js";

/* -------------------------------------------------------------------------- */
/*                              POST: New Client                              */
/* -------------------------------------------------------------------------- */
export const createClient = async (req: Request, res: Response) => {
  try {
    // Check that a request body was sent
    const data = req.body;
    if (!data || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message:
          "Please send your request again with a client name and status.",
        success: false,
      });
    }

    const newClient = await Client.create(data);

    return res.status(201).json({
      message: `${req.method} - Request made`,
      success: true,
      client: newClient,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: All Clients                              */
/* -------------------------------------------------------------------------- */
export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    return res.status(200).json({
      message: `${req.method} - Request made`,
      success: true,
      clients,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET: Client By Id                             */
/* -------------------------------------------------------------------------- */
export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // grab user's query
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
    }

    const foundClient = await Client.findById(id);

    if (!foundClient) {
      return res.status(404).json({
        message: `No client found with id: ${id}`,
        success: false,
      });
    }

    return res.status(200).json({
      message: `${req.method} - Request made`,
      success: true,
      client: foundClient,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                            PUT: Update a Client                           */
/* -------------------------------------------------------------------------- */
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
    }

    // check for request body BEFORE attempting fetch
    const data = req.body;
    if (!data || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please send your request again with your client's info.",
        success: false,
      });
    }

    const foundClient = await Client.findById(id);
    if (!foundClient) {
      return res.status(404).json({
        message: `No client found with id: ${id}`,
        success: false,
      });
    }

    const client = await Client.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({
      message: `${req.method} - Request made`,
      success: true,
      client,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                          DELETE: Remove a Client                          */
/* -------------------------------------------------------------------------- */
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        success: false,
      });
    }
    const foundClient = await Client.findById(id);
    if (!foundClient) {
      return res.status(404).json({
        message: `No client found with id: ${id}`,
        success: false,
      });
    } else {
      await Client.deleteOne({ _id: id }).exec();
      return res.status(200).json({
        message: `Client has been deleted`,
        success: true,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
