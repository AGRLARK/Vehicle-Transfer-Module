import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import Driver from "../../../models/Driver";
import middleware from "../../../lib/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(middleware);

handler.get(async (req, res) => {
  await dbConnect();
  try {
    const drivers = await Driver.find({});
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch drivers", error });
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
      const { name, phoneNumber } = fields;
      const profilePhoto = (files.profilePhoto as File[])[0].filepath;

      const driver = new Driver({
        name,
        phoneNumber,
        profilePhoto,
      });

      await driver.save();
      res.status(201).json(driver);
    } catch (error) {
      res.status(500).json({ message: "Failed to create driver", error });
    }
  });
});

export default handler;
