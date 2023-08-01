import { AutocompleteOptions, Branch } from "./types";
/**
 * Get Branch Suggestions
 * @param {string} input the autocomplete input
 * @param {AutocompleteOptions} options autocomplete options
 */
export declare const getAutocompleteSuggestions: (input: string, options?: AutocompleteOptions) => Branch[];
/**
 * Get all branches
 * @param {number} bankCode bank number ( if the branches need to be from a specific bank )
 */
export declare const getAllBranches: (bankCode?: number) => Branch[];
/**
 * Get all banks
 */
export declare const getAllBanks: () => import("./types").Bank[];
/**
 * Update Israel Bank data
 */
export declare const fetchNewDataFromIsraelBank: () => Promise<void>;
