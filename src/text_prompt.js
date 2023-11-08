import "dotenv/config";

import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SequentialChain } from "langchain/chains";

async function main() {
  const llm = new OpenAI();

  const codePrompt = new PromptTemplate({
    inputVariables: [`language`, `task`],
    template: `Write a very short {language} function that will {task}`,
  });

  const testCodePrompt = new PromptTemplate({
    inputVariables: [`language`, `code`],
    template: "Write a unit test for the following {language} code:\n{code}",
  });

  const codeChain = new LLMChain({
    llm: llm,
    prompt: codePrompt,
    outputKey: "code",
  });

  const testCodeChain = new LLMChain({
    llm: llm,
    prompt: testCodePrompt,
    outputKey: "test",
  });

  const result = await new SequentialChain({
    chains: [codeChain, testCodeChain],
    inputVariables: ["task", "language"],
    returnAll: true,
  }).call({
    language: "java",
    task: "print hello",
  });

  console.log(">>>>>>>> CODE");
  console.log(result.code);

  console.log("\n>>>>>>>> TEST");
  console.log(result.test);
}

main().then(() => process.exit(0));
