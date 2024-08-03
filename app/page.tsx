"use client";

import { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { SearchIcon } from "../components/icons";
import { Spinner } from "@nextui-org/react";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // const handleVoiceInput = () => {
  //   if (!listening) {
  //     SpeechRecognition.startListening({ continuous: true });
  //   } else {
  //     SpeechRecognition.stopListening();
  //     setPrompt(transcript);
  //     resetTranscript();
  //   }
  // };

  const SubmitForm = async (e: MouseEvent | React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const fetchResult = await fetch("/api/generateText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt.trim() }),
    });
    const data = await fetchResult.json();
    setGeneratedText(data.data);
    setLoading(false); // Stop loading
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setPrompt(prompt + "\n");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <form onSubmit={SubmitForm} className="w-full max-w-2xl px-4">
        <Textarea
          label="Search"
          radius="lg"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          onKeyDown={(e) => handleKeyDown(e)}
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
              "w-full",
            ],
          }}
          placeholder="Type to search..."
          minRows={1}
          maxRows={10}
          endContent={
            <>
              <SearchIcon
                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 cursor-pointer flex-shrink-0"
                onClick={SubmitForm}
              />
              {/* <button
                type="button"
                onClick={handleVoiceInput}
                className="ml-2"
              >
                {listening ? "Stop Listening" : "Voice Input"}
              </button> */}
            </>
          }
        />
      </form>

      {loading ? <Spinner /> : <TextGenerateEffect words={generatedText} />}
    </section>
  );
}