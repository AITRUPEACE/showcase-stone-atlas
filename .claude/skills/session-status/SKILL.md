---
name: session-status
description: Keeps the Claude Code session title prefixed with a one-letter status (W working, Q waiting on the user, R in review, M merged with follow-ups, D done, X dropped, P plan/research) so the user can tell from the session list which chats still need them. Load it at the start of any session that does real work (code, a PR, research, planning) and again whenever the work changes state - you start building, end a turn blocked on the user, open a PR, a PR merges or closes, or the work wraps up. When a PR merges, it asks the user whether to mark the session done. Also use it when the user asks to mark, tag, rename or tidy up sessions, or asks which chats are still open.
---

# Session status in the title

The user runs many sessions in parallel and scans the session list to see which ones still need them. A one-letter prefix on each title does that job, but only if it stays current. So keep it current as you go, without being asked.

## Statuses

| Letter | Means | Set it when |
|---|---|---|
| **W** | Working | You are building, testing or iterating, and nothing is waiting on the user. |
| **Q** | Waiting on the user | You end a turn and can't go further without them: a question, a decision, an input such as a file, a list or a key, or a manual step only they can do. |
| **R** | In review | A PR for this session's work is open, and it's waiting on CI, review or a merge rather than on a question. |
| **M** | Merged, follow-ups left | The PR merged but something remains: a migration to apply, a deploy or device check, a follow-up PR. |
| **D** | Done | The user confirmed it's done. Only the user's word sets D. |
| **X** | Dropped | The PR closed without merging and nothing replaces it, or the user abandoned the work. |
| **P** | Plan or research | The session produces research, strategy, a PRD or a plan, and no code is expected. |

When more than one applies, use the one that tells the user what to do next. Q beats R: an open PR with an unanswered question needs an answer before it needs a review. With several PRs, the least-finished one decides.

Q is for real blocks only. An optional offer such as "want me to watch the PR?" or "I can tailor this further" doesn't stop the work, so it leaves the status where it was.

## Title format

`<letter> - <title>`, for example `R - Workout image upload parsing`.

- Change only the prefix. A title that already starts with a status (`^[WQRMDXP] - `) gets its letter swapped, not a second prefix.
- Keep the user's own bracket tags after the prefix (`R - [SA] Fix membership RLS`). Drop tags that only described status before this scheme existed (`[active]`, `[done]`, `[Done]`), since the letter replaces them.
- Leave the descriptive part alone unless the user asks you to rename it.

## How to update

1. Read the current title with `get_session` (no `session_id` = this session).
2. Work out the new title. If it's unchanged, stop.
3. Call `set_session_title` with this session's id and the new title.

These tools come from the claude-code-remote MCP server and exist in cloud sessions. If `set_session_title` isn't available (for example in a local CLI session), tell the user once that the title can't be updated from here, then carry on without it.

Update silently. The title is the signal, so don't narrate each change. The exception is the done question below.

## When the work looks finished, ask about D

When a PR from this session merges (you merged it, the user did, or a merge event arrived):

1. Set **M** straight away.
2. Ask with `AskUserQuestion` whether to mark the session done. Name any follow-ups you know about, so the choice is informed:
   - "Mark done (D)"
   - "Keep as merged (M)", with the follow-up named, e.g. "migration not applied yet"
3. Set **D** only if they say done. If they keep M, ask again when that follow-up is finished, not before.

Do the same once a **P** session's deliverable has landed and nothing is pending: ask once whether to mark it D. Don't ask again in that session unless something changes.

If the user says "this is done", "we're done here", or asks you to mark it, set D without asking.

## Tidying many sessions

When the user asks to mark or tidy their sessions, or to show which are still open:

1. List their sessions with `list_sessions` (`mine: true`), paging with `after_id` until `has_more` is false. Skip archived sessions unless they ask for them.
2. For each session, decide a status from the strongest evidence available:
   - **PR state** for the session's branches (`session_context.outcomes[].git_repository.git_info`). Use the GitHub tools with `head: "<owner>:<branch>"` and `state: all`. Repos outside this session's scope need `add_repo` with `access: "read"` first. You don't need to clone them for PR lookups. The list view can report `merged: false` even for merged PRs, so judge by `merged_at`: closed with a date means merged, closed without one means dropped.
   - **`post_turn_summary`** on the session record. `need_input` with nothing merged means Q. `review_ready` with an open PR means R. Its `status_detail` often names the PR and what's pending.
   - **The last few transcript events** (`list_events` with `kinds: ["assistant", "result"]`), only when the first two don't settle it.
3. In bulk mode, you can set D without asking where the evidence is clear: everything merged and nothing pending, or a delivered plan that the user closed out. Where it isn't clear, prefer M or P over D, and list those sessions for the user to confirm.
4. Rename, then report a short table: old title → new title, with a few words of evidence for anything that isn't obvious.
