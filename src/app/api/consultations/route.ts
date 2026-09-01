import nodemailer from "nodemailer";

export const runtime = "nodejs";

const PURCHASE_METHODS = {
  cash: "일시불",
  installment: "할부",
  lease: "리스",
  "long-term-rental": "장기렌트",
} as const;

type PurchaseMethod = keyof typeof PURCHASE_METHODS;

type ConsultationPayload = {
  name?: unknown;
  phone?: unknown;
  vehicle?: unknown;
  purchaseMethod?: unknown;
  agreement?: unknown;
  website?: unknown;
  concept?: unknown;
  placement?: unknown;
};

function readText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function formatSubmittedAt() {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: "Asia/Seoul",
  }).format(new Date());
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > 10_000) {
    return Response.json({ message: "요청 내용이 너무 큽니다." }, { status: 413 });
  }

  let payload: ConsultationPayload;

  try {
    payload = (await request.json()) as ConsultationPayload;
  } catch {
    return Response.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }

  if (readText(payload.website, 120)) {
    return Response.json({ ok: true });
  }

  const name = readText(payload.name, 30);
  const phone = readText(payload.phone, 20);
  const normalizedPhone = phone.replace(/\D/g, "");
  const vehicle = readText(payload.vehicle, 60) || "미입력";
  const purchaseMethod = readText(payload.purchaseMethod, 30);
  const source = `${readText(payload.concept, 1).toUpperCase() || "-"} / ${
    readText(payload.placement, 10) || "unknown"
  }`;

  if (name.length < 2 || !/^010\d{8}$/.test(normalizedPhone) || payload.agreement !== true) {
    return Response.json({ message: "필수 입력 내용을 확인해 주세요." }, { status: 400 });
  }

  if (purchaseMethod && !(purchaseMethod in PURCHASE_METHODS)) {
    return Response.json({ message: "구매 방식이 올바르지 않습니다." }, { status: 400 });
  }

  const mailUser = process.env.MAIL_USER;
  const mailPassword = process.env.MAIL_APP_PASSWORD;
  const recipient = process.env.CONSULTATION_TO_EMAIL;

  if (!mailUser || !mailPassword || !recipient) {
    console.error("Consultation email is not configured.");
    return Response.json({ message: "메일 발송 설정이 필요합니다." }, { status: 503 });
  }

  const methodLabel = purchaseMethod
    ? PURCHASE_METHODS[purchaseMethod as PurchaseMethod]
    : "미선택";
  const submittedAt = formatSubmittedAt();
  const requestId = crypto.randomUUID();
  const escaped = {
    name: escapeHtml(name),
    phone: escapeHtml(phone),
    vehicle: escapeHtml(vehicle),
    method: escapeHtml(methodLabel),
    submittedAt: escapeHtml(submittedAt),
    source: escapeHtml(source),
  };

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.naver.com",
    port: Number(process.env.MAIL_PORT || 465),
    secure: (process.env.MAIL_SECURE || "true") !== "false",
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `"US AUTO 상담 접수" <${mailUser}>`,
      to: recipient,
      subject: `[US AUTO 상담 요청] ${name} · ${vehicle}`,
      text: [
        "새로운 차량 상담이 접수되었습니다.",
        "",
        `고객명: ${name}`,
        `연락처: ${phone}`,
        `관심 차량: ${vehicle}`,
        `구매 방식: ${methodLabel}`,
        `접수 시각: ${submittedAt}`,
        `접수 화면: ${source}`,
        `접수 번호: ${requestId}`,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:32px;background:#f4f1eb;color:#1c1c1c;font-family:'Noto Sans KR',Arial,sans-serif;">
          <div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #ded8cd;border-radius:16px;background:#ffffff;">
            <div style="padding:24px 28px;background:#161512;color:#ffffff;">
              <p style="margin:0 0 8px;color:#c9aa73;font-size:12px;letter-spacing:.14em;">US AUTO</p>
              <h1 style="margin:0;font-size:22px;line-height:1.4;">새로운 차량 상담 요청</h1>
            </div>
            <div style="padding:26px 28px;">
              <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
                <tbody>
                  <tr><th style="width:96px;padding:10px 0;border-bottom:1px solid #ece8e1;color:#756e64;text-align:left;font-weight:500;">고객명</th><td style="padding:10px 0;border-bottom:1px solid #ece8e1;font-weight:700;">${escaped.name}</td></tr>
                  <tr><th style="padding:10px 0;border-bottom:1px solid #ece8e1;color:#756e64;text-align:left;font-weight:500;">연락처</th><td style="padding:10px 0;border-bottom:1px solid #ece8e1;font-weight:700;">${escaped.phone}</td></tr>
                  <tr><th style="padding:10px 0;border-bottom:1px solid #ece8e1;color:#756e64;text-align:left;font-weight:500;">관심 차량</th><td style="padding:10px 0;border-bottom:1px solid #ece8e1;">${escaped.vehicle}</td></tr>
                  <tr><th style="padding:10px 0;border-bottom:1px solid #ece8e1;color:#756e64;text-align:left;font-weight:500;">구매 방식</th><td style="padding:10px 0;border-bottom:1px solid #ece8e1;">${escaped.method}</td></tr>
                  <tr><th style="padding:10px 0;border-bottom:1px solid #ece8e1;color:#756e64;text-align:left;font-weight:500;">접수 시각</th><td style="padding:10px 0;border-bottom:1px solid #ece8e1;">${escaped.submittedAt}</td></tr>
                  <tr><th style="padding:10px 0;color:#756e64;text-align:left;font-weight:500;">접수 화면</th><td style="padding:10px 0;">${escaped.source}</td></tr>
                </tbody>
              </table>
              <a href="tel:${normalizedPhone}" style="display:block;margin-top:22px;padding:14px 18px;border-radius:10px;background:#1c1c1c;color:#ffffff;text-align:center;text-decoration:none;font-size:14px;font-weight:700;">고객에게 전화하기</a>
              <p style="margin:16px 0 0;color:#9a9389;font-size:11px;">접수 번호 ${requestId}</p>
            </div>
          </div>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Consultation email delivery failed.", {
      requestId,
      reason: error instanceof Error ? error.message : "Unknown error",
    });
    return Response.json({ message: "메일을 전송하지 못했습니다." }, { status: 502 });
  }
}
