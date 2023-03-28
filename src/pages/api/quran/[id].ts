import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req = req.method === "GET" ? req : req.body;
  const { id } = req.query;
  try {
    const data = await fetch(
      `https://quran-api.santrikoding.com/api/surah/${id}`
    );
    const json = await data.json();
    res.status(200).json(json);
  } catch (error) {
    console.error(error);
    res.status(500); // Internal Server Error
  }
}
