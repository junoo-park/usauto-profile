"use client";

import { ArrowUpRight, Check, Phone } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { siteContent } from "@/content/site";

import styles from "./one-page-site.module.css";

type Concept = "a" | "b";
type ConsultationPlacement = "desktop" | "mobile";

type ConsultationFormProps = {
  concept: Concept;
  placement: ConsultationPlacement;
};

type SubmitStatus = "idle" | "submitting" | "error";

export function ConsultationForm({ concept, placement }: ConsultationFormProps) {
  const formId = `consultation-${concept}-${placement}`;
  const titleId = `form-title-${concept}-${placement}`;
  const successTitleId = `consultation-success-title-${concept}-${placement}`;
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isSuccessOpen && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [isSuccessOpen]);

  const closeSuccessDialog = () => {
    dialogRef.current?.close();
    setIsSuccessOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const formData = new FormData(event.currentTarget);
    setStatus("submitting");

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          vehicle: formData.get("vehicle"),
          purchaseMethod: formData.get("purchaseMethod"),
          agreement: formData.get("agreement") === "on",
          website: formData.get("website"),
          concept,
          placement,
        }),
      });

      if (!response.ok) {
        throw new Error("Consultation request failed");
      }

      formRef.current?.reset();
      setStatus("idle");
      setIsSuccessOpen(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <aside
      className={`${styles.formPanel} ${
        placement === "desktop" ? styles.desktopFormPanel : styles.mobileFormPanel
      }`}
      id={formId}
      aria-labelledby={titleId}
    >
      <div className={styles.formHeading}>
        <p>{concept === "b" ? "QUICK CONSULTATION" : "PRIVATE CONSULTATION"}</p>
        <h2 id={titleId}>차량 상담 신청</h2>
        <p className={styles.formDescription}>
          비교 중인 견적이 있어도 괜찮습니다. 확인 후 김용욱 대표가 직접 연락드립니다.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.formRow}>
          <label>
            <span>
              이름 <em>필수</em>
            </span>
            <input
              autoComplete="name"
              maxLength={30}
              name="name"
              placeholder="성함을 입력해 주세요"
              required
              type="text"
            />
          </label>
          <label>
            <span>
              연락처 <em>필수</em>
            </span>
            <input
              autoComplete="tel"
              inputMode="tel"
              maxLength={15}
              name="phone"
              pattern="010[- ]?\d{4}[- ]?\d{4}"
              placeholder="010-0000-0000"
              required
              title="010-0000-0000 형식으로 입력해 주세요"
              type="tel"
            />
          </label>
        </div>

        <div className={styles.formDetailRow}>
          <label>
            <span>
              관심 차량 <em>선택</em>
            </span>
            <input maxLength={60} name="vehicle" placeholder="예: GV80" type="text" />
          </label>
          <label>
            <span>
              구매 방식 <em>선택</em>
            </span>
            <select defaultValue="" name="purchaseMethod">
              <option disabled value="">
                선택해 주세요
              </option>
              <option value="cash">일시불</option>
              <option value="installment">할부</option>
              <option value="lease">리스</option>
              <option value="long-term-rental">장기렌트</option>
            </select>
          </label>
        </div>

        <label className={styles.honeypot} aria-hidden="true">
          웹사이트
          <input autoComplete="off" name="website" tabIndex={-1} type="text" />
        </label>

        <label className={styles.agreement}>
          <input name="agreement" required type="checkbox" />
          <span>개인정보 수집 및 이용에 동의합니다. (필수)</span>
        </label>

        {status === "error" ? (
          <p className={styles.formError} role="alert">
            전송하지 못했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.
          </p>
        ) : null}

        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "전송 중입니다" : "상담 신청하기"}
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
        </button>
      </form>

      <div className={styles.formFooter}>
        <span>전화로 바로 상담</span>
        <a href={siteContent.phoneHref}>
          <Phone aria-hidden="true" size={15} strokeWidth={1.8} />
          {siteContent.phone}
        </a>
      </div>

      <dialog
        aria-labelledby={successTitleId}
        className={styles.successDialog}
        onCancel={() => setIsSuccessOpen(false)}
        onClose={() => setIsSuccessOpen(false)}
        ref={dialogRef}
      >
        <div className={styles.successDialogMark} aria-hidden="true">
          <Check size={21} strokeWidth={2} />
        </div>
        <h3 id={successTitleId}>상담 요청이 완료되었습니다</h3>
        <p>확인 후 김용욱 대표가 직접 연락드리겠습니다.</p>
        <button onClick={closeSuccessDialog} type="button">
          확인
        </button>
      </dialog>
    </aside>
  );
}
