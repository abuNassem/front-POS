import { ImageResponse } from "next/og";

export const alt = "Smart Cloud POS System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                    color: "white",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -2 }}>
                    Smart POS
                </div>
                <div style={{ fontSize: 44, marginTop: 16, opacity: 0.9 }}>
                    Cloud Point of Sale System
                </div>
                <div style={{ fontSize: 30, marginTop: 28, opacity: 0.75 }}>
                    Sales · Inventory · Invoices · Analytics
                </div>
            </div>
        ),
        { ...size }
    );
}
