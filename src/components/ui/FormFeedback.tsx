import React from 'react';
import type { FormStatus } from '../../lib/useFormSubmit';

interface Props {
  status: FormStatus;
  sentTitle: string;
  sentBody: string;
}

/** The one place that words form outcomes, so every form says the same honest thing. */
export const FormFeedback: React.FC<Props> = ({ status, sentTitle, sentBody }) => {
  if (status === 'sent') {
    return (
      <div className="notice" role="status">
        <strong>{sentTitle}</strong>
        <br />
        {sentBody}
      </div>
    );
  }
  if (status === 'preview') {
    return (
      <div className="notice" role="status">
        <strong>Preview only.</strong>
        <br />
        Nothing was sent because form delivery is not configured in this environment.
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="notice notice-error" role="alert">
        <strong>We could not send that.</strong>
        <br />
        Please try again, or write to <a href="mailto:info@ofwafrica.org">info@ofwafrica.org</a>.
      </div>
    );
  }
  return null;
};
