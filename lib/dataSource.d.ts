import { Bank, Branch } from "./types";
/**
 * Load the data from `bank-data.json` file
 */
declare class BankDataSource {
    /**
     * All banks
     */
    banks: Bank[];
    /**
     * All bank branches
     */
    branches: Branch[];
    constructor();
    /**
     * Fetch new data from Israel Bank
     */
    fetchNewDataFromIsraelBank(dbUrl?: string): Promise<{
        banks: Bank[];
        branches: Branch[];
    }>;
    /**
     * Get all banks
     */
    getAllBanks(): Bank[];
    /**
     * Get bank by bank code
     * @param bankCode bank code
     */
    getBank(bankCode: number): any;
    /**
     * Get all branches
     */
    getAllBranches(): Branch[];
    /**
     * Get all the bank's branches by bank code
     * @param bankCode the bank code
     */
    getAllBankBranches(bankCode: number): Branch[];
    /**
     * Get bank branch by bank code
     * @param branchCode branch code
     */
    getBranch(branchCode: string): Branch | undefined;
    /**
     * @deprecated
     */
    getAllBrachs(): Branch[];
    /**
     * @deprecated
     */
    getAllBankBraches(bankCode: number): Branch[];
}
declare const dataSource: BankDataSource;
export default dataSource;
