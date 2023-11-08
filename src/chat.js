import "dotenv/config";
import prompt from "prompt-sync";

import { LLMChain } from "langchain/chains";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  HumanMessagePromptTemplate,
} from "langchain/prompts";

async function main() {
  const chatPrompt = new ChatPromptTemplate({
    inputVariables: ["content", "messages"],
    promptMessages: [
      new MessagesPlaceholder("messages"),
      HumanMessagePromptTemplate.fromTemplate("{content}"),
    ],
    validateTemplate: true,
  });

  const chatLLM = new ChatOpenAI();

  const chatMemory = new BufferMemory({
    chatHistory: new ChatMessageHistory(),
    memoryKey: "messages",
    returnMessages: true,
  });

  const chain = new LLMChain({
    llm: chatLLM,
    prompt: chatPrompt,
    memory: chatMemory,
  });

  const Prompt = prompt({
    sigint: true,
    eot: true,
  });

  while (true) {
    const content = Prompt(">> ");
    const result = await chain.predict({ content: content });
    console.log(result);
  }
}

main();
