import React, { useState } from 'react';
import { LeaseFormData, LeaseType, PaymentFrequency } from '../types';
import { FileText, Calculator, MapPin, Building2, Package, Calendar, Wand2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: LeaseFormData) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LeaseFormData>({
    lessorName: '',
    lessorAddress: '',
    lesseeName: '',
    lesseeAddress: '',
    equipmentName: '',
    equipmentModel: '',
    equipmentValue: 0,
    leaseTermMonths: 12,
    totalRent: 0,
    paymentFrequency: PaymentFrequency.Monthly,
    leaseType: LeaseType.DirectLease,
    jurisdiction: '北京市',
    specialConditions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'equipmentValue' || name === 'leaseTermMonths' || name === 'totalRent'
        ? Number(value)
        : value
    }));
  };

  const fillSampleData = () => {
    setFormData({
      lessorName: '智租云融资租赁（上海）有限公司',
      lessorAddress: '上海市浦东新区陆家嘴环路1000号',
      lesseeName: '苏州精密智能制造有限公司',
      lesseeAddress: '江苏省苏州市工业园区星湖街200号',
      equipmentName: '高精度五轴数控机床中心',
      equipmentModel: 'HNC-848D-PRO',
      equipmentValue: 2500000,
      leaseTermMonths: 36,
      totalRent: 2850000,
      paymentFrequency: PaymentFrequency.Quarterly,
      leaseType: LeaseType.DirectLease,
      jurisdiction: '上海市浦东新区',
      specialConditions: '1. 承租人需购买财产综合险，第一受益人为出租人。\n2. 保证金为设备款的10%，于合同签订后3日内支付。'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden no-print">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-800">业务信息录入</h2>
        </div>
        <button
            type="button"
            onClick={fillSampleData}
            className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors"
            title="自动填充测试数据"
        >
            <Wand2 className="w-3 h-3" /> 填充示例
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Section: Business Type */}
        <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">业务类型</label>
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setFormData({...formData, leaseType: LeaseType.DirectLease})}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.leaseType === LeaseType.DirectLease ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-slate-300 text-slate-500'}`}
                >
                    <span className="font-semibold text-lg">直接租赁</span>
                    <span className="text-xs mt-1 opacity-75">购进设备 -> 出租</span>
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({...formData, leaseType: LeaseType.SaleLeaseback})}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.leaseType === LeaseType.SaleLeaseback ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-slate-300 text-slate-500'}`}
                >
                    <span className="font-semibold text-lg">售后回租</span>
                    <span className="text-xs mt-1 opacity-75">买入资产 -> 回租</span>
                </button>
            </div>
        </div>

        {/* Section: Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> 出租方 (甲方)
                </h3>
                <input
                    name="lessorName"
                    required
                    placeholder="公司全称"
                    value={formData.lessorName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
                <input
                    name="lessorAddress"
                    required
                    placeholder="法定地址"
                    value={formData.lessorAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
            </div>
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> 承租方 (乙方)
                </h3>
                <input
                    name="lesseeName"
                    required
                    placeholder="公司全称/个人姓名"
                    value={formData.lesseeName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
                <input
                    name="lesseeAddress"
                    required
                    placeholder="法定地址/住所地"
                    value={formData.lesseeAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
            </div>
        </div>

        <div className="border-t border-slate-100 my-4"></div>

        {/* Section: Equipment & Finance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4" /> 租赁物信息
                </h3>
                <input
                    name="equipmentName"
                    required
                    placeholder="设备名称"
                    value={formData.equipmentName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
                <input
                    name="equipmentModel"
                    required
                    placeholder="规格型号 / 序列号"
                    value={formData.equipmentModel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
                <div>
                    <label className="text-xs text-slate-500 mb-1 block">设备价值 (元)</label>
                    <input
                        name="equipmentValue"
                        type="number"
                        required
                        min="0"
                        value={formData.equipmentValue || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> 租赁要素
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">租期 (月)</label>
                        <input
                            name="leaseTermMonths"
                            type="number"
                            required
                            min="1"
                            value={formData.leaseTermMonths}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 mb-1 block">租金总额 (元)</label>
                        <input
                            name="totalRent"
                            type="number"
                            required
                            min="0"
                            value={formData.totalRent || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                        />
                    </div>
                </div>
                <div>
                     <label className="text-xs text-slate-500 mb-1 block">支付频率</label>
                    <select
                        name="paymentFrequency"
                        value={formData.paymentFrequency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors bg-white"
                    >
                        {Object.values(PaymentFrequency).map(freq => (
                            <option key={freq} value={freq}>{freq}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4"/> 司法管辖地
                </label>
                <input
                    name="jurisdiction"
                    placeholder="例：北京市朝阳区"
                    value={formData.jurisdiction}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
            </div>
             <div>
                <label className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4"/> 特别约定
                </label>
                <input
                    name="specialConditions"
                    placeholder="例：需第三方担保"
                    value={formData.specialConditions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
            </div>
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all 
                ${isLoading 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white hover:scale-[1.01] hover:shadow-xl'
                }`}
        >
            {isLoading ? 'AI 正在起草合同...' : '立即生成合同'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;