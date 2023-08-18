// import { PlatformMessages, esEs, enUS } from "@sports-mind/messages";

export const getTranslations = (locale: string) => {
  const translations = new Map<string, string>([

  ]);
  // const translations = new Map<string, PlatformMessages>([
  //   ['es', esEs],
  //   ['en', enUS],
  // ]);

  const translation = translations.get(locale);

  if (!translation) {
    throw new Error('Locale not implemented');
  }

  return translation;
};
