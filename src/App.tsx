import { useState } from "react";
import { MessageCircle, FileText, Brain, Shield } from "lucide-react";
import PdfUpload from "./components/PdfUpload";
import ChatInterface from "./components/ChatInterface";
import { useWebLLM } from "./hooks/useWebLLM";

function App() {
  const [pdfText, setPdfText] = useState<string>("");
  const [pdfFileName, setPdfFileName] = useState<string>("");
  const { isLoading, isReady, sendMessage } = useWebLLM();

  const handlePdfProcessed = (text: string, fileName: string) => {
    setPdfText(text);
    setPdfFileName(fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Chat with PDF</h1>
            <div className="ml-auto flex items-center gap-2">
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Loading AI Model...</span>
                </div>
              )}
              {isReady && (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-sm">AI Model Ready</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <span className="text-sm font-medium text-gray-800">100% Private & Secure</span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-sm text-gray-600">Everything runs locally in your browser - your documents never leave your device</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PDF Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">PDF Document</h2>
                {pdfFileName && <span className="text-sm text-gray-500">({pdfFileName})</span>}
              </div>
            </div>
            <div className="p-4">
              <PdfUpload onPdfProcessed={handlePdfProcessed} />
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
              </div>
            </div>
            <div className="flex-1">
              <ChatInterface pdfText={pdfText} pdfFileName={pdfFileName} sendMessage={sendMessage} isReady={isReady} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;