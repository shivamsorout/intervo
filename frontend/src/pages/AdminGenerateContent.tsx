import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStacks, fetchSubtopics, fetchTopics } from "@/lib/contentApi";
import * as adminApi from "@/lib/adminApi";
import type { Stack, Subtopic, Topic } from "@/types/content";
import type { ContentStatus, Difficulty } from "@/types/admin";
import { Card, CardBody, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const NEW_OPTION = "__new__";

const selectClassName =
  "h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors " +
  "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 " +
  "dark:border-white/10 dark:bg-white/5 dark:text-slate-100";

export function AdminGenerateContent() {
  const { showToast } = useToast();

  const [stacks, setStacks] = useState<Stack[]>([]);
  const [stackSlug, setStackSlug] = useState("");
  const [newStackName, setNewStackName] = useState("");

  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicSlug, setTopicSlug] = useState("");
  const [newTopicName, setNewTopicName] = useState("");

  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [subtopicSlug, setSubtopicSlug] = useState("");
  const [newSubtopicName, setNewSubtopicName] = useState("");

  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [instructions, setInstructions] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isFreePreview, setIsFreePreview] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedLink, setSavedLink] = useState<string | null>(null);

  const stackIsNew = stackSlug === NEW_OPTION;
  const topicIsNew = stackIsNew || topicSlug === NEW_OPTION;
  const subtopicIsNew = topicIsNew || subtopicSlug === NEW_OPTION;

  useEffect(() => {
    fetchStacks()
      .then(setStacks)
      .catch(() => showToast("Failed to load stacks", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTopicSlug("");
    setNewTopicName("");
    setTopics([]);
    if (!stackSlug || stackIsNew) return;
    fetchTopics(stackSlug)
      .then(setTopics)
      .catch(() => showToast("Failed to load topics", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackSlug]);

  useEffect(() => {
    setSubtopicSlug("");
    setNewSubtopicName("");
    setSubtopics([]);
    if (!stackSlug || !topicSlug || stackIsNew || topicIsNew) return;
    fetchSubtopics(stackSlug, topicSlug)
      .then(setSubtopics)
      .catch(() => showToast("Failed to load subtopics", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicSlug]);

  const resolvedStackName = stackIsNew ? newStackName : (stacks.find((s) => s.slug === stackSlug)?.name ?? "");
  const resolvedTopicName = topicIsNew ? newTopicName : (topics.find((t) => t.slug === topicSlug)?.name ?? "");
  const resolvedSubtopicName = subtopicIsNew
    ? newSubtopicName
    : (subtopics.find((s) => s.slug === subtopicSlug)?.name ?? "");

  const canGenerate = resolvedStackName.trim() && resolvedTopicName.trim() && resolvedSubtopicName.trim();

  async function handleGenerate() {
    setIsGenerating(true);
    setSavedLink(null);
    try {
      const result = await adminApi.generateContent({
        stackName: resolvedStackName,
        topicName: resolvedTopicName,
        subtopicName: resolvedSubtopicName,
        difficulty,
        instructions: instructions.trim() || undefined,
      });
      setTitle(result.title);
      setBody(result.body);
      showToast("Draft generated", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to generate content", "error");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSave(status: ContentStatus) {
    setIsSaving(true);
    try {
      const saved = await adminApi.saveContent({
        stack: stackIsNew ? newStackName : stackSlug,
        stackIsNew,
        topic: topicIsNew ? newTopicName : topicSlug,
        topicIsNew,
        subtopic: subtopicIsNew ? newSubtopicName : subtopicSlug,
        subtopicIsNew,
        title,
        body,
        status,
        isFreePreview,
      });
      showToast(status === "PUBLISHED" ? "Published" : "Saved as draft", "success");
      setSavedLink(`/prep/${saved.stackSlug}/${saved.topicSlug}/${saved.subtopicSlug}`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save content", "error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-[var(--font-display)] text-2xl font-semibold">Generate Study Material</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Fill in the topic, generate a draft with AI, then review and publish.
      </p>

      <Card className="mt-6">
        <CardBody className="flex flex-col gap-4">
          <CardTitle>Topic</CardTitle>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Stack</label>
              <select className={selectClassName} value={stackSlug} onChange={(e) => setStackSlug(e.target.value)}>
                <option value="" disabled>
                  Select a stack
                </option>
                {stacks.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
                <option value={NEW_OPTION}>+ Add new stack</option>
              </select>
              {stackIsNew && (
                <Input
                  placeholder="New stack name"
                  value={newStackName}
                  onChange={(e) => setNewStackName(e.target.value)}
                />
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Topic</label>
              {stackIsNew ? (
                <Input
                  placeholder="New topic name"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  disabled={!stackSlug}
                />
              ) : (
                <>
                  <select
                    className={selectClassName}
                    value={topicSlug}
                    onChange={(e) => setTopicSlug(e.target.value)}
                    disabled={!stackSlug}
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    {topics.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                    <option value={NEW_OPTION}>+ Add new topic</option>
                  </select>
                  {topicSlug === NEW_OPTION && (
                    <Input
                      placeholder="New topic name"
                      value={newTopicName}
                      onChange={(e) => setNewTopicName(e.target.value)}
                    />
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subtopic</label>
              {topicIsNew ? (
                <Input
                  placeholder="New subtopic name"
                  value={newSubtopicName}
                  onChange={(e) => setNewSubtopicName(e.target.value)}
                  disabled={!resolvedTopicName}
                />
              ) : (
                <>
                  <select
                    className={selectClassName}
                    value={subtopicSlug}
                    onChange={(e) => setSubtopicSlug(e.target.value)}
                    disabled={!topicSlug}
                  >
                    <option value="" disabled>
                      Select a subtopic
                    </option>
                    {subtopics.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name}
                      </option>
                    ))}
                    <option value={NEW_OPTION}>+ Add new subtopic</option>
                  </select>
                  {subtopicSlug === NEW_OPTION && (
                    <Input
                      placeholder="New subtopic name"
                      value={newSubtopicName}
                      onChange={(e) => setNewSubtopicName(e.target.value)}
                    />
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty</label>
              <select
                className={selectClassName}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Input
                label="Additional instructions (optional)"
                placeholder="e.g. cover volatile vs synchronized, include a code example"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleGenerate} isLoading={isGenerating} disabled={!canGenerate} className="self-start">
            Generate with AI
          </Button>
        </CardBody>
      </Card>

      {(title || body) && (
        <Card className="mt-6">
          <CardBody className="flex flex-col gap-4">
            <CardTitle>Review &amp; Publish</CardTitle>

            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Body (Markdown)</label>
              <textarea
                className="min-h-[320px] rounded-xl border border-slate-200 bg-white p-3 font-[var(--font-mono)] text-sm text-slate-900 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isFreePreview}
                onChange={(e) => setIsFreePreview(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              Make this a free preview (readable without login)
            </label>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                isLoading={isSaving}
                disabled={!title.trim() || !body.trim()}
                onClick={() => handleSave("DRAFT")}
              >
                Save as Draft
              </Button>
              <Button isLoading={isSaving} disabled={!title.trim() || !body.trim()} onClick={() => handleSave("PUBLISHED")}>
                Publish
              </Button>
            </div>

            {savedLink && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Saved.{" "}
                <Link to={savedLink} className="font-medium text-[var(--color-primary)]">
                  View in Prep
                </Link>
              </p>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
