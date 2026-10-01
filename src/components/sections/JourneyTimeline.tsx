import { ArrowUpRight } from 'lucide-react';
import { journey, type JourneyEvent, type JourneyExperience, type JourneyMonth } from '@/data/journey';

function JourneyEventItem({ event, variant }: { event: JourneyEvent; variant?: 'primary' | 'spotlight' | 'secondary' }) {
  if (event.type === 'milestone') {
    return <div className="journey-milestone"><strong>{event.title}</strong><span>{event.summary}</span></div>;
  }

  return (
    <a className={`journey-experience${variant ? ` journey-experience-${variant}` : ''}`} href={`#/journey/${event.id}`} aria-label={`${event.title}の詳細を見る`}>
      <span className="journey-kind">{event.label}</span>
      <ArrowUpRight aria-hidden="true" className="journey-arrow h-5 w-5" />
      <strong>{event.title}</strong>
      <span className="journey-summary">{event.summary}</span>
      {event.previewPath && <span className="journey-path">{event.previewPath}</span>}
    </a>
  );
}

function JourneyMonthEvents({ month }: { month: JourneyMonth }) {
  const featured = month.events.filter((event): event is JourneyExperience => event.type === 'experience' && Boolean(event.featured));

  if (featured.length > 0) {
    return (
      <div className="journey-events journey-events-featured">
        <div className={`journey-featured-pair${featured.length === 1 ? ' journey-featured-single' : ''}`}>
          {featured.map((event) => <JourneyEventItem key={event.id} event={event} variant={event.id === 'salt2' ? 'spotlight' : 'primary'} />)}
        </div>
        {month.events.filter((event) => event.type !== 'experience' || !event.featured).map((event) => <JourneyEventItem key={event.title} event={event} variant="secondary" />)}
      </div>
    );
  }

  return <div className={`journey-events${month.events.length > 1 ? ' journey-events-pair' : ''}`}>{month.events.map((event) => <JourneyEventItem key={event.title} event={event} />)}</div>;
}

export function JourneyTimeline() {
  return (
    <div className="journey-overview" aria-label="これまでの歩み">
      <div className="journey-intro">
        <div>
          <div className="journey-overline">
            <p className="eyebrow">My journey</p>
            <p className="journey-hint"><ArrowUpRight aria-hidden="true" className="h-4 w-4" /> 気になる経歴をクリックして詳しく見る</p>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">学びを、実践へ。</h2>
        </div>
      </div>

      {journey.map((year) => (
        <div className="journey-year" key={year.year}>
          <p className="journey-year-label">{year.year}</p>
          <ol className="journey-track" style={{ gridTemplateColumns: year.months.map((month) => `${month.weight}fr`).join(' ') }}>
            {year.months.map((month) => (
              <li className={`journey-month${month.upcoming ? ' journey-upcoming' : ''}`} key={`${year.year}-${month.month}`}>
                <time className="journey-date" dateTime={`${year.year}-${month.month.slice(0, 2)}`}>{month.month}</time>
                <span className="journey-dot" aria-hidden="true" />
                <JourneyMonthEvents month={month} />
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
