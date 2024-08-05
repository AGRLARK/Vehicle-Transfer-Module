import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import Transfer from "../../../models/Transfer";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  await dbConnect();
  try {
    const transfers = await Transfer.find({})
      .populate("vehicle", "vehicleNumber")
      .populate("fromDriver", "name")
      .populate("toDriver", "name");
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transfers", error });
  }
});

export default handler;
