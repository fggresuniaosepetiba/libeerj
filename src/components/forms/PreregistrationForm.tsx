"use client";

import { useState } from "react";

const INITIAL = { name: "", email: "", phone: "", message: "" };

const MESSAGE_LIMIT = 300;

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.charAt(2)}.${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.charAt(2)}.${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export function PreregistrationForm() {
  const [form, setForm] = useState(INITIAL);
  const [sent, setSent] = useState(false);

  const update = (field: keyof typeof INITIAL) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="join-card join-card--done" role="status">
        <h3>Interesse registrado!</h3>
        <p>
          Obrigado, {form.name.split(" ")[0] || "folião"}! Sua pré-inscrição foi
          anotada. A diretoria da LIBEERJ entrará em contato em breve.
        </p>
        <button
          type="button"
          className="btn btn--line"
          onClick={() => {
            setForm(INITIAL);
            setSent(false);
          }}
        >
          Fazer nova inscrição
        </button>
      </div>
    );
  }

  return (
    <form className="join-card" onSubmit={onSubmit}>
      <span className="section-head__eyebrow">Pré-inscrição</span>
      <h3>Quero participar da LIBEERJ</h3>
      <p className="muted">
        Informe seus dados abaixo. Este formulário é apenas uma manifestação de
        interesse — sem vínculo ou pagamento.
      </p>

      <div className="field">
        <label htmlFor="pre-nome">Nome</label>
        <input
          id="pre-nome"
          className="input"
          type="text"
          required
          autoComplete="name"
          placeholder="Seu nome completo"
          value={form.name}
          onChange={update("name")}
        />
      </div>

      <div className="field">
        <label htmlFor="pre-email">E-mail</label>
        <input
          id="pre-email"
          className="input"
          type="email"
          required
          autoComplete="email"
          placeholder="voce@email.com"
          value={form.email}
          onChange={update("email")}
        />
      </div>

      <div className="field">
        <label htmlFor="pre-phone">Telefone / WhatsApp</label>
        <input
          id="pre-phone"
          className="input"
          type="tel"
          inputMode="tel"
          maxLength={16}
          autoComplete="tel"
          placeholder="(21) 9.0000-0000"
          value={form.phone}
          onChange={onPhoneChange}
        />
        <p className="field-hint">
          Máximo de 11 dígitos: DDD + 9 números.
        </p>
      </div>

      <div className="field">
        <label htmlFor="pre-message">Interesse / mensagem</label>
        <textarea
          id="pre-message"
          className={`input${form.message.length >= MESSAGE_LIMIT ? " input--error" : ""}`}
          rows={3}
          maxLength={MESSAGE_LIMIT}
          placeholder="Conte para nós sua ideia ou como deseja participar."
          value={form.message}
          onChange={update("message")}
        />
        <p
          className={`field-hint${form.message.length >= MESSAGE_LIMIT ? " field-hint--error" : ""}`}
          aria-live="polite"
        >
          {form.message.length >= MESSAGE_LIMIT
            ? "Limite de 300 caracteres atingido."
            : `${MESSAGE_LIMIT - form.message.length} caracteres restantes.`}
        </p>
      </div>

      <button type="submit" className="btn btn--gold" style={{ justifySelf: "start" }}>
        Enviar interesse
      </button>
    </form>
  );
}