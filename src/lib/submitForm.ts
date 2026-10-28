// One honest form pipeline for the whole site. Every form posts to Web3Forms, which emails the
// OFWA team. If no access key is configured the form never pretends to have sent anything:
// in local development it reports a preview, in production it fails so the page can show the
// email fallback.
export type SubmitResult = 'sent' | 'preview';

export async function submitForm(kind: string, fields: Record<string, string>): Promise<SubmitResult> {
  const key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

  if (!key) {
    if (import.meta.env.DEV) return 'preview';
    throw new Error('Form delivery is not configured');
  }

  const body = new FormData();
  body.append('access_key', key);
  body.append('subject', `OFWA website: ${kind}`);
  body.append('from_name', 'OFWA website');
  Object.entries(fields).forEach(([name, value]) => body.append(name, value));

  const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body });
  const result = await response.json().catch(() => ({ success: false }));
  if (!response.ok || !result.success) throw new Error('Submission failed');
  return 'sent';
}
