"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNewDataFromIsraelBank = exports.getAllBanks = exports.getAllBranches = exports.getAutocompleteSuggestions = void 0;
var dataSource_1 = __importDefault(require("./dataSource"));
/**
 * Get Branch Suggestions
 * @param {string} input the autocomplete input
 * @param {AutocompleteOptions} options autocomplete options
 */
var getAutocompleteSuggestions = function (input, options) {
    var branches;
    if (options && options.bankCode) {
        branches = dataSource_1.default.getAllBankBranches(options.bankCode);
    }
    else {
        branches = dataSource_1.default.getAllBranches();
    }
    if (options && options.inputType === "BRANCH_NAME")
        return branches.filter(function (branch) {
            return branch.branchName.includes(input);
        });
    else if (options && options.inputType === "BRANCH_CODE")
        return branches.filter(function (branch) {
            return branch.branchCode.includes(input);
        });
    else if (options && options.inputType === "BOTH")
        return branches.filter(function (branch) {
            return branch.branchCode.includes(input) || branch.branchName.includes(input);
        });
    else
        return branches.filter(function (branch) {
            return branch.branchCode.includes(input) || branch.branchName.includes(input);
        });
};
exports.getAutocompleteSuggestions = getAutocompleteSuggestions;
/**
 * Get all branches
 * @param {number} bankCode bank number ( if the branches need to be from a specific bank )
 */
var getAllBranches = function (bankCode) {
    if (bankCode)
        return dataSource_1.default.getAllBankBranches(bankCode);
    else
        return dataSource_1.default.getAllBranches();
};
exports.getAllBranches = getAllBranches;
/**
 * Get all banks
 */
var getAllBanks = function () { return dataSource_1.default.getAllBanks(); };
exports.getAllBanks = getAllBanks;
/**
 * Update Israel Bank data
 */
var fetchNewDataFromIsraelBank = function () { return dataSource_1.default.fetchNewDataFromIsraelBank(); };
exports.fetchNewDataFromIsraelBank = fetchNewDataFromIsraelBank;
