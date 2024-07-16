import FilesTable from "@/components/FilesTable";
import FineTunesTable from "@/components/FineTunesTable";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export default async function Home() {
  const files = await openai.files.list();
  const fineTunes = await openai.fineTuning.jobs.list();

  return (
    <div className='w-screen h-screen'>
      <h1 className='py-5 text-3xl font-bold text-center'>
        Fine-tune Dashboard
      </h1>
      <FilesTable files={files.data} />
      <FineTunesTable fineTunes={fineTunes.data} />
    </div>
  );
}
