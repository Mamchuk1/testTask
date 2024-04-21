import { generateName, generatePhoneNumber, generateCompanyName } from "./dataGenerator"

const domain = "test.com"

export const firstName = generateName(5);
export const secondName = generateName(7);
export const email = `${firstName.toLowerCase()}.${secondName.toLowerCase()}@${domain}`;
export const password = "Aboba123!";
export const phoneNumber = generatePhoneNumber(10);
export const fullCompany = generateCompanyName(8);
export const shortCompany = generateCompanyName(3);
export const tgnl = 1232;
export const iin = 950705320222;
export const okpo = 69813946;