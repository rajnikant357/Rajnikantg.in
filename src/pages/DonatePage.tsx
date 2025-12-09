import React from 'react';
import { ArrowLeft, Pencil, Coffee, Sparkles, Check, QrCode } from 'lucide-react';

interface DonatePageProps {
  isDarkMode: boolean;
  selectedTier: string | null;
  onBack: () => void;
  onTierSelect: (tier: string) => void;
  PolaroidImage: (props: any) => React.ReactNode;
  SectionStar: () => React.ReactNode;
}

export const DonatePage: React.FC<DonatePageProps> = ({
  isDarkMode,
  selectedTier,
  onBack,
  onTierSelect,
  PolaroidImage,
  SectionStar,
}) => {
  return (
    <main className="pl-6 sm:pl-36 pr-4 sm:pr-12 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-grow">
      <button 
        onClick={onBack}
        className={`group flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors mb-6 cursor-pointer ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Notebook</span>
      </button>

      <div className="relative mb-6">
        {SectionStar()}
        <h1 className="notebook-text text-4xl font-marker text-purple-600 leading-[3rem] reveal-on-scroll">
          Buy me a Pencil? ✏️
        </h1>
      </div>

      <div className="notebook-text text-xl leading-[2rem] mb-8 max-w-2xl reveal-on-scroll">
        <p>Coding late into the night requires fuel (and stationery!).</p>
        <p>Your support helps me keep running and build more,</p>
        <p>Every pencil counts!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal-on-scroll">
        {['Graphite', 'Charcoal', 'Ink Pot'].map((tier) => (
          <div 
            key={tier}
            className={`relative group transition-all duration-300 ${selectedTier === tier ? 'scale-105 z-10' : 'hover:-translate-y-1'}`}
            onClick={() => onTierSelect(tier)}
          >
            <div className={`
              ${tier === 'Graphite' ? 'bg-yellow-50 border-yellow-200' : tier === 'Charcoal' ? 'bg-blue-50 border-blue-200' : 'bg-pink-50 border-pink-200'}
              border-2 ${selectedTier === tier ? 'ring-4 ring-opacity-50' : ''} 
              p-6 shadow-sm rotate-[-1deg] h-full flex flex-col items-center text-center transition-all cursor-pointer`}
            >
              {tier === 'Graphite' && <Pencil size={40} className="text-yellow-600 mb-4" />}
              {tier === 'Charcoal' && <Coffee size={40} className="text-blue-600 mb-4" />}
              {tier === 'Ink Pot' && <Sparkles size={40} className="text-pink-600 mb-4" />}
              
              <h3 className={`font-marker text-2xl mb-2 ${tier === 'Graphite' ? 'text-yellow-800' : tier === 'Charcoal' ? 'text-blue-800' : 'text-pink-800'}`}>{tier}</h3>
              <p className="font-hand text-lg mb-1 text-slate-600">Support level</p>
              <div className="font-marker text-3xl mb-4 text-slate-800">
                {tier === 'Graphite' ? '₹50' : tier === 'Charcoal' ? '₹100' : '₹150'}
              </div>
              
              <div className="mt-auto w-full">
                <button className={`
                  ${selectedTier === tier ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' : 'bg-white/50 hover:bg-white text-slate-800 border-slate-300'} 
                  px-4 py-1 rounded border font-bold w-full transition-colors flex justify-center items-center gap-2 cursor-pointer`}
                >
                  {selectedTier === tier ? <><Check size={18} strokeWidth={3} /> Selected</> : 'Select'}
                </button>
              </div>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm opacity-90 tape-serrated" />
          </div>
        ))}
      </div>

      <div id="action-section" className="max-w-lg mx-auto mb-8 transition-all duration-500">
        {selectedTier && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500 text-center">
            <div className="inline-block relative bg-green-100 border-2 border-green-400 text-green-900 px-6 py-4 rounded-sm shadow-md transform -rotate-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm opacity-60 tape-serrated" />
              <p className="font-marker text-2xl mb-1">Awesome choice! 🎉</p>
              <p className="font-hand text-lg">
                You've selected the <span className="font-bold">{selectedTier}</span> tier.
                <br/>Please scan the QR code to proceed.
              </p>
            </div>
          </div>
        )}
        <div className="relative bg-white/60 p-6 rounded-sm border-2 border-dashed border-slate-300 transform rotate-1 text-slate-800">
          <div className="absolute -top-3 -left-3 w-12 h-6 bg-amber-900/20 rotate-[-45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          <div className="absolute -top-3 -right-3 w-12 h-6 bg-amber-900/20 rotate-[45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          <div className="absolute -bottom-3 -left-3 w-12 h-6 bg-amber-900/20 rotate-[45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-amber-900/20 rotate-[-45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          
          <h3 className="text-center font-bold text-2xl mb-4 text-slate-700">Select & Scan to Buy</h3>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-3 shadow-sm border border-gray-200">
              {selectedTier === 'Graphite' ? (
                <img src="/GPay_QR_50.png" alt="GPay ₹50 QR" className="w-60 h-60 object-contain" />
              ) : selectedTier === 'Charcoal' ? (
                <img src="/GPay_QR_100.png" alt="GPay ₹100 QR" className="w-60 h-60 object-contain" />
              ) : selectedTier === 'Ink Pot' ? (
                <img src="/GPay_QR_150.png" alt="GPay ₹150 QR" className="w-60 h-60 object-contain" />
              ) : (
                <QrCode size={128} className="text-slate-800" />
              )}
            </div>
            <p className="font-hand text-slate-600 text-center">UPI ID: rajnikantg357@oksbi</p>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-8">
        {PolaroidImage({
          src: "https://picsum.photos/seed/thanks/400/500",
          alt: "Thank You",
          rotate: "rotate-2",
          caption: "Thank you for your support!"
        })}
      </div>
    </main>
  );
};
