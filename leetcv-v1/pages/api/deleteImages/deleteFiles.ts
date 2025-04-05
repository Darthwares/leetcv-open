import { NextApiRequest, NextApiResponse } from "next";

async function deleteFiles(params: {
  accountId: string;
  apiKey: string;
  filePath: string;
}) {
  const baseUrl = "https://api.upload.io";
  const path = `/v2/accounts/${params.accountId}/files`;
  const encodedFilePath = encodeURIComponent(params.filePath);

  try {
    const response = await fetch(
      `${baseUrl}${path}?filePath=${encodedFilePath}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${params.apiKey}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete files. Status: ${response.status}`);
    }
  } catch (error: any) {
    console.error("Error deleting files:", error.message);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { filePath } = req.body;

    try {
      await deleteFiles({
        accountId: process.env.NEXT_UPLOAD_ACCOUNT_ID!,
        apiKey: process.env.NEXT_UPLOAD_SECRET_ID!,
        filePath,
      });
      res
        .status(200)
        .json({ message: "File deletion initiated successfully." });
    } catch (error: any) {
      res.status(200).json({
        message: "Attempted to delete files.",
        error: error.message,
      });
    }
  }
}
