import { PlatformMessages, esEs, enUS } from "@saas-quick-start/platform/messages";

export const getTranslations = (locale: string) => {
  const translations = new Map<string, PlatformMessages>([
    ['es', esEs],
    ['en', enUS],
  ]);

  const translation = translations.get(locale);

  if (!translation) {
    throw new Error('Locale not implemented');
  }

  return translation;
};
