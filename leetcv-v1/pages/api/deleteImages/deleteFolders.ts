import { NextApiRequest, NextApiResponse } from "next";

interface DeleteFolderParams {
  accountId: string;
  apiKey: string;
  requestBody: {
    folderPath: string;
    deleteVirtualFolders: boolean;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed" });
  }

  const { folderPath } = req.body;
  const accountId = process.env.NEXT_UPLOAD_ACCOUNT_ID;
  const apiKey = process.env.NEXT_UPLOAD_SECRET_ID;

  if (!accountId || !apiKey) {
    return res.status(500).send({ error: "Server configuration error" });
  }

  try {
    await deleteFolder({
      accountId,
      apiKey,
      requestBody: {
        folderPath,
        deleteVirtualFolders: true,
      },
    });
    res.status(200).json({ message: true });
  } catch (error: any) {
    res.status(200).json({
      message: "Attempted to delete folder.",
      error: error.message,
    });
  }
}

async function deleteFolder({
  accountId,
  apiKey,
  requestBody,
}: DeleteFolderParams) {
  const { folderPath, deleteVirtualFolders } = requestBody;
  const baseUrl = "https://api.upload.io";
  const path = `/v2/accounts/${accountId}/folders`;
  const encodedFilePath = encodeURIComponent(folderPath);

  const response = await fetch(
    `${baseUrl}${path}?filePath=${encodedFilePath}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderPath, deleteVirtualFolders }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${response.status} - ${error.message}`);
  }

  return response.json();
}
