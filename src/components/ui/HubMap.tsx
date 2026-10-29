import React from 'react';
import { useRegions } from '../../lib/content';
import styles from './HubMap.module.css';

interface HubMapProps {
  activeId: string | null;
  onActive: (id: string | null) => void;
}

/** Ghana outline with one dot per region that has hubs or clubs. Sits on a dark surface. */
export const HubMap: React.FC<HubMapProps> = ({ activeId, onActive }) => {
  const regions = useRegions().filter((r) => r.hubs.length > 0);
  return (
    <div className={styles.map}>
      <img src="/img/ghana-outline-light.png" alt="" />
      {regions.map((r) => (
        <button
          key={r.id}
          type="button"
          className={`${styles.dot} ${activeId === r.id ? styles.dotOn : ''}`}
          style={{ left: `${r.xPercent}%`, top: `${r.yPercent}%` }}
          aria-label={`${r.name}: ${r.hubs.length} hubs and clubs`}
          onMouseEnter={() => onActive(r.id)}
          onMouseLeave={() => onActive(null)}
          onFocus={() => onActive(r.id)}
          onBlur={() => onActive(null)}
        >
          <span>{r.hubs.length}</span>
        </button>
      ))}
    </div>
  );
};
