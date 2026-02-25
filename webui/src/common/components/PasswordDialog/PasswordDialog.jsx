import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Dialog from "@/common/components/Dialog";
import Input from "@/common/components/Input";
import "./PasswordDialog.sass";
import { useTranslation, Trans } from "react-i18next";

export const PasswordDialog = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleConfirm = () => {
    if (!password.trim()) {
      setError(t("passwordDialog.validation.required"));
      return;
    }

    onConfirm(password);
    setPassword("");
    setError("");
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      title={
        <div className="password-dialog-title">
          <FontAwesomeIcon icon={faShieldAlt} className="password-dialog-title-icon" />
          {t("passwordDialog.title")}
        </div>
      }
      confirmText={t("passwordDialog.actions.login")}
      // cancelText lo puoi anche omettere se nel Dialog usi già t("common.cancel") come default
      cancelText={t("common.cancel")}
      className="password-dialog"
    >
      <div className="password-dialog-content">
        <p className="password-dialog-text">
          <Trans i18nKey="passwordDialog.text">
            Bitte geben Sie das <strong>Lehrerpasswort</strong> ein.
          </Trans>
        </p>

        <div className="password-input-wrapper">
          <Input
            type="password"
            placeholder={t("passwordDialog.input.placeholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};