// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let url: any = process.env.API_URL_SURAH_DEV;
    const data = await fetch(url);
    const json = await data.json();
    res.status(200).json(json);
  } catch (error) {
    console.error(error);
    res.status(500); // Internal Server Error
  }
}
