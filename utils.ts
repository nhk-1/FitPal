
/**
 * Génère un ID unique compatible même sur les connexions non-sécurisées (HTTP)
 * car crypto.randomUUID() nécessite souvent HTTPS ou localhost.
 */
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback si erreur inattendue
    }
  }
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};
