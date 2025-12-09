import React from 'react';
import { ArrowLeft, Megaphone, Trophy, Briefcase, Check, Mail } from 'lucide-react';

interface SponsorPageProps {
  isDarkMode: boolean;
  selectedTier: string | null;
  partnerName: string;
  partnerEmailInput: string;
  partnerMessage: string;
  partnerSent: boolean;
  onBack: () => void;
  onTierSelect: (tier: string) => void;
  onPartnerNameChange: (name: string) => void;
  onPartnerEmailChange: (email: string) => void;
  onPartnerMessageChange: (message: string) => void;
  onPartnerSubmit: (e: React.FormEvent) => void;
  onDeselect: () => void;
  SectionStar: () => React.ReactNode;
}

export const SponsorPage: React.FC<SponsorPageProps> = ({
  isDarkMode,
  selectedTier,
  partnerName,
  partnerEmailInput,
  partnerMessage,
  partnerSent,
  onBack,
  onTierSelect,
  onPartnerNameChange,
  onPartnerEmailChange,
  onPartnerMessageChange,
  onPartnerSubmit,
  onDeselect,
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
          Partner & Sponsor 🤝
        </h1>
      </div>

      <div className="notebook-text text-xl leading-[2rem] mb-8 max-w-2xl reveal-on-scroll">
        <p>Let's build something amazing together.</p>
        <p>I am always open to meaningful collaborations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 reveal-on-scroll">
        {['Brand Feature', 'Event Partner', 'Hire Me'].map((tier) => (
          <div 
            key={tier}
            className={`relative group transition-all duration-300 ${selectedTier === tier ? 'scale-105 z-10' : 'hover:-translate-y-1'}`}
            onClick={() => onTierSelect(tier)}
          >
            <div className={`
              ${tier === 'Brand Feature' ? 'bg-indigo-50 border-indigo-200' : tier === 'Event Partner' ? 'bg-amber-50 border-amber-200' : 'bg-teal-50 border-teal-200'}
              border-2 ${selectedTier === tier ? 'ring-4 ring-opacity-50' : ''} 
              p-6 shadow-sm rotate-[-1deg] h-full flex flex-col items-center text-center transition-all cursor-pointer`}
            >
              {tier === 'Brand Feature' && <Megaphone size={40} className="text-indigo-600 mb-4" />}
              {tier === 'Event Partner' && <Trophy size={40} className="text-amber-600 mb-4" />}
              {tier === 'Hire Me' && <Briefcase size={40} className="text-teal-600 mb-4" />}
              
              <h3 className={`font-marker text-2xl mb-2 text-slate-800`}>{tier}</h3>
              <p className="font-hand text-lg mb-4 text-slate-600">Connect with me</p>
              
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

      <div id="action-section" className="max-w-lg mx-auto mb-8 transition-all duration-500 reveal-on-scroll">
        {selectedTier && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500 text-center">
            <div className="inline-block relative bg-green-100 border-2 border-green-400 text-green-900 px-6 py-4 rounded-sm shadow-md transform rotate-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-900/20 -rotate-1 backdrop-blur-sm drop-shadow-sm opacity-60 tape-serrated" />
              <p className="font-marker text-2xl mb-1">Great! Let's Talk.</p>
              <p className="font-hand text-lg">
                You're interested in <span className="font-bold">{selectedTier}</span>.
                <br/>Please send me an email.
              </p>
            </div>
          </div>
        )}
        <div className="relative bg-white/60 p-6 rounded-sm border-2 border-dashed border-slate-300 transform -rotate-1 text-slate-800">
          <div className="absolute -top-3 -left-3 w-12 h-6 bg-amber-900/20 rotate-[-45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          <div className="absolute -top-3 -right-3 w-12 h-6 bg-amber-900/20 rotate-[45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          <div className="absolute -bottom-3 -left-3 w-12 h-6 bg-amber-900/20 rotate-[45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-amber-900/20 rotate-[-45deg] backdrop-blur-sm drop-shadow-sm z-10 tape-serrated" />
          
          <h3 className="text-center font-bold text-2xl mb-4 text-slate-700">Contact here</h3>
          <div className="flex flex-col items-center gap-4">
            {selectedTier ? (
              <div className="w-full max-w-md">
                <form onSubmit={onPartnerSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={partnerName}
                      onChange={(e) => onPartnerNameChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded bg-white/90"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your email"
                      value={partnerEmailInput}
                      onChange={(e) => onPartnerEmailChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded bg-white/90"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      placeholder="Message"
                      value={partnerMessage}
                      onChange={(e) => onPartnerMessageChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded bg-white/90 h-28 resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Send</button>
                    <button type="button" onClick={onDeselect} className="px-3 py-2 rounded text-sm underline">Cancel</button>
                  </div>
                  {partnerSent && <p className="text-green-600 text-center mt-1">Opening mail client...</p>}
                </form>
              </div>
            ) : (
              <>
                <a href="mailto:rajnikantg357@gmail.com" className="bg-white p-4 shadow-sm border border-gray-200 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
                  <Mail size={48} className="text-slate-700" />
                </a>
                <a href="mailto:rajnikantg357@gmail.com" className="font-hand text-xl text-blue-600 hover:underline font-bold text-center cursor-pointer">
                  rajnikantg357@gmail.com
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
