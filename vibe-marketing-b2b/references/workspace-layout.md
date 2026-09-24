# Standard Local Workspace Layout

Use the bundled initializer when starting a rendered-video task:

```bash
node "$HOME/.codex/skills/vibe-marketing-b2b/scripts/init-workspace.mjs" \
  --root "/absolute/path/to/task-folder" \
  --project-id "project-slug"
```

The command is idempotent: it creates missing directories and starter files but never overwrites an existing contract, package-script snippet, or workspace manifest.

```text
task-folder/
├── assets/
│   ├── audio/
│   ├── fonts/
│   ├── images/
│   ├── source/
│   └── video/
├── source/
│   └── remotion/
│       ├── public/
│       ├── src/
│       ├── production-contract.json
│       └── package.production-scripts.json
├── video_design/
├── workflows/
├── renders/
│   ├── draft/
│   └── review/
├── final/
├── qa/
│   ├── production-gate/
│   ├── layout/
│   ├── lipsync/
│   └── frames/
└── notes/
    └── workspace-manifest.json
```

## Directory ownership

- `assets`: immutable or versioned source media used by production.
- `source/remotion`: editable Remotion project and the production contract.
- `video_design`: user-approved design drafts and revision history.
- `workflows`: renderer or H3 workflow files when applicable.
- `renders/draft`: disposable technical renders.
- `renders/review`: proof clips awaiting approval, especially visible-speaker shots.
- `final`: only current deliverables approved for use.
- `qa`: machine reports, frame contacts, layout evidence, and lip-sync reviews.
- `notes`: manifests and durable task notes.

The generated contract begins with `status: draft`. Populate it from the approved design, copy or reference the actual media and fonts, calculate checksums, complete layout checks, and lock it only after approval. Do not treat the starter contract as render-ready.
