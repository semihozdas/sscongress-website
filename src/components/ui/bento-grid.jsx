import { cn } from '../../lib/utils';

function BentoGrid({ items = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-5 rounded-xl overflow-hidden transition-all duration-300",
            "border border-[var(--c-border)] bg-[var(--c-bg-alt)]",
            "hover:shadow-[var(--c-shadow-card)]",
            "hover:-translate-y-0.5 will-change-transform",
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
            item.hasPersistentHover && "shadow-[var(--c-shadow-card)] -translate-y-0.5"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(16,185,129,0.08)] group-hover:bg-[rgba(16,185,129,0.15)] transition-all duration-300">
                {item.icon}
              </div>
              {item.status && (
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-[rgba(16,185,129,0.08)] text-emerald-600 dark:text-emerald-400 border border-[rgba(16,185,129,0.15)] transition-colors duration-300 group-hover:bg-[rgba(16,185,129,0.15)]">
                  {item.status}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-[var(--c-heading)] tracking-tight text-[15px] leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-xs text-[var(--c-subtle)] font-normal">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-[var(--c-body-mid)] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.1)] text-[var(--c-muted)] transition-all duration-200 hover:bg-[rgba(16,185,129,0.12)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              {item.cta && (
                <span className="text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.cta}
                </span>
              )}
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-[rgba(16,185,129,0.08)] to-transparent transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
