// Irreversible Cryptographic Hash using Web Crypto API (SHA-256)
const SALT = "casa_chitic_salt_2026_!";

export const ADMIN_USERNAME = "chiticbalcescu";

// Precomputed salted SHA-256 hashes (plaintext passwords are never stored)
export const DEFAULT_ADMIN_HASH = "23949d8ce6e145b983fb10dd884b2806d122a1673abcd114fd5b4853457c3312";
export const PRIMARY_ADMIN_HASH = "4881eb930997b576eae766a74d34834472fb88402e4349bcbb4359e7e5876dc7";

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
 * Validates the administrator username.
 */
export function verifyUsername(usernameAttempt: string): boolean {
  return usernameAttempt.trim() === ADMIN_USERNAME;
}

/**
 * Validates a password attempt against the active salted SHA-256 hash
 * while keeping the default admin password valid.
 */
export async function verifyPassword(passwordAttempt: string): Promise<boolean> {
  const attemptHash = await hashPassword(passwordAttempt);
  const storedHash = localStorage.getItem('casachitic_admin_hash');
  if (storedHash) {
    return attemptHash === storedHash || attemptHash === DEFAULT_ADMIN_HASH;
  }
  return attemptHash === PRIMARY_ADMIN_HASH || attemptHash === DEFAULT_ADMIN_HASH;
}

/**
 * Checks whether a persisted session hash matches any currently valid admin hash.
 */
export function isValidSessionHash(sessionHash: string | null): boolean {
  if (!sessionHash) return false;
  const storedHash = localStorage.getItem('casachitic_admin_hash');
  if (storedHash) {
    return sessionHash === storedHash || sessionHash === DEFAULT_ADMIN_HASH;
  }
  return sessionHash === PRIMARY_ADMIN_HASH || sessionHash === DEFAULT_ADMIN_HASH;
}

/**
 * Updates stored admin password hash.
 */
export async function updateAdminPassword(newPassword: string): Promise<void> {
  const newHash = await hashPassword(newPassword);
  localStorage.setItem('casachitic_admin_hash', newHash);
}
