"use client";

import { useState } from "react";

type FormState = {
  name: string;
  cnpj: string;
  foundedDate: string;
  neighborhood: string;
  address: string;
  city: string;
  state: string;
  president: string;
  vicePresident: string;
  carnivalDirector: string;
  components: string;
  instagram: string;
  phone: string;
  email: string;
  presentation: string;
};

const INITIAL: FormState = {
  name: "",
  cnpj: "",
  foundedDate: "",
  neighborhood: "",
  address: "",
  city: "",
  state: "",
  president: "",
  vicePresident: "",
  carnivalDirector: "",
  components: "",
  instagram: "",
  phone: "",
  email: "",
  presentation: "",
};

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

const TODAY = new Date().toISOString().slice(0, 10);

const PRESENTATION_LIMIT = 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const maskCnpj = (raw: string): string => {
  const d = raw.replace(/\D/g, "").slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  }
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
};

const maskPhone = (raw: string): string => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 3) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.charAt(2)}.${d.slice(3)}`;
  return `(${d.slice(0, 2)}) ${d.charAt(2)}.${d.slice(3, 7)}-${d.slice(7)}`;
};

const isValidCnpj = (raw: string): boolean => {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const checkDigit = (length: number): number => {
    const weights =
      length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = d
      .slice(0, length)
      .split("")
      .reduce((acc, char, i) => acc + Number(char) * weights[i], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  return checkDigit(12) === Number(d[12]) && checkDigit(13) === Number(d[13]);
};

const normalizeInstagram = (raw: string): string =>
  raw
    .trim()
    .replace(/^https?:\/\/(www\.)?(instagram\.com|ig\.me)\//, "")
    .replace(/^@/, "")
    .toLowerCase();

const isValidDate = (value: string): boolean => {
  if (!value) return false;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const iso = date.toISOString().slice(0, 10);
  return iso === value;
};

const fieldClass = (error?: string) =>
  `input${error ? " input--error" : ""}`;

function FilField({
  id,
  label,
  error,
  hint,
  hintError,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  hintError?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="field filiation__field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="field-hint field-hint--error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className={`field-hint${hintError ? " field-hint--error" : ""}`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const buildPayload = (f: FormState) => ({
  bloco: {
    nome: f.name.trim(),
    cnpj: f.cnpj.replace(/\D/g, ""),
    dataFundacao: f.foundedDate,
    bairro: f.neighborhood.trim(),
    endereco: f.address.trim(),
    cidade: f.city.trim(),
    uf: f.state,
  },
  responsaveis: {
    presidente: f.president.trim(),
    vicePresidente: f.vicePresident.trim(),
    diretorCarnaval: f.carnivalDirector.trim(),
  },
  informacoes: {
    componentes: Number(f.components),
    instagram: normalizeInstagram(f.instagram),
    telefone: f.phone.replace(/\D/g, ""),
    email: f.email.trim(),
    apresentacao: f.presentation.trim(),
  },
});

export function FiliationForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const onCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = maskCnpj(e.target.value);
    setForm((prev) => ({ ...prev, cnpj: value }));
    if (errors.cnpj) setErrors((prev) => ({ ...prev, cnpj: undefined }));
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = maskPhone(e.target.value);
    setForm((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = (): Partial<Record<keyof FormState, string>> => {
    const next: Partial<Record<keyof FormState, string>> = {};
    const value = (field: keyof FormState) => form[field].trim();

    if (!value("name")) next.name = "Informe o nome do bloco.";
    if (!form.cnpj.replace(/\D/g, "")) {
      next.cnpj = "Informe o CNPJ do bloco.";
    } else if (!isValidCnpj(form.cnpj)) {
      next.cnpj = "CNPJ inválido. Confira os 14 dígitos.";
    }
    if (!form.foundedDate) {
      next.foundedDate = "Informe a data de fundação.";
    } else if (!isValidDate(form.foundedDate)) {
      next.foundedDate = "Data inválida.";
    } else if (form.foundedDate > TODAY) {
      next.foundedDate = "A data de fundação não pode estar no futuro.";
    }
    if (!value("neighborhood")) next.neighborhood = "Informe o bairro.";
    if (!value("address")) next.address = "Informe o endereço.";
    if (!value("city")) next.city = "Informe a cidade.";
    if (!form.state) next.state = "Selecione a UF.";

    if (!value("president")) next.president = "Informe o nome do presidente.";
    if (!value("vicePresident")) {
      next.vicePresident = "Informe o nome do vice-presidente.";
    }
    if (!value("carnivalDirector")) {
      next.carnivalDirector = "Informe o nome do diretor de Carnaval.";
    }

    const componentsDigits = form.components.replace(/\D/g, "");
    const componentsNumber = Number(componentsDigits);
    if (!componentsDigits) {
      next.components = "Informe a quantidade aproximada de componentes.";
    } else if (Number.isInteger(componentsNumber) && componentsNumber <= 0) {
      next.components = "Informe uma quantidade maior que zero.";
    }

    if (!form.instagram.trim()) {
      next.instagram = "Informe o Instagram do bloco.";
    } else if (!/^[a-zA-Z0-9._]{2,30}$/.test(normalizeInstagram(form.instagram))) {
      next.instagram = "Instagram inválido. Ex.: @seubloco";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      next.phone = "Informe o telefone ou WhatsApp para contato.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      next.phone = "Telefone inválido. Mínimo de 10 dígitos com DDD.";
    }

    if (!value("email")) {
      next.email = "Informe o e-mail institucional ou de contato.";
    } else if (!EMAIL_RE.test(value("email"))) {
      next.email = "E-mail inválido. Ex.: contato@bloco.com.br";
    }

    if (!value("presentation")) {
      next.presentation = "Apresente brevemente o bloco.";
    }
    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      buildPayload(form);
      setSent(true);
    }
  };

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setSent(false);
  };

  if (sent) {
    return (
      <div className="filiation filiation--done" role="status">
        <span className="section-head__eyebrow">Filiação</span>
        <h3>Pré-inscrição registrada</h3>
        <p className="muted filiation__done-text">
          A pré-inscrição do bloco <strong>{form.name}</strong> foi validada e
          registrada nesta interface. Esta confirmação ainda não representa
          envio à liga: a integração oficial segue em estruturação e será
          conectada a este formulário em breve. A diretoria da LIBEERJ
          responderá cada inscrição pessoalmente.
        </p>
        <button type="button" className="btn btn--line" onClick={reset}>
          Nova pré-inscrição
        </button>
      </div>
    );
  }

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <form className="filiation" onSubmit={onSubmit} noValidate>
      <div className="filiation__head">
        <span className="section-head__eyebrow">Filiação</span>
        <h3>Pré-inscrição de bloco</h3>
        <p className="muted">
          Todos os campos são obrigatórios. As informações enviadas são
          analisadas pela instituição e cada contato recebe retorno direto da
          diretoria.
        </p>
      </div>

      <fieldset className="filiation-group">
        <legend className="filiation-group__title">Dados do bloco</legend>
        <div className="filiation__row">
          <FilField id="fil-name" label="Nome do bloco" error={errors.name}>
            <input
              id="fil-name"
              className={fieldClass(errors.name)}
              type="text"
              autoComplete="organization"
              placeholder="Nome do bloco"
              value={form.name}
              onChange={update("name")}
            />
          </FilField>
          <FilField id="fil-cnpj" label="CNPJ" error={errors.cnpj} hint="Somente CNPJ ativo.">
            <input
              id="fil-cnpj"
              className={fieldClass(errors.cnpj)}
              type="text"
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              value={form.cnpj}
              onChange={onCnpjChange}
            />
          </FilField>
        </div>
        <div className="filiation__row">
          <FilField id="fil-founded" label="Data de fundação" error={errors.foundedDate}>
            <input
              id="fil-founded"
              className={fieldClass(errors.foundedDate)}
              type="date"
              max={TODAY}
              value={form.foundedDate}
              onChange={update("foundedDate")}
            />
          </FilField>
          <FilField id="fil-neighborhood" label="Bairro" error={errors.neighborhood}>
            <input
              id="fil-neighborhood"
              className={fieldClass(errors.neighborhood)}
              type="text"
              autoComplete="address-level2"
              placeholder="Bairro onde o bloco atua"
              value={form.neighborhood}
              onChange={update("neighborhood")}
            />
          </FilField>
        </div>
        <div className="filiation__row filiation__row--full">
          <FilField id="fil-address" label="Endereço" error={errors.address}>
            <input
              id="fil-address"
              className={fieldClass(errors.address)}
              type="text"
              autoComplete="street-address"
              placeholder="Endereço da sede ou ponto de encontro"
              value={form.address}
              onChange={update("address")}
            />
          </FilField>
        </div>
        <div className="filiation__row">
          <FilField id="fil-city" label="Cidade" error={errors.city}>
            <input
              id="fil-city"
              className={fieldClass(errors.city)}
              type="text"
              autoComplete="address-level1"
              placeholder="Cidade"
              value={form.city}
              onChange={update("city")}
            />
          </FilField>
          <FilField id="fil-state" label="Estado / UF" error={errors.state}>
            <select
              id="fil-state"
              className={`select${errors.state ? " input--error" : ""}`}
              value={form.state}
              onChange={update("state")}
            >
              <option value="">Selecione a UF</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </FilField>
        </div>
      </fieldset>

      <fieldset className="filiation-group">
        <legend className="filiation-group__title">Responsáveis</legend>
        <div className="filiation__row">
          <FilField id="fil-president" label="Nome do Presidente" error={errors.president}>
            <input
              id="fil-president"
              className={fieldClass(errors.president)}
              type="text"
              autoComplete="organization"
              placeholder="Nome completo"
              value={form.president}
              onChange={update("president")}
            />
          </FilField>
          <FilField id="fil-vice" label="Nome do Vice-Presidente" error={errors.vicePresident}>
            <input
              id="fil-vice"
              className={fieldClass(errors.vicePresident)}
              type="text"
              autoComplete="organization"
              placeholder="Nome completo"
              value={form.vicePresident}
              onChange={update("vicePresident")}
            />
          </FilField>
        </div>
        <div className="filiation__row">
          <FilField
            id="fil-director"
            label="Nome do Diretor de Carnaval"
            error={errors.carnivalDirector}
          >
            <input
              id="fil-director"
              className={fieldClass(errors.carnivalDirector)}
              type="text"
              autoComplete="off"
              placeholder="Nome completo"
              value={form.carnivalDirector}
              onChange={update("carnivalDirector")}
            />
          </FilField>
          <div aria-hidden="true" />
        </div>
      </fieldset>

      <fieldset className="filiation-group">
        <legend className="filiation-group__title">Informações do bloco</legend>
        <div className="filiation__row">
          <FilField
            id="fil-components"
            label="Quantidade aproximada de componentes"
            error={errors.components}
          >
            <input
              id="fil-components"
              className={fieldClass(errors.components)}
              type="text"
              inputMode="numeric"
              placeholder="Ex.: 800"
              value={form.components}
              onChange={update("components")}
            />
          </FilField>
          <FilField
            id="fil-instagram"
            label="Instagram"
            error={errors.instagram}
            hint="Ex.: @seubloco"
          >
            <input
              id="fil-instagram"
              className={fieldClass(errors.instagram)}
              type="text"
              autoComplete="off"
              placeholder="@seubloco"
              value={form.instagram}
              onChange={update("instagram")}
            />
          </FilField>
        </div>
        <div className="filiation__row">
          <FilField
            id="fil-phone"
            label="WhatsApp / telefone de contato"
            error={errors.phone}
          >
            <input
              id="fil-phone"
              className={fieldClass(errors.phone)}
              type="tel"
              inputMode="tel"
              maxLength={16}
              placeholder="(21) 9.0000-0000"
              value={form.phone}
              onChange={onPhoneChange}
            />
          </FilField>
          <FilField
            id="fil-email"
            label="E-mail institucional ou de contato"
            error={errors.email}
          >
            <input
              id="fil-email"
              className={fieldClass(errors.email)}
              type="email"
              autoComplete="email"
              placeholder="contato@bloco.com.br"
              value={form.email}
              onChange={update("email")}
            />
          </FilField>
        </div>
      </fieldset>

      <fieldset className="filiation-group">
        <legend className="filiation-group__title">Informações adicionais</legend>
        <div className="filiation__row filiation__row--full">
          <FilField
            id="fil-presentation"
            label="Apresentação do bloco / informações adicionais"
            error={errors.presentation}
            hint={
              form.presentation.length >= PRESENTATION_LIMIT
                ? "Limite de 1000 caracteres atingido."
                : `${PRESENTATION_LIMIT - form.presentation.length} caracteres restantes.`
            }
            hintError={form.presentation.length >= PRESENTATION_LIMIT}
          >
            <textarea
              id="fil-presentation"
              className={`${fieldClass(errors.presentation)}${
                form.presentation.length >= PRESENTATION_LIMIT
                  ? " input--error"
                  : ""
              }`}
              rows={5}
              maxLength={PRESENTATION_LIMIT}
              placeholder="Conte brevemente a atuação, história ou outras informações relevantes do bloco para a análise da pré-inscrição."
              value={form.presentation}
              onChange={update("presentation")}
            />
          </FilField>
        </div>
      </fieldset>

      {hasErrors && (
        <p className="filiation__summary" role="alert">
          Verifique os campos destacados antes de enviar a pré-inscrição.
        </p>
      )}

      <div className="filiation__actions">
        <button type="submit" className="btn btn--gold">
          Enviar pré-inscrição
        </button>
        <p className="field-hint">
          Nenhum dado é enviado neste momento — a integração oficial será
          conectada a este formulário em breve.
        </p>
      </div>
    </form>
  );
}