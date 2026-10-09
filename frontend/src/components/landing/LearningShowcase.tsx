import { type ComponentType, type KeyboardEvent, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface Tab {
  id: string;
  label: string;
  icon: IconName;
  title: string;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "qa",
    label: "Structured Q&A",
    icon: "list-tree",
    title: "Every answer has the same clear shape.",
    description: "Start with the short answer you'd say out loud, then go deeper with the details interviewers follow up on.",
  },
  {
    id: "code",
    label: "Code examples",
    icon: "code",
    title: "Real code, explained line by line.",
    description: "Syntax-highlighted examples sit next to the explanation, so you see exactly how each concept behaves.",
  },
  {
    id: "topics",
    label: "Topic-wise learning",
    icon: "layers",
    title: "Stack, topic, subtopic. Nothing scattered.",
    description: "Browse each technology as an ordered tree and always know what to study next.",
  },
  {
    id: "progress",
    label: "Bookmarks & progress",
    icon: "bookmark",
    title: "Save what matters. See how far you've come.",
    description: "Bookmark articles to revisit later, and mark them complete to track your progress on the dashboard.",
  },
];

function QaPanel() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-line bg-surface-2/60 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)]">Question</p>
        <p className="mt-1.5 font-[var(--font-display)] text-base font-semibold text-ink">
          What's the difference between an abstract class and an interface?
        </p>
      </div>
      {[
        { label: "Short answer", text: "An abstract class can hold state and constructors. An interface defines a contract a class can implement alongside others." },
        { label: "Deep dive", text: "Since Java 8, interfaces can have default and static methods, but they still can't hold instance fields." },
        { label: "Common follow-up", text: "When would you choose one over the other in a real design?" },
      ].map((block, i) => (
        <div key={block.label} className="flex gap-3 rounded-xl border border-line bg-surface/60 p-4">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/15 font-mono text-[11px] font-semibold text-[var(--color-primary)]">
            {i + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{block.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{block.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CodePanel() {
  return (
    <div className="grid gap-3 md:grid-cols-[1.25fr_1fr]">
      <div className="code-panel overflow-hidden rounded-xl border border-white/8">
        <div className="border-b border-white/6 px-4 py-2 font-mono text-[11px] text-white/45">Singleton.java</div>
        <pre className="overflow-x-auto p-4 text-[12px] leading-[1.75]">
          <code>
            <span className="tok-k">public final class</span> <span className="tok-t">Config</span> {"{"}
            {"\n"}  <span className="tok-k">private static volatile</span> <span className="tok-t">Config</span> instance;
            {"\n"}
            {"\n"}  <span className="tok-k">public static</span> <span className="tok-t">Config</span> <span className="tok-f">get</span>() {"{"}
            {"\n"}    <span className="tok-k">if</span> (instance == <span className="tok-k">null</span>) {"{"}
            {"\n"}      <span className="tok-k">synchronized</span> (<span className="tok-t">Config</span>.<span className="tok-k">class</span>) {"{"}
            {"\n"}        <span className="tok-k">if</span> (instance == <span className="tok-k">null</span>)
            {"\n"}          instance = <span className="tok-k">new</span> <span className="tok-t">Config</span>();
            {"\n"}      {"}"}
            {"\n"}    {"}"}
            {"\n"}    <span className="tok-k">return</span> instance;
            {"\n"}  {"}"}
            {"\n"}{"}"}
          </code>
        </pre>
      </div>
      <ul className="space-y-2.5">
        {[
          ["volatile", "stops other threads from seeing a half-built object."],
          ["First null check", "skips locking once the instance exists."],
          ["synchronized block", "lets only one thread create it."],
        ].map(([term, text]) => (
          <li key={term} className="rounded-xl border border-line bg-surface/60 p-3.5 text-sm leading-relaxed text-muted">
            <code className="rounded-md bg-[var(--color-primary)]/15 px-1.5 py-0.5 font-mono text-[12px] text-ink">{term}</code>{" "}
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopicsPanel() {
  const tree = [
    { topic: "OOP Fundamentals", subs: ["Encapsulation", "Polymorphism", "Abstract vs Interface"], open: false },
    { topic: "Collections", subs: ["ArrayList vs LinkedList", "How HashMap works", "ConcurrentHashMap"], open: true },
    { topic: "Multithreading", subs: ["Thread lifecycle", "volatile & synchronized"], open: false },
  ];
  return (
    <div className="rounded-xl border border-line bg-surface/60 p-4">
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#ef4444] text-xs font-bold text-white">J</span>
        <span className="font-[var(--font-display)] font-semibold text-ink">Java</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {tree.map((node) => (
          <li key={node.topic}>
            <div className={cn("flex items-center gap-2 rounded-lg px-2 py-2 text-sm", node.open ? "bg-ink/5 text-ink" : "text-muted")}>
              <Icon name="arrow-right" className={cn("h-3.5 w-3.5 transition-transform", node.open && "rotate-90")} />
              <span className="font-medium">{node.topic}</span>
              <span className="ml-auto font-mono text-[11px] text-subtle">{node.subs.length}</span>
            </div>
            {node.open && (
              <ul className="ml-4 mt-1 space-y-0.5 border-l border-line pl-4">
                {node.subs.map((sub) => (
                  <li key={sub} className={cn("rounded-md px-2 py-1.5 text-[13px]", sub === "How HashMap works" ? "text-[var(--color-primary)] font-medium" : "text-muted")}>
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProgressPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-line bg-surface/60 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Icon name="bookmark" className="h-4 w-4 text-[var(--color-primary)]" /> Saved for revision
        </p>
        <ul className="mt-3 space-y-2">
          {["How HashMap works", "volatile & synchronized", "Python decorators"].map((title) => (
            <li key={title} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-[13px] text-muted">
              {title}
              <Icon name="arrow-up-right" className="h-3.5 w-3.5 text-subtle" />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col rounded-xl border border-line bg-surface/60 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Icon name="trend" className="h-4 w-4 text-[var(--color-accent)]" /> Your progress
        </p>
        <div className="mt-4 space-y-3">
          {[
            { label: "Completed", width: "w-3/5", color: "from-[var(--color-success)] to-[#2dd4bf]" },
            { label: "In progress", width: "w-1/4", color: "from-[var(--color-primary)] to-[var(--color-accent)]" },
          ].map((row) => (
            <div key={row.label}>
              <p className="text-xs text-muted">{row.label}</p>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/8">
                <div className={cn("iv-grow h-full rounded-full bg-gradient-to-r", row.width, row.color)} />
              </div>
            </div>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 self-start rounded-lg bg-[var(--color-success)]/15 px-2.5 py-1.5 text-xs font-medium text-[var(--color-success)]">
          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} /> Mark as complete
        </span>
      </div>
    </div>
  );
}

const panels: Record<string, ComponentType> = {
  qa: QaPanel,
  code: CodePanel,
  topics: TopicsPanel,
  progress: ProgressPanel,
};

export function LearningShowcase() {
  const [active, setActive] = useState(tabs[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Panel = panels[current.id];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const index = tabs.findIndex((t) => t.id === active);
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      <div role="tablist" aria-label="Learning features" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={cn(
                "group relative shrink-0 rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:px-5 lg:py-4",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                selected ? "border-line-strong bg-surface shadow-[0_10px_40px_-20px_rgba(117,98,255,0.6)]" : "border-transparent hover:bg-surface/50",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                    selected ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white" : "bg-ink/6 text-muted group-hover:text-ink",
                  )}
                >
                  <Icon name={tab.icon} className="h-4.5 w-4.5" />
                </span>
                <span className={cn("whitespace-nowrap text-sm font-semibold lg:text-[15px]", selected ? "text-ink" : "text-muted")}>{tab.label}</span>
              </span>
              <span
                className={cn(
                  "hidden overflow-hidden pl-12 text-sm leading-relaxed text-muted transition-all duration-300 lg:grid",
                  selected ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <span className="min-h-0">{tab.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="relative rounded-3xl border border-line-strong bg-surface/40 p-4 backdrop-blur sm:p-6"
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
        <div key={current.id} className="iv-rise">
          <h3 className="font-[var(--font-display)] text-xl font-semibold tracking-tight text-ink sm:text-2xl">{current.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted lg:hidden">{current.description}</p>
          <div className="mt-5">
            <Panel />
          </div>
        </div>
      </div>
    </div>
  );
}
