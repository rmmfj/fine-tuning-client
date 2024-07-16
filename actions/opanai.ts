"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";
const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function handleDelete(id: string) {
  await openai.files.del(id);
  revalidatePath("/");
}

export async function handleView(id: string) {
  const file = await openai.files.content(id);
  const text = await (await file.blob()).text();
  return text;
}

export async function handleUpload(path: any) {
  const file = await openai.files.create({
    file: fs.createReadStream(path),
    purpose: "fine-tune",
  });
  return file;
}

export async function handleCreateFineTune(fileId: string) {
  await openai.fineTuning.jobs.create({
    training_file: fileId,
    model: "davinci-002",
    hyperparameters: { n_epochs: 2 },
  });
  revalidatePath("/");
}

export async function handleCancelFineTune(id: string) {
  await openai.fineTuning.jobs.cancel(id);
  revalidatePath("/");
}

export async function handleViewFineTune(id: string) {
  const res = await openai.fineTuning.jobs.listEvents(id);
  return res.data;
}

export async function handleDeleteModel(modalId: string) {
  const res = await openai.models.del(modalId);
  console.log({ res });
  revalidatePath("/");
}
