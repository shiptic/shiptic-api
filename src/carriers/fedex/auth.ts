const axios = require('axios');

interface TokenState {
  apiToken: string | null;
  apiTokenExpiresAtMs: number | null;
}

export class FedExAuth {
  private state: TokenState = {
    apiToken: null,
    apiTokenExpiresAtMs: null,
  };

  async getAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.state.apiToken && this.state.apiTokenExpiresAtMs && now < this.state.apiTokenExpiresAtMs) {
      return this.state.apiToken;
    }

    return this.refreshToken();
  }

  private async refreshToken(): Promise<string> {
    try {
        const response = await axios.post(
        "https://apis-sandbox.fedex.com/oauth/token",
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id: process.env.FEDEX_CLIENT_KEY!,
            client_secret: process.env.FEDEX_CLIENT_SECRET!,
        }),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
        );

        const { access_token, expires_in } = response.data;

        this.state.apiToken = access_token;
        this.state.apiTokenExpiresAtMs = Date.now() + expires_in * 1000;

        console.debug("FedEx OAuth token refreshed");
        return access_token;
    } catch (error: any) {
        console.error("FedEx OAuth error:", error.response?.data || error.message);
        throw new Error("Failed to retrieve FedEx OAuth token");       
    }
  }
}
