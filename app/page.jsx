// Copyright Checker Web App (SafeEdit AI) // Frontend: React.js with TailwindCSS // Backend suggestion: Python (Flask/FastAPI) or Node.js (Express)

import React, { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Upload, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function Home() { const [videoFile, setVideoFile] = useState(null); const [checking, setChecking] = useState(false); const [result, setResult] = useState(null);

const handleFileChange = (e) => { setVideoFile(e.target.files[0]); setResult(null); };

const handleCheck = async () => { if (!videoFile) return; setChecking(true); // Simulate backend request — replace with real API call setTimeout(() => { setResult({ riskLevel: "High", // options: Low, Medium, High issues: [ "❌ Detected footage from Korean Drama (Good Boy Ep. 8)", "❌ Copyrighted audio detected (JTBC Music)", "⚠️ No text overlay or transformation found" ], recommendation: "Add voiceover, crop video, and use copyright-free music." }); setChecking(false); }, 2500); };

return ( <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4"> <h1 className="text-3xl font-bold my-6 text-center">🎬 SafeEdit AI - Copyright Checker</h1>

<Card className="w-full max-w-md">
    <CardContent className="p-4 space-y-4">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <Button
        onClick={handleCheck}
        disabled={!videoFile || checking}
        className="w-full"
      >
        {checking ? (
          <><Loader2 className="animate-spin mr-2" /> Checking...</>
        ) : (
          <><Upload className="mr-2" /> Check for Copyright</>
        )}
      </Button>

      {result && (
        <div className="bg-white border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            {result.riskLevel === "Low" && <CheckCircle className="text-green-500 inline mr-2" />} 
            {result.riskLevel === "High" && <AlertTriangle className="text-red-500 inline mr-2" />} 
            Risk Level: {result.riskLevel}
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {result.issues.map((issue, i) => <li key={i}>{issue}</li>)}
          </ul>
          <p className="mt-4 text-sm text-blue-700 font-medium">
            💡 Recommendation: {result.recommendation}
          </p>
        </div>
      )}
    </CardContent>
  </Card>
</div>

); }
