export function GlowDot() {
  return (
    <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-glow-pulse" />
  );
}
export function Logo({ size = 'md' }) {
  const box = size === 'sm' ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl';
  const text = size === 'sm' ? 'text-lg' : 'text-2xl';
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${box} bg-accent-green flex items-center justify-center flex-shrink-0`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h8M2 12h10" stroke="#0a0c0f" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className={`font-display font-extrabold text-text-primary ${text}`}>
        Fund<span className="text-accent-green">Flow</span>
      </span>
    </div>
  );
}
export function Badge({ status }) {
  return status === 'open'
    ? <span className="badge-open">OUVERT</span>
    : <span className="badge-closed">FERMÉ</span>;
}
const barColors = {
  green:  'progress-fill-green',
  blue:   'progress-fill-blue',
  orange: 'progress-fill-orange',
  purple: 'progress-fill-purple',
};
export function ProgressBar({ pct, color = 'green' }) {
  return (
    <div className="progress-track">
      <div className={barColors[color] || barColors.green} style={{ width: `${pct}%` }} />
    </div>
  );
}
export function StatCard({ label, value, sub, accentColor, icon }) {
  const borderColor = {
    green:  'border-[rgba(0,255,136,0.12)]',
    blue:   'border-[rgba(77,159,255,0.12)]',
    orange: 'border-[rgba(255,140,66,0.12)]',
    red:    'border-[rgba(255,77,106,0.12)]',
  }[accentColor] || 'border-[rgba(255,255,255,0.06)]';

  const valueColor = {
    green:  'text-accent-green',
    blue:   'text-accent-blue',
    orange: 'text-accent-orange',
    red:    'text-accent-red',
  }[accentColor] || 'text-text-primary';

  return (
    <div className={`stat-card border ${borderColor}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[11px] text-text-muted uppercase tracking-[0.8px]">{label}</span>
        {icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center
            bg-[rgba(${accentColor === 'green' ? '0,255,136' : accentColor === 'blue' ? '77,159,255' : '255,77,106'},0.1)]`}>
            {icon}
          </div>
        )}
      </div>
      <div className={`font-display text-4xl font-bold leading-none ${valueColor}`}>{value}</div>
      {sub && <p className="text-xs text-text-muted mt-2">{sub}</p>}
    </div>
  );
}
export function InputField({ label, ...props }) {
  return (
    <div>
      {label && <label className="input-label">{label}</label>}
      <input className="input-field" {...props} />
    </div>
  );
}
export function TextareaField({ label, rows = 4, ...props }) {
  return (
    <div>
      {label && <label className="input-label">{label}</label>}
      <textarea className="input-field resize-y leading-relaxed" rows={rows} {...props} />
    </div>
  );
}
export function SectionHeader({ title, accent, subtitle }) {
  return (
    <div className="mb-9">
      <h1 className="page-title">
        {title}{' '}
        {accent && <span className="text-accent-green">{accent}</span>}
      </h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
}
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-bg-card border border-[rgba(255,255,255,0.06)] rounded-2xl ${className}`}>
      {children}
    </div>
  );
}
const avatarColors = {
  green:  'bg-[rgba(0,255,136,0.1)] text-accent-green',
  blue:   'bg-[rgba(77,159,255,0.1)] text-accent-blue',
  purple: 'bg-[rgba(155,89,255,0.1)] text-accent-purple',
  orange: 'bg-[rgba(255,140,66,0.1)] text-accent-orange',
  muted:  'bg-[rgba(255,255,255,0.05)] text-text-secondary',
};
export function InvestorAvatar({ initials, color = 'green', size = 'md' }) {
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sz} ${avatarColors[color] || avatarColors.muted}
      rounded-full flex items-center justify-center font-display font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}
