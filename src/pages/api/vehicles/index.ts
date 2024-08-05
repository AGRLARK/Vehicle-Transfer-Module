import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import Vehicle from "../../../models/Vehicle";
import middleware from "../../../lib/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

handler.get(async (req, res) => {
  await dbConnect();
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicles", error });
  }
});

handler.post(async (req, res) => {
  await dbConnect();

  // Handle file uploads
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "Failed to parse files", error: err });
      return;
    }

    try {
      const { vehicleNumber, vehicleType } = fields;
      const pucCertificate = (files.pucCertificate as File[])[0].filepath;
      const insuranceCertificate = (files.insuranceCertificate as File[])[0]
        .filepath;

      const vehicle = new Vehicle({
        vehicleNumber,
        vehicleType,
        pucCertificate,
        insuranceCertificate,
      });

      await vehicle.save();
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({ message: "Failed to create vehicle", error });
    }
  });
});

export default handler;
