import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, DollarSign, RefreshCw } from 'lucide-react';

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const MortgagePaymentCalculator = () => {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(1.0);
  const [homeInsurance, setHomeInsurance] = useState(100);
  const [hoaFees, setHoaFees] = useState(0);
  const [pmi, setPmi] = useState(0.5);

  const downPaymentAmount = (homePrice * downPayment) / 100;
  const loanAmount = homePrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate monthly mortgage payment
  const monthlyPayment = loanAmount *
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Calculate additional monthly costs
  const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;
  const monthlyPMI = (downPayment < 20) ? (loanAmount * (pmi / 100)) / 12 : 0;
  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyPMI + homeInsurance + hoaFees;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <DollarSign className="mr-2 text-blue-600" size={20} />
        Mortgage Payment Calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down Payment: {downPayment}% (${formatCurrency(downPaymentAmount)})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate: {interestRate}%
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>15%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Tax: {propertyTax}%
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">%</span>
              <input
                type="number"
                step="0.1"
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Insurance (monthly)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(Number(e.target.value))}
                className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {downPayment < 20 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PMI: {pmi}%
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={pmi}
                onChange={(e) => setPmi(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Estimated Monthly Payment</h4>
        <div className="text-3xl font-bold text-blue-700 mb-2">{formatCurrency(totalMonthlyPayment)}</div>
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Principal & Interest:</span>
            <span>{formatCurrency(monthlyPayment)}</span>
          </div>
          <div className="flex justify-between">
            <span>Property Tax:</span>
            <span>{formatCurrency(monthlyPropertyTax)}</span>
          </div>
          {monthlyPMI > 0 && (
            <div className="flex justify-between">
              <span>PMI:</span>
              <span>{formatCurrency(monthlyPMI)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Home Insurance:</span>
            <span>{formatCurrency(homeInsurance)}</span>
          </div>
          {hoaFees > 0 && (
            <div className="flex justify-between">
              <span>HOA Fees:</span>
              <span>{formatCurrency(hoaFees)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [dtiRatio, setDtiRatio] = useState(36);

  // Calculate maximum monthly payment based on DTI ratio (front-end)
  const maxMonthlyPayment = ((annualIncome / 12) * (dtiRatio / 100)) - monthlyDebt;

  // Calculate maximum loan amount
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  const maxLoanAmount = maxMonthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1) /
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));

  const maxHomePrice = maxLoanAmount + downPayment;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Home className="mr-2 text-green-600" size={20} />
        Home Affordability Calculator
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Debt</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={monthlyDebt}
                onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="pl-8 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate: {interestRate}%
            </label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Debt-to-Income Ratio: {dtiRatio}%
            </label>
            <input
              type="range"
              min="20"
              max="50"
              step="1"
              value={dtiRatio}
              onChange={(e) => setDtiRatio(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-xs text-gray-500">
              Lenders typically prefer a DTI ratio of 36% or less
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">You can afford a home up to:</h4>
        <div className="text-3xl font-bold text-green-700 mb-4">{formatCurrency(maxHomePrice)}</div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Monthly Payment</div>
            <div className="font-medium">{formatCurrency(maxMonthlyPayment)}</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Down Payment</div>
            <div className="font-medium">{formatCurrency(downPayment)}</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Loan Amount</div>
            <div className="font-medium">{formatCurrency(maxLoanAmount)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { usePageContent } from '../hooks/usePageContent';

const Calculators = () => {
  const [activeTab, setActiveTab] = useState('payment');
  const { content } = usePageContent();

  // Get dynamic content with fallbacks
  const title = content?.calculators?.pageTitle || 'Mortgage Calculators';
  const intro = content?.calculators?.mortgageIntroText || 'Estimate your payments, affordability, and more with our easy-to-use mortgage calculators.';
  const disclaimer = content?.calculators?.disclaimer || 'These calculators are for informational purposes only and do not constitute financial advice.';
  const partnerSectionTitle = content?.calculators?.partnerSectionTitle || 'Additional Calculators from Our Partner';
  const partnerBoxTitle = content?.calculators?.partnerBoxTitle || 'Visit Our Partner\'s Calculators';
  const partnerDescription = content?.calculators?.partnerDescription || 'For additional mortgage calculators, please visit our trusted partner Barrett Financial\'s website. You may be asked to complete a quick verification to access their tools.';
  const partnerButtonText = content?.calculators?.partnerButtonText || 'Visit Barrett Financial Calculators';
  const partnerButtonUrl = content?.calculators?.partnerButtonUrl || 'https://www.barrettfinancial.com/mortgage-calculators';
  const partnerFooterText = content?.calculators?.partnerFooterText || 'These calculators are provided by our trusted lending partner, Barrett Financial Group. You\'ll be redirected to their website to use their tools.';

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {intro}
          </p>
        </motion.div>


        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('payment')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center space-x-2 ${activeTab === 'payment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <DollarSign size={18} />
                <span>Payment Calculator</span>
              </button>
              <button
                onClick={() => setActiveTab('affordability')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center space-x-2 ${activeTab === 'affordability'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Home size={18} />
                <span>Affordability</span>
              </button>
              <button
                onClick={() => setActiveTab('refinance')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center justify-center space-x-2 ${activeTab === 'refinance'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <RefreshCw size={18} />
                <span>Refinance</span>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'payment' && <MortgagePaymentCalculator />}
            {activeTab === 'affordability' && <AffordabilityCalculator />}
            {activeTab === 'refinance' && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">Refinance Calculator Coming Soon</h3>
                <p className="text-gray-600">
                  Our refinance calculator is under development. In the meantime, please use our payment calculator or contact us for personalized assistance.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>{disclaimer}</p>
          <p className="mt-2">
            For personalized assistance with your mortgage needs, please{' '}
            <a href="/contact" className="text-blue-600 hover:underline">contact us</a>.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{partnerSectionTitle}</h3>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="max-w-2xl mx-auto">
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">{partnerBoxTitle}</h4>
                <p className="text-gray-600 mb-4">
                  {partnerDescription}
                </p>
                <a
                  href={partnerButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span>{partnerButtonText}</span>
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-gray-500">
                {partnerFooterText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;
