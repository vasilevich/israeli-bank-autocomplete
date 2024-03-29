"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bank_data_json_1 = __importDefault(require("./bank-data.json"));
var functions_1 = require("./functions");
var data = {
    banks: bank_data_json_1.default.banks || [],
    branches: bank_data_json_1.default.branches || []
};
/**
 * Load the data from `bank-data.json` file
 */
var BankDataSource = /** @class */ (function () {
    function BankDataSource() {
        /**
         * All banks
         */
        this.banks = [];
        /**
         * All bank branches
         */
        this.branches = [];
        this.banks = data.banks;
        this.branches = data.branches;
    }
    /**
     * Fetch new data from Israel Bank
     */
    BankDataSource.prototype.fetchNewDataFromIsraelBank = function (dbUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var csv, _a, banks, branches;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, functions_1.fetchCSVFromIsraelBank)(dbUrl)];
                    case 1:
                        csv = _b.sent();
                        return [4 /*yield*/, (0, functions_1.convertBranchesDataFromIsraelBankCSV)(csv)];
                    case 2:
                        _a = _b.sent(), banks = _a.banks, branches = _a.branches;
                        this.banks = banks;
                        this.branches = branches;
                        return [2 /*return*/, { banks: banks, branches: branches }];
                }
            });
        });
    };
    /**
     * Get all banks
     */
    BankDataSource.prototype.getAllBanks = function () {
        return data.banks;
    };
    /**
     * Get bank by bank code
     * @param bankCode bank code
     */
    BankDataSource.prototype.getBank = function (bankCode) {
        return data.banks.find(function (bank) { return bank.bankCode === bankCode; });
    };
    /**
     * Get all branches
     */
    BankDataSource.prototype.getAllBranches = function () {
        return data.branches;
    };
    /**
     * Get all the bank's branches by bank code
     * @param bankCode the bank code
     */
    BankDataSource.prototype.getAllBankBranches = function (bankCode) {
        return data.branches.filter(function (branch) { return branch.bankCode === bankCode; });
    };
    /**
     * Get bank branch by bank code
     * @param branchCode branch code
     */
    BankDataSource.prototype.getBranch = function (branchCode) {
        return data.branches.find(function (branch) { return branch.branchCode === branchCode; });
    };
    /**
     * @deprecated
     */
    BankDataSource.prototype.getAllBrachs = function () {
        return this.getAllBranches();
    };
    /**
     * @deprecated
     */
    BankDataSource.prototype.getAllBankBraches = function (bankCode) {
        return this.getAllBankBranches(bankCode);
    };
    return BankDataSource;
}());
var dataSource = new BankDataSource();
exports.default = dataSource;
