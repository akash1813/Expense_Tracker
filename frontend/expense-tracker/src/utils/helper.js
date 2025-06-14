import moment from "moment";

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
export async function scanReceipt(file) {

    try {
        const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

        const arrayBuffer = await file.arrayBuffer();

        const base64String = arrayBufferToBase64(arrayBuffer);

        const prompt = `
      Analyze this receipt image and extract the following information in JSON format:
      - Total amount (just the number)
      - Suggested category (one of: housing,transportation,groceries,utilities,entertainment,food,shopping,healthcare,education,personal,travel,insurance,gifts,bills,Salary,Business,others,Rent Received,Trading,Pay slip, others)
      - Date (in ISO format)

      Only respond with valid JSON in this exact format:
      {
        "amount": number, 
        "category": "string",
         "date": "ISO date string",  
      }

      If its not a recipt, return an empty object
    `;


        const result = await model.generateContent([
            {
                inlineData: {
                    data: base64String,
                    mimeType: file.type,
                },
               
            },
            prompt,
        ])

        const response = await result.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

        try{
            const data= JSON.parse(cleanedText);
            return{
                amount:parseFloat(data.amount),
                date:new Date(data.date),
                category: data.category, 
            }
        }
        catch(error){
            console.error("Error parsing JSON response",error);
            throw new Error("Invalid response format from Gemini");
        }
    }
    catch (error) {
        console.error("Error scanning receipt:",error.message);
        throw new Error("Failed to scan receipt")
    }
}



export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const getInitials = (name) => {

    if (!name)
        return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();


}

export const addThousandsSeperator = (num) => {

    if (num == null || isNaN(num)) return "";
    
  
    const [integerPart, fractionalPart] = num.toString().split(".");
    

    const formattedInteger = parseInt(integerPart).toLocaleString("en-IN");
    
    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {

    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.Date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }));
    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format("Do MMM"),
        amount: item?.amount,
        category: item?.category,

    }));

    return chartData;
}


