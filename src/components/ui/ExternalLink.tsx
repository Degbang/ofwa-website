import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Props extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'> {
  /** Hide the arrow icon (the screen reader text stays). */
  bare?: boolean;
}

/** An outbound link that tells everyone it leaves the site and opens in a new tab. */
export const ExternalLink: React.FC<Props> = ({ children, bare, ...rest }) => (
  <a {...rest} target="_blank" rel="noopener noreferrer">
    {children}
    {!bare && <ArrowUpRight size={15} aria-hidden="true" style={{ marginLeft: 6, flexShrink: 0 }} />}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);
