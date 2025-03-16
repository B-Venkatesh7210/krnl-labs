import { getCounter } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  counter: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ counter: getCounter() });
}
