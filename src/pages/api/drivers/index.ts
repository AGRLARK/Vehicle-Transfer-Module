import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";
import Driver from "../../../models/Driver";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

handler.post(async (req, res) => {
  const { name, phoneNumber, profilePhoto } = req.body;

  try {
    const driver = new Driver({
      name,
      phoneNumber,
      profilePhoto,
    });

    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ error: "Failed to create driver", details: error });
  }
});

export default handler;
