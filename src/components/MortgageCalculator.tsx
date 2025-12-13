import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Percent, Home, Calendar } from 'lucide-react';

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000); // Annual property tax in dollars
  const [showResults, setShowResults] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculatePayment = () => {
    const principal = homePrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }

    return principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const monthlyMortgage = calculatePayment();
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyPayment = monthlyMortgage + monthlyPropertyTax;
  const downPaymentAmount = homePrice * (downPayment / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const totalInterest = (monthlyMortgage * loanTerm * 12) - loanAmount;
  const totalCost = monthlyMortgage * loanTerm * 12;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-2xl font-bold text-[#333333] mb-6 text-center">Mortgage Calculator</h3>

      <div className="space-y-6">
        {/* Home Price */}
        <div>
          <label className="block text-sm font-medium text-[#555555] mb-2">
            Home Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="10000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="mt-2 text-right">
              <span className="text-lg font-semibold">{formatCurrency(homePrice)}</span>
            </div>
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-[#555555] mb-2">
            Down Payment: {downPayment}% (${downPaymentAmount.toLocaleString()})
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Percent size={18} className="text-gray-400" />
            </div>
            <input
              type="range"
              min="3"
              max="100"
              step="1"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-[#555555] mb-2">
            Interest Rate: {interestRate}%
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Percent size={18} className="text-gray-400" />
            </div>
            <input
              type="range"
              min="2"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2%</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-[#555555] mb-2">
            Loan Term: {loanTerm} years
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
            >
              <option value={10}>10 years</option>
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
        </div>

        {/* Property Tax */}
        <div>
          <label className="block text-sm font-medium text-[#555555] mb-2">
            Annual Property Tax
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              min="0"
              step="100"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent"
              placeholder="3000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Estimated annual property tax amount</p>
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="w-full bg-[#2A9D8F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2A9D8F]/90 transition-colors"
        >
          Calculate Payment
        </button>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gray-50 rounded-xl"
          >
            <h4 className="text-lg font-semibold mb-3">Monthly Payment</h4>
            <div className="text-3xl font-bold text-[#2A9D8F] mb-4">
              {formatCurrency(monthlyPayment)}/mo
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Home Price:</span>
                <span>{formatCurrency(homePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Down Payment ({downPayment}%):</span>
                <span>{formatCurrency(downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Amount:</span>
                <span>{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest Rate:</span>
                <span>{interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Term:</span>
                <span>{loanTerm} years</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <span>Principal & Interest:</span>
                <span>{formatCurrency(monthlyMortgage)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Property Tax:</span>
                <span>{formatCurrency(monthlyPropertyTax)}/mo</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-medium">
                <span>Total Interest Paid:</span>
                <span>{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-2">
                <span>Total Cost (Principal + Interest):</span>
                <span className="text-[#2A9D8F]">{formatCurrency(totalCost)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="mt-4 text-sm text-[#2A9D8F] hover:underline"
            >
              Adjust Values
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MortgageCalculator;
