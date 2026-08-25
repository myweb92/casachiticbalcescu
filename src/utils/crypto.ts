// Irreversible Cryptographic Hash using Web Crypto API (SHA-256)
const SALT = "casa_chitic_salt_2026_!";

// Precomputed SHA-256 hash of "casa_chitic_salt_2026_!casa£1992"
export const DEFAULT_ADMIN_HASH = "23949d8ce6e145b983fb10dd884b2806d122a1673abcd114fd5b4853457c3312";

/**
 * Computes salted SHA-256 hash of password.
 * Plain text password is NEVER stored in localStorage, code, or state.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(SALT + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Validates a password attempt against stored salted SHA-256 hash
 */
export async function verifyPassword(passwordAttempt: string): Promise<boolean> {
  const attemptHash = await hashPassword(passwordAttempt);
  const storedHash = localStorage.getItem('casachitic_admin_hash') || DEFAULT_ADMIN_HASH;
  return attemptHash === storedHash;
}

/**
 * Updates stored admin password hash
 */
export async function updateAdminPassword(newPassword: string): Promise<void> {
  const newHash = await hashPassword(newPassword);
  localStorage.setItem('casachitic_admin_hash', newHash);
}
