import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;

  return (
    <div style={{ position: "fixed", top: 12, right: 12, zIndex: 9999, display: "flex", gap: 8 }}>
      <button onClick={() => i18n.changeLanguage("de")} disabled={lang?.startsWith("de")}>
        DE
      </button>
      <button onClick={() => i18n.changeLanguage("it")} disabled={lang?.startsWith("it")}>
        IT
      </button>
    </div>
  );
}