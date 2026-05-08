import { FaMotorcycle, FaLeaf, FaCreditCard } from 'react-icons/fa'

export default function StatsBar() {
  return (
    <div className="bg-[#0B4D2A] py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="flex items-center gap-4 justify-center">
          <FaMotorcycle size={28} color="#D4AF37" />
          <div>
            <p className="text-white font-semibold text-base">30min Delivery</p>
            <p className="text-white/80 text-sm">Hot to your door</p>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <FaLeaf size={28} color="#D4AF37" />
          <div>
            <p className="text-white font-semibold text-base">100% Fresh</p>
            <p className="text-white/80 text-sm">Cooked daily</p>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <FaCreditCard size={28} color="#D4AF37" />
          <div>
            <p className="text-white font-semibold text-base">Card Payments</p>
            <p className="text-white/80 text-sm">Paystack secured</p>
          </div>
        </div>
      </div>
    </div>
  )
}
