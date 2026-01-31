import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const CampaignQRCode = ({ campaignId, campaignTitle }) => {
  const [showQR, setShowQR] = useState(false);
  
  // Generate the full URL for the campaign
  const campaignUrl = `${window.location.origin}/donate/${campaignId}`;

  const downloadQR = () => {
    const svg = document.getElementById(`qr-${campaignId}`);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `${campaignTitle}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(campaignUrl);
    alert("Campaign link copied to clipboard!");
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button 
        onClick={() => setShowQR(!showQR)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px"
        }}
      >
        {showQR ? "Hide QR Code" : "Share QR Code"}
      </button>

      {showQR && (
        <div style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <QRCodeSVG 
            id={`qr-${campaignId}`}
            value={campaignUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
          <p style={{ 
            marginTop: "10px", 
            fontSize: "12px", 
            color: "#6c757d",
            wordBreak: "break-all"
          }}>
            {campaignUrl}
          </p>
          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button 
              onClick={copyLink}
              style={{
                padding: "6px 12px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              Copy Link
            </button>
            <button 
              onClick={downloadQR}
              style={{
                padding: "6px 12px",
                backgroundColor: "#17a2b8",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              Download QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignQRCode;
