// lib/middleware.ts
import multer from "multer";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";

const upload = multer({ dest: "public/uploads" });

const middleware = nextConnect<NextApiRequest, NextApiResponse>();

middleware.use(upload.any());

export default middleware;
