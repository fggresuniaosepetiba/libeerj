"use client";

import Image from "next/image";
import { useState } from "react";
import { DONATION } from "@/lib/site";

type DocKind = "cpf" | "cnpj";

const QUICK_VALUES = [5, 10, 20, 50, 100];

const METHODS = [
  { id: "pix", label: "Pix", note: "Único meio de pagamento no momento." },
] as const;

const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const maskDoc = (raw: string, kind: DocKind): string => {
  const d = raw.replace(/\D/g, "").slice(0, kind === "cpf" ? 11 : 14);
  if (kind === "cpf") {
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  }
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
};

const parseAmount = (raw: string): number | null => {
  const digits = raw.replace(/\D/g, "");
  if (!digits || digits === "000") return null;
  return Number(digits) / 100;
};

const maskMoney = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "R$ 0,00";
  const padded = digits.padStart(3, "0");
  const intPart = padded.slice(0, -2) || "0";
  const decPart = padded.slice(-2);
  const formatted = Number(intPart).toLocaleString("pt-BR");
  return `R$ ${formatted},${decPart}`;
};

const UNIDADE = [
  "", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove",
  "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis",
  "dezessete", "dezoito", "dezenove",
];

const DEZENA = [
  "", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta",
  "oitenta", "noventa",
];

const CENTENA = [
  "", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos",
  "seiscentos", "setecentos", "oitocentos", "novecentos",
];

const centenas = (n: number): string => {
  if (n < 100) {
    if (n < 20) return UNIDADE[n];
    const d = Math.floor(n / 10);
    const u = n % 10;
    return u ? `${DEZENA[d]} e ${UNIDADE[u]}` : DEZENA[d];
  }
  const c = Math.floor(n / 100);
  const r = n % 100;
  if (c === 1 && r === 0) return "cem";
  const prefix = c === 1 ? "cento" : CENTENA[c];
  return r ? `${prefix} e ${centenas(r)}` : prefix;
};

const numeroPorExtenso = (n: number): string => {
  if (n === 0) return "zero";
  const partes: string[] = [];
  let rest = n;
  const mi = Math.floor(rest / 1_000_000);
  if (mi > 0) {
    partes.push(`${centenas(mi)} ${mi === 1 ? "milhão" : "milhões"}`);
    rest %= 1_000_000;
  }
  const k = Math.floor(rest / 1_000);
  if (k > 0) {
    partes.push(`${k === 1 ? "mil" : `${centenas(k)} mil`}`);
    rest %= 1_000;
  }
  if (rest > 0) partes.push(centenas(rest));
  return partes.join(" e ");
};

