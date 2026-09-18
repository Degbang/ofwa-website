import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
  Calendar
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Papa from 'papaparse';
import styles from './Events.module.css';

interface EventData {
  Year: string;
  Period: string;
  'Start Week': string;
  'End Week': string;
  'Event / Programme': string;
  'Main activity shown in plan': string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBREVIATIONS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Helper to determine if an event spans or matches the target month
const isEventInMonth = (eventPeriod: string, targetMonth: string) => {
  if (!eventPeriod || !targetMonth) return false;

  const period = eventPeriod.toLowerCase().trim();
  const month = targetMonth.toLowerCase().trim();

  if (period === month) return true;

  // Replace en-dashes, em-dashes, hyphens, and slashes with space
  const normalized = period.replace(/[-–—/]/g, ' ');
  const parts = normalized.split(/\s+/);

  // Map words to month indices
  const monthIndices = parts
    .map(part => {
      // Find index if there is a match (either exact or prefix)
      return MONTH_NAMES.findIndex(m =>
        m.toLowerCase() === part ||
        m.toLowerCase().substring(0, 3) === part.substring(0, 3)
      );
    })
    .filter(idx => idx !== -1);

  const targetIdx = MONTH_NAMES.indexOf(targetMonth);
  if (targetIdx === -1) return false;

  if (monthIndices.length === 1) {
    return monthIndices[0] === targetIdx;
  }

  if (monthIndices.length >= 2) {
    const startIdx = Math.min(...monthIndices);
    const endIdx = Math.max(...monthIndices);
    return targetIdx >= startIdx && targetIdx <= endIdx;
  }

  return period.includes(month);
};

// Categorize event based on title keywords
const getEventCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('hackathon') || t.includes('code') || t.includes('dev')) {
    return 'Hackathon';
  }
  if (t.includes('training') || t.includes('tot') || t.includes('skills') || t.includes('workshop') || t.includes('learn')) {
    return 'Training';
  }
  if (t.includes('retreat') || t.includes('meeting') || t.includes('agm') || t.includes('general meeting')) {
    return 'Community';
  }
  if (t.includes('challenge') || t.includes('celebration') || t.includes('shine') || t.includes('anniversary') || t.includes('creative') || t.includes('wiki @')) {
    return 'Campaign';
  }
  return 'Event';
};

