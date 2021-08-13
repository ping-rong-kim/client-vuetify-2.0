export default {
  namespaced: true,
  state: {
    mortgageComparision: {
      filter: {
        Period: "2",
        NumberOfSchemes: "20",
        Adverse: "false",
        DepositEquity: "100000",
        Capped: "false",
        Discounted: "true",
        Fixed: "true",
        Variable: "true",
        Tracker: "true",
        NewLTV: "75",
        NewLoanAmount: "300000",
        CurrentLoanAmount: "300000",
        LoanTerm: "25",
        NumberOfBedrooms: "TWO",
        CurrentValue: "400000",
        PurchaseType: "REMORTGAGE",
        RepaymentBasis: "REPAYMENT",
        RepaymentVehicle: "false",
        SearchBy: "BEST_INTEREST_RATE",
        Country: "England",
        HouseFlat: "HOUSE_OR_BUNGALOW"
      },
      currentProduct: null,
      initialSearch: null,
      lastSearch: null,
      savedSearches: []
    }
  },
  mutations: {
    updateMortgageComparision(state, payload) {
      Object.assign(state.mortgageComparision, payload);
    }
  }
};
