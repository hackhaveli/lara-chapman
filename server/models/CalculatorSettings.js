const mongoose = require('mongoose');

const CalculatorSettingsSchema = new mongoose.Schema({
    // Payment Calculator Settings
    paymentCalculator: {
        defaultHomePrice: {
            type: Number,
            default: 400000
        },
        homePriceMin: {
            type: Number,
            default: 50000
        },
        homePriceMax: {
            type: Number,
            default: 2000000
        },
        defaultDownPayment: {
            type: Number,
            default: 20 // percentage
        },
        downPaymentMin: {
            type: Number,
            default: 0
        },
        downPaymentMax: {
            type: Number,
            default: 100
        },
        defaultLoanTerm: {
            type: Number,
            default: 30 // years
        },
        loanTermOptions: {
            type: [Number],
            default: [10, 15, 20, 30]
        },
        defaultInterestRate: {
            type: Number,
            default: 6.5 // percentage
        },
        interestRateMin: {
            type: Number,
            default: 1
        },
        interestRateMax: {
            type: Number,
            default: 15
        },
        interestRateStep: {
            type: Number,
            default: 0.1
        },
        defaultPropertyTax: {
            type: Number,
            default: 1.0 // percentage
        },
        defaultHomeInsurance: {
            type: Number,
            default: 100 // monthly
        },
        defaultHoaFees: {
            type: Number,
            default: 0
        },
        defaultPmi: {
            type: Number,
            default: 0.5 // percentage
        },
        pmiMin: {
            type: Number,
            default: 0.1
        },
        pmiMax: {
            type: Number,
            default: 2
        },
        pmiStep: {
            type: Number,
            default: 0.1
        }
    },

    // Affordability Calculator Settings
    affordabilityCalculator: {
        defaultAnnualIncome: {
            type: Number,
            default: 120000
        },
        defaultMonthlyDebt: {
            type: Number,
            default: 500
        },
        defaultDownPayment: {
            type: Number,
            default: 100000
        },
        defaultInterestRate: {
            type: Number,
            default: 6.5
        },
        interestRateMin: {
            type: Number,
            default: 1
        },
        interestRateMax: {
            type: Number,
            default: 15
        },
        interestRateStep: {
            type: Number,
            default: 0.1
        },
        defaultLoanTerm: {
            type: Number,
            default: 30
        },
        loanTermOptions: {
            type: [Number],
            default: [15, 20, 30]
        },
        defaultDtiRatio: {
            type: Number,
            default: 36 // percentage
        },
        dtiRatioMin: {
            type: Number,
            default: 20
        },
        dtiRatioMax: {
            type: Number,
            default: 50
        },
        dtiRatioStep: {
            type: Number,
            default: 1
        }
    },

    // Display Settings
    displaySettings: {
        showPaymentCalculator: {
            type: Boolean,
            default: true
        },
        showAffordabilityCalculator: {
            type: Boolean,
            default: true
        },
        showRefinanceCalculator: {
            type: Boolean,
            default: false
        },
        paymentTabLabel: {
            type: String,
            default: 'Payment Calculator'
        },
        affordabilityTabLabel: {
            type: String,
            default: 'Affordability'
        },
        refinanceTabLabel: {
            type: String,
            default: 'Refinance'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CalculatorSettings', CalculatorSettingsSchema);
