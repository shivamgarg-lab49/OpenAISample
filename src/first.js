import "dotenv/config";

import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

async function main() {
  const llm = new OpenAI();

  const codePrompt = new PromptTemplate({
    inputVariables: [`language`, `task`],
    template: `Write a very short {language} function that will {task}`,
  });

  const codeChain = new LLMChain({
    llm: llm,
    prompt: codePrompt,
    outputKey: "code",
  });

  const result = await codeChain.call({
    language: "java",
    task: "return first 10 numbers",
  });

  console.log(result.code);
}

main();
