import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { GeneratedContractResponse } from '../types';
import { Download, Copy, ShieldCheck, FileCheck, Printer } from 'lucide-react';

interface ResultDisplayProps {
  data: GeneratedContractResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'contract' | 'analysis'>('contract');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus('已复制');
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([data.contractMarkdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "融资租赁合同.md";
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-slate-100 flex flex-col h-[800px] print-container">
      {/* Header Tabs - Hidden on Print */}
      <div className="flex border-b border-slate-200 no-print">
        <button
          onClick={() => setActiveTab('contract')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
            ${activeTab === 'contract' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <FileCheck className="w-4 h-4" /> 合同正文
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors
            ${activeTab === 'analysis' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
        >
          <ShieldCheck className="w-4 h-4" /> AI 优化分析
        </button>
      </div>

      {/* Toolbar - Hidden on Print */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex justify-end gap-2 no-print">
         {copyStatus && <span className="text-xs text-green-600 self-center font-medium animate-pulse">{copyStatus}</span>}
         <button 
            onClick={() => handleCopy(activeTab === 'contract' ? data.contractMarkdown : data.optimizationAnalysis)}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
            title="复制内容"
         >
             <Copy className="w-4 h-4" />
         </button>
         {activeTab === 'contract' && (
             <>
                 <button 
                    onClick={handlePrint}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                    title="打印合同"
                 >
                     <Printer className="w-4 h-4" />
                 </button>
                 <button 
                    onClick={handleDownload}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                    title="下载 Markdown"
                 >
                     <Download className="w-4 h-4" />
                 </button>
             </>
         )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
        {activeTab === 'contract' ? (
          <div className="paper-document max-w-3xl mx-auto text-slate-800">
            <ReactMarkdown>{data.contractMarkdown}</ReactMarkdown>
          </div>
        ) : (
          <div className="analysis-body max-w-none text-sm text-slate-700 bg-blue-50/50 p-6 rounded-xl border border-blue-100 no-print">
             <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold text-lg border-b border-blue-200 pb-2">
                <ShieldCheck className="w-6 h-6" /> 条款优化说明
             </div>
            <ReactMarkdown>{data.optimizationAnalysis}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;