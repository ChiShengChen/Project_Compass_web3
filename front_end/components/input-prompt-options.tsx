"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InvestmentPlanDialog } from "./investment-plan-dialog";

interface Option {
  optionId: number;
  optionName: string;
  risk: string;
  arr: string;
  description: string;
}

export function InputPromptOptions() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState<Option[]>([]);

  const generateOptions = async () => {
    // 這裡是一個模擬的生成函數,實際應用中您可能需要調用 API
    const promptResponse = await fetch("/api/portfolio-options");
    const promptResult = await promptResponse.json();
    console.log(promptResult);
    return promptResult.options;
  };

  const riskColorClass = (risk: string) => {
    if (risk === 'Low') return "bg-gray-400"
    if (risk === 'Medium') return "bg-gray-500"
    if (risk === 'High') return "bg-black"
    return "bg-gray-900"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter your preferences before generating options.");
      return;
    }
    setIsLoading(true);
    setError("");
    setOptions([]);

    try {
      const generatedOptions = await generateOptions();
      setOptions(generatedOptions);
    } catch (err) {
      console.error(err);
      setError("Failed to generate options. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">What we should know before calculating your optimal investment
          portfolio?</Label>
          <Input
            id="prompt"
            placeholder="Type your response here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating Options..." : "Generate Options"}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {options.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <InvestmentPlanDialog key={option.optionId}>
              <Card className="cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="hover:text-indigo-600">{option.optionName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    <p className={`
                      ${riskColorClass(option.risk)}
                      px-2 py-1 text-white rounded-lg
                    `}>
                      {option.risk}
                    </p>
                  </div>
                </CardContent>
                <CardContent className="flex justify-end">
                  <p className="text-2xl">{option.arr}</p>
                </CardContent>
              </Card>
            </InvestmentPlanDialog>
          ))}
        </div>
      )}
    </div>
  );
}