const valorPorExtenso = (raw: string): string | null => {
  const cents = Number(raw.replace(/\D/g, ""));
  if (!cents || cents <= 0) return null;
  const reais = Math.floor(cents / 100);
  const centavos = cents % 100;
  const partes: string[] = [];
  if (reais > 0) {
    const unidadeReais =
      reais >= 1_000_000 && reais % 1_000_000 === 0
        ? "de reais"
        : reais === 1
          ? "real"
          : "reais";
    partes.push(`${numeroPorExtenso(reais)} ${unidadeReais}`);
  }
  if (centavos > 0) {
    partes.push(
      `${numeroPorExtenso(centavos)} ${centavos === 1 ? "centavo" : "centavos"}`,
    );
  }
  const texto = partes.join(" e ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

const DEMO_QR_URL =
  "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Flibeerj.vercel.app%2F";

export function DonationForm() {
  const [name, setName] = useState("");
  const [docKind, setDocKind] = useState<DocKind>("cpf");
  const [doc, setDoc] = useState("");
  const [amount, setAmount] = useState(5);
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const resolveAmount = () => (customOpen ? parseAmount(custom) : amount);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDoc = doc.replace(/\D/g, "");
    const value = customOpen ? parseAmount(custom) : amount;
    if (name.trim().length < 2) {
      setError("Informe seu nome.");
      return;
    }
    if (cleanDoc.length !== (docKind === "cpf" ? 11 : 14)) {
      setError(
        docKind === "cpf"
          ? "Informe um CPF válido (11 dígitos)."
          : "Informe um CNPJ válido (14 dígitos).",
      );
      return;
    }
    if (!value) {
      setError("Informe um valor para a doação.");
      return;
    }
    setError(null);
    setDone(true);
  };

  const switchDoc = (kind: DocKind) => {
    setDocKind(kind);
    setDoc("");
  };

  const reset = () => {
    setName("");
    setDocKind("cpf");
    setDoc("");
    setAmount(5);
    setCustomOpen(false);
    setCustom("");
    setError(null);
    setCopied(false);
    setDone(false);
  };

  const copyKey = async () => {
    if (!DONATION.pixKey) return;
    try {
      await navigator.clipboard.writeText(DONATION.pixKey);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (done) {
    const value = resolveAmount() ?? amount;
    return (
      <div className="donate">
        <div className="donate-card" role="status">
          <h3>Contribuição de {money(value)}</h3>
          <p className="muted">
            Registramos sua intenção de apoiar a LIBEERJ como{" "}
            {docKind === "cpf" ? "pessoa física" : "pessoa jurídica"}, no valor
            de <strong>{money(value)}</strong>, via <strong>Pix</strong>.
          </p>

          {DONATION.qrCode ? (
            <div className="donate__result">
              <div className="donate__qr">
                <Image
                  src={DONATION.qrCode}
                  alt="QR Code Pix para doação à LIBEERJ"
                  width={180}
                  height={180}
                />
              </div>
              {(DONATION.beneficiaryName || DONATION.description) && (
                <p className="donate__beneficiary">
                  {DONATION.beneficiaryName}
                  {DONATION.document ? ` · ${DONATION.document}` : ""}
                  {DONATION.description ? ` — ${DONATION.description}` : ""}
                </p>
              )}
              <div className="donate__key">
                <span className="donate__label">Pix copia e cola</span>
                <code>{DONATION.pixKey}</code>
                <button type="button" className="btn btn--line" onClick={copyKey}>
                  {copied ? "Copiado!" : "Copiar chave Pix"}
                </button>
              </div>
            </div>
          ) : (
            <div className="donate__result">
              <div className="donate__qr">
                <Image
                  src={DEMO_QR_URL}
                  alt="QR Code de demonstração apontando para o site da LIBEERJ"
                  width={180}
                  height={180}
                />
              </div>
              <p>
                QR Code de demonstração — ao escanear, ele abre o site da
                LIBEERJ. A chave Pix oficial da liga ainda está sendo
                configurada e será publicada aqui em breve.
              </p>
            </div>
          )}

          <button
            type="button"
            className="btn btn--line"
            style={{ justifySelf: "start" }}
            onClick={reset}
          >
            Refazer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="donate">
      <form className="donate-card" onSubmit={submit} noValidate>
        <div>
          <span className="section-head__eyebrow">Sua contribuição</span>
          <h3>Eu quero apoiar a LIBEERJ</h3>
        </div>

        <div className="field">
          <label htmlFor="donate-name">Nome</label>
          <input
            id="donate-name"
            className="input"
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo ou da instituição"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <fieldset className="donate__doc">
          <legend className="donate__label">Tipo de doador</legend>
          <div className="donate__doc-kind">
            <button
              type="button"
              aria-pressed={docKind === "cpf"}
              onClick={() => switchDoc("cpf")}
            >
              Pessoa física · CPF
            </button>
            <button
              type="button"
              aria-pressed={docKind === "cnpj"}
              onClick={() => switchDoc("cnpj")}
            >
              Pessoa jurídica · CNPJ
            </button>
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="donate-doc">{docKind === "cpf" ? "CPF" : "CNPJ"}</label>
          <input
            id="donate-doc"
            className="input"
            type="text"
            inputMode="numeric"
            placeholder={docKind === "cpf" ? "000.000.000-00" : "00.000.000/0000-00"}
            value={doc}
            onChange={(e) => setDoc(maskDoc(e.target.value, docKind))}
          />
        </div>

        <div>
          <p className="donate__label">Escolha o valor</p>
          <div className="donate__amounts">
            {QUICK_VALUES.map((v) => (
              <button
                key={v}
                type="button"
                className="donate__amount"
                aria-pressed={!customOpen && amount === v}
                onClick={() => {
                  setAmount(v);
                  setCustomOpen(false);
                }}
              >
                {money(v)}
              </button>
            ))}
            <button
              type="button"
              className="donate__amount donate__amount--other"
              aria-pressed={customOpen}
              onClick={() => setCustomOpen(true)}
            >
              Outro valor
            </button>
          </div>
          {customOpen && (
            <div className="field donate__custom">
              <label htmlFor="donate-custom">Outro valor</label>
              <input
                id="donate-custom"
                className="input"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                value={custom}
                onChange={(e) => setCustom(maskMoney(e.target.value))}
              />
              <p className="donate__extenso" aria-live="polite">
                {valorPorExtenso(custom) ?? "\u00A0"}
              </p>
            </div>
          )}
        </div>

        <fieldset className="donate__method-field">
          <legend className="donate__label">Como você vai pagar</legend>
          <div className="donate__method">
            {METHODS.map((m) => (
              <label key={m.id} className="donate__method-opt">
                <input type="radio" name="method" value={m.id} defaultChecked />
                <span>
                  <strong>{m.label}</strong>
                  <span className="donate__method-note">{m.note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <p className="field-hint field-hint--error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn--gold" style={{ justifySelf: "start" }}>
          Doar via Pix
        </button>

        <p className="field-hint">
          Nenhuma cobrança é efetuada agora. A doação é concluída quando você
          escaneia o QR Code ou realiza a transferência Pix.
        </p>
      </form>
    </div>
  );
}