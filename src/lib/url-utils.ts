/**
 * SunHex OAuth Utility Functions
 */

/**
 * Validates if the request timestamp is still fresh (within 3 minutes)
 */
export function isTimestampValid(timestamp: string | null): boolean {
    if (!timestamp) return false;

    try {
        const ts = parseInt(timestamp, 10);
        const now = Date.now();
        const diff = Math.abs(now - ts);

        // Allowed skew: 3 minutes (180,000 ms)
        return diff <= 180000;
    } catch {
        return false;
    }
}

/**
 * Builds the redirect URL for the client with parameters
 */
export function buildRedirectUrl(
    baseUrl: string,
    status: number,
    fragment?: string,
    error?: string
): string {
    try {
        const url = new URL(baseUrl);
        url.searchParams.set("status", status.toString());

        if (fragment) {
            url.searchParams.set("fragment", fragment);
        }

        if (error) {
            url.searchParams.set("error", error);
        }

        return url.toString();
    } catch {
        // Fallback for potentially malformed URLs
        const connector = baseUrl.includes("?") ? "&" : "?";
        let finalUrl = `${baseUrl}${connector}status=${status}`;
        if (fragment) finalUrl += `&fragment=${fragment}`;
        if (error) finalUrl += `&error=${error}`;
        return finalUrl;
    }
}
