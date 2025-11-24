import React, { useState } from 'react';
import { LayoutDashboard, Sparkles, Loader2, Bot } from 'lucide-react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { LeaseFormData, GeneratedContractResponse } from './types';
import { generateLeaseContract } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContractResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: LeaseFormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await generateLeaseContract(data);
      setResult(response);
    } catch (err) {
      setError("生成合同失败，请检查网络设置或稍后重试。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                 <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
                  智租云 SmartLease
                </h1>
                <p className="text-xs text-slate-500 font-medium">AI 驱动的融资租赁解决方案</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-sm text-slate-500 hidden md:inline-block">Powered by Gemini 2.5</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <header className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">新建合同项目</h2>
            <p className="text-slate-600">
                填写业务详情，AI 律师将为您自动生成合规的融资租赁合同，并提供风控条款解析。
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-6">
            <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {/* Value Props / Tips */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
                <h3 className="flex items-center gap-2 font-bold text-lg mb-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    AI 核心能力
                </h3>
                <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                        支持直租与售后回租双模式逻辑自动切换。
                    </li>
                    <li className="flex gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                        基于《民法典》最新司法解释生成条款。
                    </li>
                    <li className="flex gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                        智能识别管辖地并匹配争议解决条款。
                    </li>
                </ul>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className="h-[600px] bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center p-8 text-center">
                 <div className="relative">
                    <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <Bot className="w-10 h-10 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                 </div>
                 <h3 className="mt-6 text-xl font-semibold text-slate-800">正在起草合同...</h3>
                 <p className="text-slate-500 mt-2 max-w-md">
                     Gemini 正在分析您的业务类型 ({isLoading ? "..." : "数据加载中"})，
                     构建法律条款并进行合规性审查。请稍候。
                 </p>
              </div>
            ) : error ? (
              <div className="h-[600px] bg-white rounded-2xl border border-red-100 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                      <LayoutDashboard className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-red-600">出错了</h3>
                  <p className="text-slate-600 mt-2">{error}</p>
              </div>
            ) : result ? (
              <ResultDisplay data={result} />
            ) : (
               <div className="h-[600px] bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                      <LayoutDashboard className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-500">等待生成</h3>
                  <p className="text-sm text-slate-400 mt-2 max-w-xs">
                      在左侧填写信息并点击生成按钮，合同预览将在此处显示。
                  </p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;