// src/pages/Upload.jsx
import { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MobileNav from '../components/layout/MobileNav'
import DropZone from '../components/upload/DropZone'
import UploadProgress from '../components/upload/UploadProgress'
import AIThinkingLoader from '../components/prediction/AIThinkingLoader'
import PredictionCard from '../components/prediction/PredictionCard'
import Button from '../components/ui/Button'
import ExplanationCard from '../components/prediction/ExplanationCard'
import { usePrediction } from '../hooks/usePrediction'
import usePredictionStore from '../store/predictionStore'

export default function Upload() {
  const [file, setFile]     = useState(null)
  const { predict }         = usePrediction()
  const { status, currentPrediction, reset } = usePredictionStore()

  const isLoading  = status === 'uploading' || status === 'analyzing'
  const hasResult  = status === 'success' && currentPrediction

  const handleFileAccepted = (f) => {
    setFile(f)
    if (!f) reset()
  }

  const handleAnalyze = () => {
    if (file) predict(file)
  }

  return (
    <div className="min-h-screen bg-[#080D14]">
      <Sidebar />
      <TopBar title="Image Analysis — Powered by Gemini AI" />

      <main className="lg:pl-56 pt-[88px] pb-20 lg:pb-8 px-4 lg:px-6">
        <div className="max-w-5xl mx-auto space-y-6">

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left — Drop zone */}
            <div className="space-y-4">
              <div className="relative">
                <DropZone onFileAccepted={handleFileAccepted} disabled={isLoading} />
                <AIThinkingLoader show={isLoading} />
              </div>

              {/* Progress */}
              {isLoading && file && (
                <UploadProgress status={status} fileName={file.name} />
              )}

              {/* Analyze button */}
              {file && !isLoading && !hasResult && (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleAnalyze}
                >
                  🤖 Analyze with Gemini AI
                </Button>
              )}

              {/* Re-analyze */}
              {hasResult && (
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => { setFile(null); reset() }}
                >
                  Analyze another image
                </Button>
              )}
            </div>

            {/* Right — Result */}
            <div>
              {hasResult ? (
                <PredictionCard {...currentPrediction} />
              ) : (
                <div className="h-full min-h-64 bg-[#0F1623] border border-dashed border-[#1E2D45] rounded-xl flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <div className="h-12 w-12 rounded-xl bg-[#161F30] flex items-center justify-center">
                    <span className="text-xl">🔬</span>
                  </div>
                  <p className="text-sm text-[#7A90B0]">
                    {isLoading ? 'Processing…' : 'Upload an image to see the prediction result here.'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Gemini Explanation */}
          {hasResult && currentPrediction?.explanation && (
            <ExplanationCard
              explanation={currentPrediction.explanation}
              probabilities={currentPrediction.probabilities}
            />
          )}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
