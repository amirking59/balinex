class BaseApi {
  private static instance: BaseApi;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL!;
  }

  public static getInstance(): BaseApi {
    if (!BaseApi.instance) {
      BaseApi.instance = new BaseApi();
    }
    return BaseApi.instance;
  }

  public async request<T>(endpoint: string, options: RequestInit = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const response = await fetch(endpoint.startsWith("/") ? `${this.baseUrl}${endpoint}` : endpoint, {
      ...options,
      headers,
      signal: AbortSignal.timeout(50000),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.error(errorData);
      throw new Error(errorData.message || "API error");
    }

    return response.json() as T;
  }
}

export default BaseApi;
