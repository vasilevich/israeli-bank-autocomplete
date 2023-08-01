import { Bank, Branch } from "./types";
/**
 * Fetch CSV with branches details from Israel Bank
 */
export declare function fetchCSVFromIsraelBank(dbUrl?: string): Promise<string[][]>;
/**
 * Convert Israel's Bank CSV to JSON data
 * @param csv The CSV
 */
export declare function convertBranchesDataFromIsraelBankCSV(csv: string[][]): Promise<{
    branches: Branch[];
    banks: Bank[];
}>;
