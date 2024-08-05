import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import Vehicle from "../../../models/Vehicle";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

handler.post(async (req, res) => {
  const { vehicleNumber, vehicleType, pucCertificate, insuranceCertificate } =
    req.body;

  try {
    const vehicle = new Vehicle({
      vehicleNumber,
      vehicleType,
      pucCertificate,
      insuranceCertificate,
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle", details: error });
  }
});

export default handler;
