import React from 'react';
import { ArrowLeft, Pencil, Coffee, Sparkles, Check, QrCode } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

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
  const { data } = useAdminData();
  const selectedTierObj = data.donateTiers.find(t => t.id === selectedTier);

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
          Support the Creator ✏️
        </h1>
      </div>

      <div className="notebook-text text-xl leading-[2rem] mb-8 max-w-2xl reveal-on-scroll">
        <p>Coding late into the night requires fuel (and stationery!).</p>
        <p>Your support helps me keep running and build more.</p>
        <p>Every pencil counts!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal-on-scroll">
        {data.donateTiers.map((tier, index) => (
          <div 
            key={tier.id}
            className={`relative group transition-all duration-300 ${selectedTier === tier.id ? 'scale-105 z-10' : 'hover:-translate-y-1'}`}
            onClick={() => onTierSelect(tier.id)}
          >
            <div className={`
              ${index === 0 ? 'bg-yellow-50 border-yellow-200' : index === 1 ? 'bg-blue-50 border-blue-200' : 'bg-pink-50 border-pink-200'}
              border-2 ${selectedTier === tier.id ? 'ring-4 ring-opacity-50' : ''} 
              p-6 shadow-sm rotate-[-1deg] h-full flex flex-col items-center text-center transition-all cursor-pointer`}
            >
              <span className="text-4xl mb-4 block leading-none">{tier.emoji || '✏️'}</span>
              
              <h3 className={`font-marker text-2xl mb-2 ${index === 0 ? 'text-yellow-800' : index === 1 ? 'text-blue-800' : 'text-pink-800'}`}>{tier.name}</h3>
              <p className="font-hand text-lg mb-1 text-slate-600">{tier.description || 'Support level'}</p>
              <div className="font-marker text-3xl mb-4 text-slate-800">
                {tier.price}
              </div>
              
              <div className="mt-auto w-full">
                <button className={`
                  ${selectedTier === tier.id ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' : 'bg-white/50 hover:bg-white text-slate-800 border-slate-300'} 
                  px-4 py-1 rounded border font-bold w-full transition-colors flex justify-center items-center gap-2 cursor-pointer`}
                >
                  {selectedTier === tier.id ? <><Check size={18} strokeWidth={3} /> Selected</> : 'Select'}
                </button>
              </div>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm opacity-90 tape-serrated" />
          </div>
        ))}
      </div>

      <div id="action-section" className="max-w-lg mx-auto mb-8 transition-all duration-500">
        {selectedTier && selectedTierObj && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500 text-center">
            <div className="inline-block relative bg-green-100 border-2 border-green-400 text-green-900 px-6 py-4 rounded-sm shadow-md transform -rotate-1">
              <div className="absolute -left-14 top-1/2 -translate-y-1/2 text-purple-500 hidden sm:block animate-pulse">
                <svg width="50" height="40" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 25 Q 20 5 45 15" />
                  <path d="M35 10 L 45 15 L 38 22" />
                </svg>
              </div>
              <p className="font-marker text-2xl mb-1 font-bold">Awesome choice! 🎉</p>
              <p className="font-hand text-lg">
                You've selected the <span className="font-bold">{selectedTierObj.name}</span> tier.
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
          
          <h3 className="text-center font-bold text-2xl mb-4 text-slate-700">Select & Scan to Support</h3>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-3 shadow-sm border border-gray-200 rounded min-h-[260px] min-w-[260px] flex items-center justify-center">
              {(() => {
                if (!selectedTierObj) {
                  return (
                    <div className="flex flex-col items-center justify-center p-4 text-slate-400">
                      <QrCode size={140} strokeWidth={1.2} className="opacity-40" />
                      <p className="font-hand text-sm font-bold text-slate-500 mt-2 text-center">
                        Select a tier above<br/>to show QR code
                      </p>
                    </div>
                  );
                }

                const priceStr = selectedTierObj.price;
                if (priceStr.includes('1500') || selectedTierObj.id === 'meal') {
                  return <img src="/GPay_QR_1500.png" alt="GPay ₹1500 QR" className="w-60 h-60 object-contain animate-in fade-in zoom-in-95 duration-200" />;
                } else if (priceStr.includes('500') || selectedTierObj.id === 'coffee') {
                  return <img src="/GPay_QR_500.png" alt="GPay ₹500 QR" className="w-60 h-60 object-contain animate-in fade-in zoom-in-95 duration-200" />;
                } else {
                  return <img src="/GPay_QR_150.png" alt="GPay ₹150 QR" className="w-60 h-60 object-contain animate-in fade-in zoom-in-95 duration-200" />;
                }
              })()}
            </div>
            <p className="font-hand text-slate-600 text-center font-bold">
              {selectedTierObj ? 'UPI ID: rajnikantg357@oksbi' : 'Select a card above to activate payment'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 mb-8">
        {PolaroidImage({
          src: "/download.gif",
          alt: "Thank You",
          rotate: "rotate-2",
          caption: "Thank you for your support!"
        })}
      </div>
    </main>
  );
};
