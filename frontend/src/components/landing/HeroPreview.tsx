import { Icon } from "@/components/ui/Icon";

const sidebar = [
  { label: "ArrayList vs LinkedList", done: true },
  { label: "equals() & hashCode()", done: true },
  { label: "How HashMap works", active: true },
  { label: "ConcurrentHashMap", done: false },
  { label: "Fail-fast iterators", done: false },
];

function CodeBlock() {
  return (
    <div className="code-panel overflow-hidden rounded-xl border border-white/8">
      <div className="flex items-center justify-between border-b border-white/6 px-3.5 py-2">
        <span className="font-mono text-[11px] text-white/45">HashMap.java</span>
        <span className="rounded-md bg-white/6 px-1.5 py-0.5 font-mono text-[10px] text-white/50">Java 8+</span>
      </div>
      <pre className="overflow-x-auto px-3.5 py-3 text-[11.5px] leading-[1.7] sm:text-[12px]">
        <code>
          <span className="tok-k">static final int</span> <span className="tok-f">hash</span>(<span className="tok-t">Object</span> key) {"{"}
          {"\n"}    <span className="tok-k">int</span> h;
          {"\n"}    <span className="tok-k">return</span> (key == <span className="tok-k">null</span>) ? <span className="tok-n">0</span>
          {"\n"}        : (h = key.<span className="tok-f">hashCode</span>()) ^ (h {">>>"} <span className="tok-n">16</span>);
          {"\n"}{"}"}
          {"\n"}
          {"\n"}<span className="tok-c">{"// bucket = (capacity - 1) & hash"}</span>
          {"\n"}<span className="tok-k">int</span> index = (table.length - <span className="tok-n">1</span>) & <span className="tok-f">hash</span>(key);<span className="iv-caret ml-px inline-block h-3.5 w-[2px] translate-y-0.5 bg-[var(--color-accent)]" />
        </code>
      </pre>
    </div>
  );
}

export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_60%_40%,rgba(117,98,255,0.35),transparent_70%)] opacity-80 dark:opacity-100"
      />

      <div className="iv-rise relative rounded-[1.35rem] border border-line-strong bg-surface/80 p-1.5 shadow-[0_30px_80px_-20px_rgba(8,11,22,0.45)] backdrop-blur-xl dark:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]" style={{ animationDelay: "320ms" }}>
        <div className="overflow-hidden rounded-[1rem] border border-line bg-canvas">
          <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[11.5px] text-subtle">
              <span className="font-medium text-[#f59e0b]">Java</span>
              <span>/</span>
              <span>Collections</span>
              <span>/</span>
              <span className="truncate text-ink/80">HashMap internals</span>
            </div>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-primary)]/15 text-[var(--color-primary)]">
              <Icon name="bookmark" className="h-3.5 w-3.5" strokeWidth={2.2} />
            </span>
          </div>

          <div className="grid sm:grid-cols-[190px_1fr]">
            <aside className="hidden border-r border-line bg-surface-2/50 p-3 sm:block">
              <p className="px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-subtle">Collections</p>
              <ul className="mt-2 space-y-0.5">
                {sidebar.map((item) => (
                  <li
                    key={item.label}
                    className={
                      item.active
                        ? "flex items-center gap-2 rounded-lg bg-[var(--color-primary)]/12 px-2 py-1.5 text-[11.5px] font-medium text-ink"
                        : "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] text-muted"
                    }
                  >
                    {item.done ? (
                      <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/20 text-[var(--color-success)]">
                        <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <span className={item.active ? "h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--color-primary)]" : "h-3.5 w-3.5 shrink-0 rounded-full border border-ink/20"} />
                    )}
                    <span className="truncate">{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-line bg-surface p-2.5">
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-muted">Topic progress</span>
                  <span className="font-semibold text-ink">2 / 5</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/8">
                  <div className="iv-grow h-full w-2/5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
                </div>
              </div>
            </aside>

            <div className="min-w-0 p-4 sm:p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/12 px-2 py-0.5 text-[10.5px] font-medium text-[#0b8fab] dark:text-[var(--color-accent)]">
                <Icon name="sparkle" className="h-3 w-3" /> Frequently asked
              </span>
              <h3 className="mt-2.5 font-[var(--font-display)] text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
                How does HashMap work internally?
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                A HashMap is an array of buckets. The key's hash picks a bucket, and colliding entries share it as a
                linked list that becomes a balanced tree once it grows past eight nodes.
              </p>
              <div className="mt-3.5">
                <CodeBlock />
              </div>
              <div className="mt-3.5 flex items-center gap-2 text-[11px] text-subtle">
                <span className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5">
                  <Icon name="clock" className="h-3 w-3" /> Deep dive
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-line px-1.5 py-0.5">
                  <Icon name="list-tree" className="h-3 w-3" /> 4 sections
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="iv-rise absolute -bottom-20 -left-1 z-10 w-[min(250px,70%)] sm:-bottom-8 sm:-left-8" style={{ animationDelay: "650ms" }}>
        <div className="animate-float rounded-2xl border border-line-strong bg-surface/90 p-3.5 shadow-[0_20px_50px_-15px_rgba(8,11,22,0.5)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">Quick revision</span>
            <span className="text-[10.5px] text-subtle">Card 3 / 12</span>
          </div>
          <p className="mt-2 text-[13px] font-medium leading-snug text-ink">What is HashMap's default load factor?</p>
          <div className="mt-2.5 rounded-lg bg-[var(--color-success)]/10 px-2.5 py-1.5 text-[12px] text-ink/85">
            <span className="font-semibold text-[var(--color-success)]">0.75</span> · resizes when 75% full
          </div>
        </div>
      </div>

      <div className="iv-rise absolute -right-3 -top-7 z-10 hidden w-[230px] sm:block lg:-right-10" style={{ animationDelay: "800ms" }}>
        <div className="animate-float-slow relative">
          <div aria-hidden className="absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-3 rounded-2xl border border-line bg-surface/60" />
          <div aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 rotate-[1.5deg] rounded-2xl border border-line bg-surface/80" />
          <div className="relative rounded-2xl border border-line-strong bg-surface p-3.5 shadow-[0_20px_50px_-15px_rgba(8,11,22,0.45)]">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#f59e0b] to-[#ef4444] text-white">
                <Icon name="zap" className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11.5px] font-semibold text-ink">Key takeaway</span>
            </div>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
              From Java 8, a bucket with 8+ entries becomes a red-black tree, so lookups stay O(log n).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
