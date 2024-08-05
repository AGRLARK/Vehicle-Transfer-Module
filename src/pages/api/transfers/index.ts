import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import Transfer from "../../../models/Transfer";
import Vehicle from "../../../models/Vehicle";
import Driver from "../../../models/Driver";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await dbConnect();
  try {
    const transfers = await Transfer.find({})
      .populate("vehicle")
      .populate("fromDriver")
      .populate("toDriver");
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transfers", error });
  }
});

handler.post(async (req, res) => {
  await dbConnect();
  try {
    const { fromDriver, toDriver, vehicle } = req.body;
    const transfer = new Transfer({ fromDriver, toDriver, vehicle });
    await transfer.save();
    res.status(201).json(transfer);
  } catch (error) {
    res.status(500).json({ message: "Failed to create transfer", error });
  }
});

export default handler;
