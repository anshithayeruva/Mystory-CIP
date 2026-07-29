import QRCode from 'qrcode';

/**
 * Generates a random uppercase alphanumeric session code of specified length.
 * Excludes ambiguous characters (0, O, I, 1) for user readability.
 */
export function generateAlphanumericCode(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

/**
 * Generates a Base64 PNG Data URL for a given session code string.
 */
export async function generateQrCodeDataUrl(sessionCode: string): Promise<string> {
  const qrDataUrl = await QRCode.toDataURL(sessionCode, {
    width: 300,
    margin: 2,
    color: {
      dark: '#0f172a',  // Slate 900
      light: '#ffffff', // White
    },
  });
  return qrDataUrl;
}
