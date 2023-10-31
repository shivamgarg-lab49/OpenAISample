import "dotenv/config";
import OpenAI from "openai";

async function main() {
  const openAI = new OpenAI();
  const completion = await openAI.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
