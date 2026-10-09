INSERT INTO topics (stack_id, slug, name, description, sort_order)
SELECT id, 'collections', 'Collections Framework', 'Lists, sets, maps and the internals interviewers actually ask about.', 1
FROM stacks WHERE slug = 'java';

INSERT INTO subtopics (topic_id, slug, name, sort_order)
SELECT t.id, 'hashmap-internals', 'HashMap Internals', 1
FROM topics t JOIN stacks s ON t.stack_id = s.id
WHERE s.slug = 'java' AND t.slug = 'collections';

INSERT INTO content_units (subtopic_id, type, title, body, status, version, sort_order)
SELECT sub.id, 'ARTICLE', 'How HashMap Works Internally in Java',
'# How HashMap Works Internally in Java

`HashMap` is one of the most commonly asked collections in Java interviews because it touches hashing, equality, arrays, linked lists, trees, and resizing all at once. This article walks through what actually happens on `put()` and `get()`.

## Internal Structure

Under the hood, a `HashMap` is backed by an array of `Node<K,V>` buckets:

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```

Each array slot (bucket) can hold a linked list of nodes that hashed to the same index. Since Java 8, once a bucket''s chain grows past 8 entries (and the table has at least 64 buckets), that bucket is treeified into a red-black tree, turning worst-case lookup from O(n) into O(log n).

## hashCode() and equals()

Bucket placement depends on `hashCode()`; correctness of lookups depends on `equals()`. `HashMap` further spreads the hash to reduce collisions:

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

XOR-ing the upper 16 bits into the lower 16 bits means high-order bits still influence which bucket is chosen even when the table size is small (bucket index is `hash & (capacity - 1)`), which reduces clustering for keys whose hash codes differ mainly in their high bits.

## The put() Walkthrough

1. Compute `hash(key)` and the bucket index `hash & (n - 1)`.
2. If the bucket is empty, insert a new node there.
3. If not, walk the chain (or tree) comparing `hash` first, then `key == existingKey || key.equals(existingKey)`; if found, overwrite the value.
4. If not found, append a new node, treeifying the bucket if it just crossed the threshold.
5. If `size > capacity * loadFactor` (default load factor `0.75`), the table resizes: capacity doubles and every entry is rehashed into the new bucket array.

## Time Complexity

| Operation | Average | Worst case (pre-Java 8 or few collisions) | Worst case (Java 8+, treeified) |
|---|---|---|---|
| get/put | O(1) | O(n) | O(log n) |

## Common Interview Questions

- Why must a key''s `hashCode()` be consistent with `equals()`?
- What happens if you mutate a key''s fields after inserting it into a `HashMap`?
- Why is `HashMap` not thread-safe, and what would you use instead (`ConcurrentHashMap`)?
- Why is the default capacity 16 and the default load factor 0.75?

Understanding this flow is usually enough to answer most of the follow-up questions interviewers ask about `HashMap`.',
'PUBLISHED', 1, 1
FROM subtopics sub
JOIN topics t ON sub.topic_id = t.id
JOIN stacks s ON t.stack_id = s.id
WHERE s.slug = 'java' AND t.slug = 'collections' AND sub.slug = 'hashmap-internals';
