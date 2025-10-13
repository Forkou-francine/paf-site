import { getContent } from "../data/content";
import { useLanguage } from "./LanguageProvider";

export function usePortfolioContent() {
  const { language } = useLanguage();
  return getContent(language);
}