const Events: React.FC = () => {
  useScrollReveal();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [selectedMonth, setSelectedMonth] = useState<string>('January');

  const eventsSpreadsheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-aplqN60mPJjeRsfamC7Rb-0gxgfjrNfgoORastJ8DsRAqtC-TPZ-7Aq7q1ewzruwSLBdC63T99qn/pub?output=csv";

  useEffect(() => {
    setLoading(true);
    Papa.parse(eventsSpreadsheetUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        if (results.data && results.data.length > 0) {
          // Filter out rows that lack essential fields
          const validData = results.data.filter(
            (e: any) => e.Year && e.Period && e['Event / Programme']
          );
          setEvents(validData);

          // Find sorted unique years from data
          const parsedYears = Array.from(
            new Set(validData.map((e: any) => e.Year))
          ).filter(Boolean) as string[];
          parsedYears.sort();

          // Set default selected year (prioritize current calendar year)
          const currentYearStr = new Date().getFullYear().toString();
          if (parsedYears.includes(currentYearStr)) {
            setSelectedYear(currentYearStr);
          } else if (parsedYears.length > 0) {
            setSelectedYear(parsedYears[0]);
          }

          // Select current month
          const currentMonthName = MONTH_NAMES[new Date().getMonth()];
          setSelectedMonth(currentMonthName);

          setLoading(false);
        } else {
          setError("No events found in the spreadsheet database.");
          setLoading(false);
        }
      },
      error: (err: any) => {
        console.error(err);
        setError("Failed to download events calendar database. Please try again later.");
        setLoading(false);
      }
    });
  }, []);

  const uniqueYears = Array.from(new Set(events.map(e => e.Year))).filter(Boolean).sort();

  const handlePrevYear = () => {
    const currentIndex = uniqueYears.indexOf(selectedYear);
    if (currentIndex > 0) {
      setSelectedYear(uniqueYears[currentIndex - 1]);
    }
  };

  const handleNextYear = () => {
    const currentIndex = uniqueYears.indexOf(selectedYear);
    if (currentIndex < uniqueYears.length - 1) {
      setSelectedYear(uniqueYears[currentIndex + 1]);
    }
  };

  const getEventsForMonth = (monthName: string, year: string) => {
    return events.filter(e => e.Year === year && isEventInMonth(e.Period, monthName));
  };

  const activeEvents = getEventsForMonth(selectedMonth, selectedYear);

  return (
    <>
      {/* FRAME 1: HERO + CALENDAR MONTH GRID */}
      <div className={`${styles.eventsViewportContainer} snap-frame`}>
        <section className={styles.pageHero}>
          <div className="container">
            <p className={`${styles.pageHeroKicker} reveal`}>Schedule of Programs</p>
            <h1 className={`${styles.pageHeroTitle} reveal d1`}>Events Calendar</h1>
            <p className={`${styles.pageHeroSub} reveal d2`}>
              Explore our open workshops, hackathons, and edit-a-thons scheduled throughout the year. Select a month to see details.
            </p>
          </div>
        </section>

        <section className={styles.calendarSection}>
          <div className="container">
            {loading ? (
              <div className={styles.loadingContainer}>
                <Loader2 className={styles.spinner} size={48} />
                <p>Fetching scheduled events from the database...</p>
              </div>
            ) : error ? (
              <div className={styles.errorContainer}>
                <AlertCircle size={48} className={styles.errorIcon} />
                <p className={styles.errorText}>{error}</p>
                <button onClick={() => window.location.reload()} className="btn-orange">
                  Retry Loading
                </button>
              </div>
            ) : (
              <>
                {/* YEAR NAVIGATION */}
                <div className={styles.calendarHeader}>
                  <div className={styles.yearNavigator}>
                    <button
                      onClick={handlePrevYear}
                      disabled={uniqueYears.indexOf(selectedYear) <= 0}
                      className={styles.navBtn}
                      aria-label="Previous Year"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h2 className={styles.yearTitle}>{selectedYear}</h2>
                    <button
                      onClick={handleNextYear}
                      disabled={uniqueYears.indexOf(selectedYear) >= uniqueYears.length - 1}
                      className={styles.navBtn}
                      aria-label="Next Year"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* MONTH CARD GRID */}
                <div className={styles.monthGrid}>
                  {MONTH_NAMES.map((monthName, idx) => {
                    const monthEvents = getEventsForMonth(monthName, selectedYear);
                    const isSelected = selectedMonth === monthName;
                    const hasEvents = monthEvents.length > 0;

                    return (
                      <button
                        key={monthName}
                        className={`${styles.monthCard} ${isSelected ? styles.monthCardActive : ''} ${!hasEvents ? styles.monthCardEmpty : ''}`}
                        onClick={() => setSelectedMonth(monthName)}
                      >
                        <span className={styles.monthAbbr}>{MONTH_ABBREVIATIONS[idx]}</span>
                        <span className={styles.monthNameFull}>{monthName}</span>
                        <div className={styles.dotContainer}>
                          {monthEvents.slice(0, 4).map((_, dotIdx) => (
                            <span key={dotIdx} className={styles.eventDot} />
                          ))}
                          {monthEvents.length > 4 && <span className={styles.dotMore}>+</span>}
                        </div>
                        {hasEvents && (
                          <span className={styles.eventCountBadge}>
                            {monthEvents.length} {monthEvents.length === 1 ? 'Event' : 'Events'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {/* FRAME 2: EVENTS LIST FOR SELECTED MONTH */}
      {!loading && !error && (
        <section className={`${styles.eventsListSection} snap-frame`}>
          <div className="container">
            {/* DYNAMIC EVENTS LIST HEADER */}
            <div className={styles.eventsListHeader}>
              <span className="section-tag">Schedule</span>
              <h3 className={styles.eventsListTitle}>
                Events in {selectedMonth} {selectedYear}
              </h3>
            </div>

            {/* EVENTS CARDS GRID */}
            {activeEvents.length > 0 ? (
              <div className={styles.eventsGrid}>
                {activeEvents.map((ev, i) => {
                  const categoryName = getEventCategory(ev['Event / Programme']);

                  return (
                    <article
                      key={i}
                      className={styles.eventCard}
                    >
                      <div className={styles.eventCardBody}>
                        <span className={styles.eventTag}>
                          {categoryName}
                        </span>

                        <h4 className={styles.eventTitle}>{ev['Event / Programme']}</h4>

                        <div className={styles.eventMeta}>
                          <div className={styles.metaItem}>
                            <Calendar size={14} className={styles.metaIcon} />
                            <span>{ev.Period} {ev.Year}</span>
                          </div>
                          {ev['End Week'] && (
                            <div className={styles.metaItem}>
                              <MapPin size={14} className={styles.metaIcon} />
                              <span>Timeline: Ends {ev['End Week']}</span>
                            </div>
                          )}
                        </div>

                        <p className={styles.eventDesc}>{ev['Main activity shown in plan']}</p>

                        <Link className={`${styles.registerBtn} btn-orange`} to="/contact">
                          Register Interest <ArrowRight size={15} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.noEvents}>
                <p>No events scheduled for {selectedMonth} {selectedYear}.</p>
                <p className={styles.noEventsSubtitle}>Please select another month on the calendar above to browse.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* DONATE CTA */}
      {/* <section className={styles.donateCta}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className={`${styles.donateCtaTag} reveal`}>Fuel Future Events</p>
          <h2 className={`${styles.donateCtaH} reveal d1`}>Support OFWA Programs</h2>
          <p className={`${styles.donateCtaSub} reveal d2`}>Your donation makes these events possible — covering venue costs, training materials, and transport for community members.</p>
          <div className="reveal d3">
            <Link className={styles.btnDonateBig} to="/donate">
              <Heart size={16} fill="currentColor" /> Donate Now
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Events;
