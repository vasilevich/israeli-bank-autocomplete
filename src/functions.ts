import { Bank, Branch } from "./types";

const DATABASE_URL = "/israeli_banks.csv";
/**
 * Fetch CSV with branches details from Israel Bank
 */
export async function fetchCSVFromIsraelBank(dbUrl:string = DATABASE_URL): Promise<string[][]> {
  return new Promise(async (resolve, reject) => {
	const response = await fetch(dbUrl);
	const blob = await response.blob();
	const Parser = (await import("papaparse")).default;
    const reader = new FileReader();
    reader.onloadend = function() {
      const textDecoder = new TextDecoder('ISO-8859-8');
      const decodedData = textDecoder.decode(new Uint8Array(reader.result as ArrayBuffer));
      resolve(Parser.parse(decodedData).data as any);
    }
    reader.onerror = () => reject(new Error("Failed to read the blob"));
    reader.readAsArrayBuffer(blob);
  });
}


/**
 * Convert Israel's Bank CSV to JSON data
 * @param csv The CSV
 */
export async function convertBranchesDataFromIsraelBankCSV(
  csv: string[][]
): Promise<{ branches: Branch[]; banks: Bank[] }> {
  //convert the csv rows to js object with the `headers` as field keys
  let headers = [
    "bankCode",
    "bankName",
    "branchCode",
    "branchName",
    "branchAddress",
    "city",
    "zip",
    "postCode",
    "phone",
    "fax",
    "freePhone",
    "accessForDisabled",
    "closedDay",
    "type",
    "openDate",
    "closingDate",
    "mergeBank",
    "mergeBranch",
    "xCoordinate",
    "yCoordinate",
  ];
  let branches = csv
    .slice(1)
    .map((row: any) => {
      let branch: any = {};
      row.forEach((element: any, i: number) => {
        branch[headers[i]] = element;
      });
      return branch;
    })
    .filter((branch: any) => branch.bankCode);

  //convert bank code to int
  branches = branches.map((branch: any) => ({
    ...branch,
    bankCode: parseInt(branch.bankCode, 10),
  }));

  //Get all the bank codes distinct
  let banks = branches
    .reduce((a: any, b: any) => {
      if (a.every((bn: any) => bn.bankCode !== b.bankCode) && b.bankCode) {
        a.push(b);
      }
      return a;
    }, [])
    .map((bank: any) => ({
      bankCode: parseInt(bank.bankCode),
      bankName: bank.bankName,
    }));

  //Add בנק הדואר separately
  banks.push({ bankCode: 9, bankName: "בנק הדואר" });
  branches.push({
    bankCode: 9,
    bankName: "בנק הדואר",
    branchCode: "1",
    branchName: "",
    branchAddress: "",
    city: "",
    zip: "",
    postCode: "",
    phone: "",
    fax: "",
    freePhone: "",
    accessForDisabled: "",
    type: "",
    closedDay: "",
    openDate: "",
    closingDate: "",
    mergeBank: "",
    mergeBranch: "",
    xCoordinate: "",
    yCoordinate: "",
  });
  return { banks, branches };
}
