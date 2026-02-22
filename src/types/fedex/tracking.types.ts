export interface TrackingByTrackingNumber {
    includeDetailedScans: boolean;
    trackingInfo: Array<TrackingInfo>;
}

interface TrackingInfo {
    shipDateBegin?: string; // Format: YYYY-MM-DD
    shipDateEnd?: string; // Format: YYYY-MM-DD
    trackingNumberInfo: TrackingNumberInfo;
}

interface TrackingNumberInfo {
    trackingNumber: string;
    carrierCode?: "FDXE" | "FDXG" | "FXSP" | "FXFR" | "FDXC" | "FXCC" | "FEDEX_CARGO" | "FEDEX_CUSTOM_CRITICAL" | "FEDEX_EXPRESS" | "FEDEX_FREIGHT" | "FEDEX_GROUND" | "FEDEX_OFFICE" | "FEDEX_KINKOS" | "FX" | "FDFR" | "FDEG" | "FXK" | "FDC" | "FDCC";
    trackingNumberUniqueId?: string;
}
