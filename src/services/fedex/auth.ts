const axios = require('axios');

let apiToken: string | null = null;
let apiTokenExpiresAtMs: number | null = null;

async function refreshToken() {
    try {
        const res = await axios.post(
        "https://apis-sandbox.fedex.com/oauth/token",
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.FEDEX_CLIENT_KEY!,
            client_secret: process.env.FEDEX_CLIENT_SECRET!,
        }).toString(),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
        );

        apiToken = res.data.access_token;
        const expiresInSec = res.data.expires_in;

        apiTokenExpiresAtMs = Date.now() + expiresInSec * 1000;

        return apiToken;

    } catch (error: any) {
        console.error("FedEx OAuth error:", error.response?.data || error.message);
        throw new Error("Failed to retrieve FedEx OAuth token");
    }
}

export async function getToken() {
    if (apiToken && apiTokenExpiresAtMs && Date.now() < apiTokenExpiresAtMs) {
        return apiToken;
    }

    return await refreshToken();
    // Grab current token
    // token = currentToken
    // If about to expire (1 min buffer)
    // token = refreshToken()
}
