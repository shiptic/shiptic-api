import axios from "axios";

type FedExApiType = "rates" | "tracking";

interface TokenState {
  accessToken: string | null;
  expiresAtMs: number | null;
}

export class FedExAuth {
  private tokenStore: Record<FedExApiType, TokenState> = {
    rates: { accessToken: null, expiresAtMs: null },
    tracking: { accessToken: null, expiresAtMs: null },
  };

  async getAccessToken(api: FedExApiType): Promise<string> {
    const state = this.tokenStore[api];
    const now = Date.now();

    if (state.accessToken && state.expiresAtMs && now < state.expiresAtMs) {
      return state.accessToken;
    }

    return this.refreshToken(api);
  }

  private async refreshToken(api: FedExApiType): Promise<string> {
    const { clientId, clientSecret } = this.getCredentials(api);

    try {
      const response = await axios.post(
        "https://apis-sandbox.fedex.com/oauth/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const { access_token, expires_in } = response.data;

      this.tokenStore[api] = {
        accessToken: access_token,
        expiresAtMs: Date.now() + expires_in * 1000,
      };

      console.debug(`FedEx OAuth token refreshed for ${api}`);

      return access_token;
    } catch (error: any) {
      console.error(
        `FedEx OAuth error (${api}):`,
        error.response?.data || error.message
      );
      throw new Error(`Failed to retrieve FedEx OAuth token for ${api}`);
    }
  }

  private getCredentials(api: FedExApiType) {
    if (api === "rates") {
      return {
        clientId: process.env.FEDEX_RATES_CLIENT_KEY!,
        clientSecret: process.env.FEDEX_RATES_CLIENT_SECRET!,
      };
    }

    return {
      clientId: process.env.FEDEX_TRACKING_CLIENT_KEY!,
      clientSecret: process.env.FEDEX_TRACKING_CLIENT_SECRET!,
    };
  }
}