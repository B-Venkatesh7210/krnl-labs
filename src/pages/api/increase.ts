import type { NextApiRequest, NextApiResponse } from "next";
import { increaseCounter } from "../../utils/index";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  increaseCounter();
  res.status(200).json({ message: "Counter increased" });
}
