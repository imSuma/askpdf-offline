import { useState, useEffect, useCallback } from "react";
import * as webllm from "@mlc-ai/web-llm";

export const useWebLLM = () => {
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const initializeEngine = useCallback(async () => {
    if (engine) return;

    setIsLoading(true);
    try {
      const selectedModel = "Llama-3.2-3B-Instruct-q4f16_1-MLC";

      const newEngine = new webllm.MLCEngine();

      // Initialize the engine with progress callback
      newEngine.setInitProgressCallback((progress: webllm.InitProgressReport) => {
        console.log(`Loading progress: ${progress.progress}%`);
      });

      await newEngine.reload(selectedModel);

      setEngine(newEngine);
      setIsReady(true);
    } catch (error) {
      console.error("Failed to initialize WebLLM:", error);
    } finally {
      setIsLoading(false);
    }
  }, [engine]);

  const sendMessage = useCallback(
    async (message: string, context?: string) => {
      if (!engine || !isReady) {
        throw new Error("Engine not ready");
      }

      const systemPrompt = context
        ? `You are a helpful AI assistant that answers questions about a PDF document. Here is the relevant content from the PDF:

${context}

Please answer the user's question based on the provided context. If the answer is not in the provided context, say so clearly.`
        : "You are a helpful AI assistant.";

      const messages: webllm.ChatCompletionMessageParam[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ];

      const response = await engine.chat.completions.create({
        messages,
        temperature: 0.7,
        max_tokens: 4096,
      });

              return response.choices[0].message.content || 'I apologize, but I could not generate a response.';
    },
    [engine, isReady]
  );

  useEffect(() => {
    initializeEngine();
  }, [initializeEngine]);

  return {
    isLoading,
    isReady,
    sendMessage,
  };
};
