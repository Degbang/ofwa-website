import { useState } from 'react';
import { submitForm } from './submitForm';

export type FormStatus = 'idle' | 'sending' | 'sent' | 'preview' | 'error';

/** Shared submit state for every form: never reports success unless the message was really delivered. */
export function useFormSubmit(kind: string) {
  const [status, setStatus] = useState<FormStatus>('idle');

  const submit = async (fields: Record<string, string>) => {
    setStatus('sending');
    try {
      setStatus(await submitForm(kind, fields));
      return true;
    } catch {
      setStatus('error');
      return false;
    }
  };

  return { status, submit, reset: () => setStatus('idle') };
}
