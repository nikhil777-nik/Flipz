import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Tag, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Activity,
  Award,
  Wallet
} from 'lucide-react'
import { toast } from 'react-toastify'

const chartData = [
  { month: 'Jan', sales: 40 },
  { month: 'Feb', sales: 55 },
  { month: 'Mar', sales: 48 },
  { month: 'Apr', sales: 70 },
  { month: 'May', sales: 85 },
  { month: 'Jun', sales: 98 }
]

const RoyaltyDashboard = () => {
  const [totalEarnings, setTotalEarnings] = useState(1245600)
  const [monthlyRoyalties, setMonthlyRoyalties] = useState(84200)
  const [productsSold, setProductsSold] = useState(421)
  
  // Upload State
  const [designName, setDesignName] = useState('')
  const [royaltyPercentage, setRoyaltyPercentage] = useState(15)
  const [apparelType, setApparelType] = useState('Hoodie')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedDesign, setUploadedDesign] = useState(null)
  
  // Withdraw State
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)

  const handlePublish = (e) => {
    e.preventDefault()
    if (!designName.trim()) {
      toast.error('Please enter a design title.')
      return
    }

    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setUploadedDesign({
        name: designName,
        royalty: royaltyPercentage,
        type: apparelType,
        id: Math.floor(Math.random() * 90000) + 10000
      })
      toast.success(`"${designName}" published successfully to Flipz Signature!`)
      setDesignName('')
    }, 1500)
  }

  const handleWithdrawSubmit = (e) => {
    e.preventDefault()
    const amount = parseFloat(withdrawAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid withdrawal amount.')
      return
    }
    if (amount > monthlyRoyalties) {
      toast.error('Insufficient balance to withdraw this amount.')
      return
    }

    setMonthlyRoyalties(prev => prev - amount)
    setTotalEarnings(prev => prev - amount)
    setWithdrawModalOpen(false)
    toast.success(`Withdrawal request for ₹${amount.toLocaleString()} submitted! Funds will arrive in 24 hours.`)
    setWithdrawAmount('')
  }

  return (
    <div id="royalty-dashboard-section" className='py-20 relative'>
      <div className='max-w-7xl mx-auto px-4'>
        
        {/* Header Title */}
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-16'>
          <div className='text-left'>
            <span className='text-accent-cyan font-bold tracking-widest text-xs uppercase font-heading'>Creator hub</span>
            <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white mt-2'>
              Royalty Dashboard
            </h2>
          </div>
          <p className='text-gray-400 text-sm font-body max-w-sm mt-4 md:mt-0 text-left md:text-right'>
            Track design performance, withdraw accumulated creator commissions, or publish a new apparel canvas.
          </p>
        </div>

        {/* Dashboard Panels */}
        <div className='grid lg:grid-cols-3 gap-8'>
          
          {/* Left Column: Analytics Stats & Chart */}
          <div className='lg:col-span-2 space-y-6'>
            
            {/* Stats grid */}
            <div className='grid sm:grid-cols-3 gap-4'>
              <div className='bg-glass border border-white/5 rounded-2xl p-5 text-left'>
                <div className='flex items-center justify-between text-gray-500 mb-3'>
                  <span className='text-xs font-semibold font-body'>Total Earnings</span>
                  <DollarSign className='w-4 h-4 text-accent-cyan' />
                </div>
                <p className='text-2xl font-heading font-extrabold text-white'>
                  ₹{totalEarnings.toLocaleString()}
                </p>
                <p className='text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1'>
                  <TrendingUp className='w-3 h-3' /> +12% from last month
                </p>
              </div>

              <div className='bg-glass border border-white/5 rounded-2xl p-5 text-left relative overflow-hidden'>
                <div className='flex items-center justify-between text-gray-500 mb-3'>
                  <span className='text-xs font-semibold font-body'>Withdrawable Balance</span>
                  <Wallet className='w-4 h-4 text-accent' />
                </div>
                <p className='text-2xl font-heading font-extrabold text-white'>
                  ₹{monthlyRoyalties.toLocaleString()}
                </p>
                <button 
                  onClick={() => setWithdrawModalOpen(true)}
                  className='text-[10px] font-bold text-accent-cyan hover:underline mt-2 flex items-center gap-1 cursor-pointer'
                >
                  Withdraw Funds <ArrowRight className='w-3 h-3' />
                </button>
              </div>

              <div className='bg-glass border border-white/5 rounded-2xl p-5 text-left'>
                <div className='flex items-center justify-between text-gray-500 mb-3'>
                  <span className='text-xs font-semibold font-body'>Products Sold</span>
                  <Tag className='w-4 h-4 text-gray-400' />
                </div>
                <p className='text-2xl font-heading font-extrabold text-white'>
                  {productsSold} units
                </p>
                <p className='text-[10px] text-gray-400 font-semibold mt-1'>
                  Across 4 live designs
                </p>
              </div>
            </div>

            {/* Sales Chart Graphics */}
            <div className='bg-glass border border-white/5 rounded-2xl p-6 text-left'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h3 className='font-heading font-bold text-base text-white'>Sales Growth</h3>
                  <p className='text-xs text-gray-400 mt-0.5'>Monthly royalty distributions</p>
                </div>
                <div className='flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-gray-300'>
                  <Activity className='w-3.5 h-3.5 text-accent-cyan' /> Live Data
                </div>
              </div>

              {/* Chart Visualizer */}
              <div className='h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/10 px-2'>
                {chartData.map((data) => (
                  <div key={data.month} className='flex-1 flex flex-col items-center group relative h-full justify-end'>
                    
                    {/* Tooltip on hover */}
                    <div className='absolute bottom-full mb-2 bg-accent text-white font-bold text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                      ₹{Math.round(data.sales * 1000).toLocaleString()}
                    </div>

                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${data.sales}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className='w-full rounded-t-lg bg-gradient-to-t from-accent/40 to-accent-cyan hover:to-white transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                    />
                    
                    <span className='text-[10px] text-gray-500 font-medium font-body mt-2.5'>{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Upload Canvas */}
          <div className='bg-glass border border-white/5 rounded-[24px] p-6 text-left flex flex-col justify-between h-full relative'>
            <div className='absolute right-4 top-4 text-gray-500 cursor-pointer hover:text-white'>
              <HelpCircle className='w-4.5 h-4.5' />
            </div>

            <div>
              <h3 className='font-heading font-bold text-lg text-white mb-1 flex items-center gap-2'>
                <UploadCloud className='w-5 h-5 text-accent-cyan' /> Publish Design
              </h3>
              <p className='text-xs text-gray-400 font-body leading-relaxed mb-6'>
                Upload original artwork files, specify apparel canvas templates, and control royalty multipliers.
              </p>

              <form onSubmit={handlePublish} className='space-y-4'>
                <div>
                  <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-heading'>Design Title</label>
                  <input 
                    type="text" 
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="e.g. Neon Cyber Skater"
                    className='w-full bg-white/5 border border-white/15 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-heading'>Apparel Template</label>
                    <select 
                      value={apparelType}
                      onChange={(e) => setApparelType(e.target.value)}
                      className='w-full bg-white/5 border border-white/15 rounded-xl py-3 px-3 text-sm text-white outline-none focus:border-accent appearance-none'
                    >
                      <option className="bg-card-dark text-white" value="Hoodie">Hoodie</option>
                      <option className="bg-card-dark text-white" value="T-Shirt">T-Shirt</option>
                      <option className="bg-card-dark text-white" value="Oversized Tee">Oversized Tee</option>
                      <option className="bg-card-dark text-white" value="Crewneck">Crewneck</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-heading'>Royalty Share</label>
                    <div className='flex items-center gap-2 bg-white/5 border border-white/15 rounded-xl py-3 px-3'>
                      <input 
                        type="number"
                        min="10"
                        max="25"
                        value={royaltyPercentage}
                        onChange={(e) => setRoyaltyPercentage(parseInt(e.target.value) || 15)}
                        className='bg-transparent text-sm text-white outline-none w-10 text-center font-bold'
                      />
                      <span className='text-xs text-accent-cyan font-bold'>%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-heading'>Royalty Slider</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="25" 
                    value={royaltyPercentage} 
                    onChange={(e) => setRoyaltyPercentage(parseInt(e.target.value))}
                    className='w-full accent-accent cursor-pointer'
                  />
                  <div className='flex justify-between text-[9px] text-gray-500 font-bold mt-1 font-body'>
                    <span>10% (Min)</span>
                    <span className='text-accent-cyan'>{royaltyPercentage}% Selected</span>
                    <span>25% (Max)</span>
                  </div>
                </div>

                <div className='border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group/upload mt-2'>
                  <UploadCloud className='w-8 h-8 text-gray-500 group-hover/upload:text-accent-cyan transition-colors mb-2' />
                  <p className='text-[10px] text-gray-400 font-semibold font-body'>Drag & drop artwork PNG/SVG</p>
                  <p className='text-[9px] text-gray-600 mt-1'>Max size 25MB (Transparent bg)</p>
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className='w-full py-3.5 rounded-xl bg-gradient-purple-cyan text-white font-heading font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all mt-4 cursor-pointer shadow-lg shadow-accent/15'
                >
                  {isUploading ? 'Uploading...' : 'Publish Artwork Drop'}
                </button>
              </form>
            </div>

            {/* Display newly uploaded mock item */}
            <AnimatePresence>
              {uploadedDesign && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='mt-6 p-4 bg-white/5 border border-accent-cyan/20 rounded-2xl flex items-center gap-3 relative'
                >
                  <div className='w-10 h-10 rounded-xl bg-accent/25 border border-accent/30 flex items-center justify-center text-accent-cyan'>
                    <CheckCircle2 className='w-5 h-5' />
                  </div>
                  <div className='text-xs'>
                    <p className='font-bold text-white'>{uploadedDesign.name}</p>
                    <p className='text-[10px] text-gray-400 mt-0.5'>{uploadedDesign.type} &bull; {uploadedDesign.royalty}% royalty</p>
                  </div>
                  <span className='ml-auto font-mono text-[9px] text-gray-500'>ID: #{uploadedDesign.id}</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>

      {/* Withdraw Modal Drawer */}
      <AnimatePresence>
        {withdrawModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md'>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='w-full max-w-md bg-card-dark border border-white/10 p-6 md:p-8 rounded-[24px] shadow-2xl relative text-left'
            >
              <button 
                onClick={() => setWithdrawModalOpen(false)}
                className='absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer'
              >
                <X className='w-5 h-5' />
              </button>

              <h3 className='font-heading font-extrabold text-xl text-white mb-2 flex items-center gap-2'>
                <Wallet className='w-5.5 h-5.5 text-accent-cyan' /> Withdraw Earnings
              </h3>
              <p className='text-xs text-gray-400 font-body leading-relaxed mb-6'>
                Withdraw royalty payout balances immediately. Payout operations settle within 1 banking day.
              </p>

              <form onSubmit={handleWithdrawSubmit} className='space-y-4'>
                <div>
                  <label className='block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-heading'>Withdrawal Amount (₹)</label>
                  <input 
                    type="number"
                    max={monthlyRoyalties}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder={`Max ₹${monthlyRoyalties}`}
                    className='w-full bg-white/5 border border-white/15 rounded-xl py-3.5 px-4 text-sm text-white placeholder-gray-500 outline-none focus:border-accent-cyan'
                  />
                  <div className='flex justify-between text-[10px] text-gray-500 font-body mt-2 font-semibold'>
                    <span>Accumulated Commission: ₹{monthlyRoyalties}</span>
                    <button 
                      type="button" 
                      onClick={() => setWithdrawAmount(monthlyRoyalties.toString())}
                      className='text-accent-cyan hover:underline cursor-pointer'
                    >
                      Withdraw Max
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className='w-full py-4 rounded-xl bg-white text-black hover:bg-accent-cyan hover:text-black font-heading font-bold text-sm transition-colors mt-6 cursor-pointer shadow-lg shadow-white/5'
                >
                  Initiate Settlement
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default RoyaltyDashboard
