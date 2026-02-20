import axios from "axios";
import { getToken } from './auth'

async function getRates() {
    try {
        const res = await axios.post(
        "https://apis-sandbox.fedex.com/rate/v1/rates/quotes",
        new URLSearchParams({
            //accountNumber: process.env.FEDEX_ACCOUNT_NUMBER!,
            //client_id: process.env.FEDEX_CLIENT_KEY!,
            //client_secret: process.env.FEDEX_CLIENT_SECRET!,
        }).toString(),
        {
            headers: { 
                //x-customer-transaction-id
                //x-locale
                "Content-Type": "application/json",
                "authorization": "Bearer " + getToken(),
            },
        }
        );

    } catch (error: any) {
        console.error("FedEx Rates error:", error.response?.data || error.message);
        throw new Error("Failed to retrieve FedEx Rates");
    }
}