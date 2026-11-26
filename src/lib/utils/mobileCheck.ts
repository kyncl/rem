export const isMobile = (): boolean => {
    const uaData = (
        navigator as Navigator & { userAgentData?: { mobile: boolean } }
    ).userAgentData;
    if (uaData) return uaData.mobile;

    const ua = navigator.userAgent;
    if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
    return /android|iphone|ipad|ipod|mobile|blackberry|iemobile|opera mini/i.test(
        ua,
    );
};
