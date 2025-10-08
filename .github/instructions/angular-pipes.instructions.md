---
applyTo: '**/.pipe.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## Angular Pipes
* `standalone: true` always.
* Import all dependencies explicitly.
* Use **pure** pipes by default (stateless, no internal state).
* Use **OnPush** change detection by default.
* Limit pipes to ~100 lines.
* Name pipes with a clear, descriptive name ending in "Pipe".