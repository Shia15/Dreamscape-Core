#!/usr/bin/env bash
set -euo pipefail

BRANCH="feature/aether-state-schema"
REMOTE="origin"

echo "🚀 Setting up AetherState schema, types, fixtures, tests and CI..."

# 1. Ensure we're on main and up to date
echo "Checking out main and pulling latest changes..."
git checkout main
git pull "$REMOTE" main

# 2. Create feature branch
echo "Creating and switching to branch: $BRANCH"
git checkout -b "$BRANCH"

# 3. Create directory structure
echo "Creating directories..."
mkdir -p schema types __fixtures__/aether __tests__ .github/workflows

# 4. Write JSON Schema
echo "Writing schema/aetherState.schema.json..."
cat > schema/aetherState.schema.json <<'JSON'
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://your-repo.example.com/schema/aetherState.schema.json",
  "title": "AetherState",
  "description": "Internal state representation of the Aether conversational agent after processing a user input",
  "type": "object",
  "required": [
    "session",
    "input",
    "intent",
    "routing",
    "clu",
    "memoryContext",
    "emotionState",
    "eggAgent",
    "responseObject",
    "interfaceOutput",
    "logs",
    "telemetry"
  ],
  "properties": {
    "session": {
      "type": "object",
      "required": ["id", "startedAt"],
      "properties": {
        "id": { "type": "string" },
        "startedAt": { "type": "string", "format": "date-time" },
        "updatedAt": { "type": "string", "format": "date-time" }
      },
      "additionalProperties": true
    },
    "input": {
      "type": "object",
      "required": ["raw"],
      "properties": {
        "raw": { "type": "string" },
        "normalized": { "type": "string" }
      },
      "additionalProperties": true
    },
    "intent": {
      "type": "object",
      "required": ["primary", "confidence"],
      "properties": {
        "primary": { "type": "string" },
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 }
      },
      "additionalProperties": true
    },
    "routing": {
      "type": "object",
      "properties": {
        "branch": { "type": "string", "enum": ["LOW_ENERGY", "COMPLEX_EXPAND", "FOLLOW_UP"] },
        "reason": { "type": "string" }
      },
      "additionalProperties": true
    },
    "clu": {
      "type": "object",
      "additionalProperties": true
    },
    "memoryContext": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["key", "value", "source"],
        "properties": {
          "key": { "type": "string" },
          "value": { "type": ["string", "array", "object", "number", "boolean", "null"] },
          "source": { "type": "string" },
          "timestamp": { "type": "string", "format": "date-time" }
        },
        "additionalProperties": true
      }
    },
    "emotionState": {
      "type": "object",
      "required": ["moodTag"],
      "properties": {
        "moodTag": {
          "type": "string",
          "enum": [
            "clarity", "resonance", "flow", "unrest", "awe",
            "disruption", "curiosity", "compassion", "stillness", "creative-chaos"
          ]
        },
        "moodScores": {
          "type": "object",
          "additionalProperties": { "type": "number", "minimum": 0, "maximum": 1 }
        }
      },
      "additionalProperties": true
    },
    "eggAgent": {
      "type": "object",
      "additionalProperties": true
    },
    "responseObject": {
      "type": "object",
      "required": ["text", "type"],
      "properties": {
        "id": { "type": "string" },
        "text": { "type": "string" },
        "type": { "type": "string" },
        "suggestions": { "type": "array" }
      },
      "additionalProperties": true
    },
    "interfaceOutput": {
      "type": "object",
      "additionalProperties": true
    },
    "logs": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["timestamp", "level", "message"],
        "properties": {
          "timestamp": { "type": "string", "format": "date-time" },
          "level": { "type": "string" },
          "message": { "type": "string" },
          "context": { "type": "object" }
        },
        "additionalProperties": true
      }
    },
    "telemetry": {
      "type": "object",
      "properties": {
        "confidence": { "type": "number", "minimum": 0, "maximum": 1 },
        "processingTimeMs": { "type": "number" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": false
}
JSON

# 5. Write TypeScript types
echo "Writing types/AetherState.ts..."
cat > types/AetherState.ts <<'TS'
export type MoodTag =
  | "clarity"
  | "resonance"
  | "flow"
  | "unrest"
  | "awe"
  | "disruption"
  | "curiosity"
  | "compassion"
  | "stillness"
  | "creative-chaos";

export type RoutingBranch = "LOW_ENERGY" | "COMPLEX_EXPAND" | "FOLLOW_UP";

export interface AetherState {
  session: {
    id: string;
    startedAt: string;
    updatedAt?: string;
    [key: string]: any;
  };
  input: {
    raw: string;
    normalized?: string;
    [key: string]: any;
  };
  intent: {
    primary: string;
    confidence: number;
    [key: string]: any;
  };
  routing: {
    branch?: RoutingBranch;
    reason?: string;
    [key: string]: any;
  };
  clu: Record<string, any>;
  memoryContext: Array<{
    key: string;
    value: any;
    source: string;
    timestamp?: string;
    [key: string]: any;
  }>;
  emotionState: {
    moodTag: MoodTag;
    moodScores?: Record<MoodTag, number>;
    [key: string]: any;
  };
  eggAgent: Record<string, any>;
  responseObject: {
    id?: string;
    text: string;
    type: string;
    suggestions?: any[];
    [key: string]: any;
  };
  interfaceOutput: Record<string, any>;
  logs: Array<{
    timestamp: string;
    level: string;
    message: string;
    context?: Record<string, any>;
    [key: string]: any;
  }>;
  telemetry: {
    confidence?: number;
    processingTimeMs?: number;
    [key: string]: any;
  };
}

export default AetherState;
TS

# 6. Write fixtures
echo "Writing fixtures..."
cat > __fixtures__/aether/low-energy-suggestion.json <<'JSON'
{
  "session": { "id": "sess-2025-001", "startedAt": "2025-12-29T10:00:00Z", "updatedAt": "2025-12-29T10:05:00Z" },
  "input": { "raw": "I feel really tired today and can't focus." },
  "intent": { "primary": "express_fatigue", "confidence": 0.92 },
  "routing": { "branch": "LOW_ENERGY", "reason": "detected low energy keywords" },
  "clu": { "decision": "suggest_rest" },
  "memoryContext": [],
  "emotionState": { "moodTag": "unrest" },
  "eggAgent": { "state": "supportive" },
  "responseObject": {
    "text": "I'm sorry you're feeling tired. How about taking a 10-minute walk or doing a quick power nap? Small breaks often help reset focus.",
    "type": "supportive_suggestion"
  },
  "interfaceOutput": { "format": "text" },
  "logs": [
    { "timestamp": "2025-12-29T10:05:00Z", "level": "info", "message": "Routing to LOW_ENERGY branch" }
  ],
  "telemetry": { "confidence": 0.88, "processingTimeMs": 320 }
}
JSON

cat > __fixtures__/aether/complex-expand-with-memory.json <<'JSON'
{
  "session": { "id": "sess-2025-002", "startedAt": "2025-12-29T14:00:00Z" },
  "input": { "raw": "I'm thinking about switching careers but I'm not sure where to start — I'm excited but anxious." },
  "intent": { "primary": "career_transition_planning", "confidence": 0.95 },
  "routing": { "branch": "COMPLEX_EXPAND", "reason": "memory available and planning intent" },
  "clu": { "decision": "multi_step_plan" },
  "memoryContext": [
    { "key": "user_skills", "value": ["design", "communication"], "source": "previous_session" },
    { "key": "availHoursPerWeek", "value": 10, "source": "previous_session" },
    { "key": "past_note", "value": "prefers remote project work", "source": "previous_session" }
  ],
  "emotionState": { "moodTag": "curiosity" },
  "eggAgent": { "state": "planning" },
  "responseObject": {
    "text": "Great that you're excited! Given your design & communication skills and preference for remote work, here's a quick checklist to get started, or we can dive into a detailed 4-week plan. Which would you like?",
    "type": "branching_offer",
    "suggestions": ["quick checklist", "detailed plan"]
  },
  "interfaceOutput": { "format": "text_with_options" },
  "logs": [
    { "timestamp": "2025-12-29T14:02:00Z", "level": "info", "message": "Memory recall: user_skills, availHoursPerWeek" },
    { "timestamp": "2025-12-29T14:02:10Z", "level": "info", "message": "CLU decision: expand to multi-step plan" }
  ],
  "telemetry": { "confidence": 0.93 }
}
JSON

cat > __fixtures__/aether/extracted-from-history.json <<'JSON'
{
  "session": { "id": "sess-2025-003", "startedAt": "2025-12-29T16:00:00Z" },
  "input": { "raw": "Checklist please — and remind me what I said last week about preferring video summaries." },
  "intent": { "primary": "request_checklist_with_memory_recall", "confidence": 0.89 },
  "routing": { "branch": "FOLLOW_UP" },
  "clu": { "action": "provide_checklist_and_recall" },
  "memoryContext": [
    { "key": "preference_video_summaries", "value": true, "source": "last_week", "timestamp": "2025-12-22T12:00:00Z" }
  ],
  "emotionState": { "moodTag": "unrest" },
  "eggAgent": {},
  "responseObject": {
    "text": "Got it — here's a quick prioritization checklist. Also, last week you mentioned preferring video summaries, so I can send this as a short video if you'd like!",
    "type": "checklist_with_recall"
  },
  "interfaceOutput": {},
  "logs": [],
  "telemetry": { "confidence": 0.85 }
}
JSON

# 7. Write Jest validation test
echo "Writing __tests__/aetherState.validation.test.ts..."
cat > __tests__/aetherState.validation.test.ts <<'TS'
import Ajv from "ajv";
import aetherSchema from "../schema/aetherState.schema.json";
import lowEnergyFixture from "../__fixtures__/aether/low-energy-suggestion.json";
import complexExpandFixture from "../__fixtures__/aether/complex-expand-with-memory.json";
import extractedFixture from "../__fixtures__/aether/extracted-from-history.json";
import type { AetherState } from "../types/AetherState";

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile<AetherState>(aetherSchema);

const fixtures = [
  { name: "Low Energy Suggestion", data: lowEnergyFixture },
  { name: "Complex Expand with Memory", data: complexExpandFixture },
  { name: "Extracted from History", data: extractedFixture },
] as const;

describe("AetherState fixtures", () => {
  fixtures.forEach(({ name, data }) => {
    test(`${name} conforms to JSON Schema`, () => {
      const valid = validate(data);
      if (!valid && validate.errors) {
        console.error(`${name} validation errors:`, validate.errors);
      }
      expect(valid).toBe(true);
    });

    test(`${name} has valid moodTag`, () => {
      const mood = data.emotionState.moodTag;
      expect(mood).toBeDefined();
      expect([
        "clarity", "resonance", "flow", "unrest", "awe",
        "disruption", "curiosity", "compassion", "stillness", "creative-chaos"
      ]).toContain(mood);
    });

    test(`${name} has non-empty response text`, () => {
      expect(typeof data.responseObject.text).toBe("string");
      expect(data.responseObject.text.length).toBeGreaterThan(0);
    });
  });

  test("LOW_ENERGY responses are reasonably short", () => {
    expect(lowEnergyFixture.routing.branch).toBe("LOW_ENERGY");
    expect(lowEnergyFixture.responseObject.text.split(" ").length).toBeLessThan(60);
  });

  test("COMPLEX_EXPAND uses memory when available", () => {
    expect(complexExpandFixture.routing.branch).toBe("COMPLEX_EXPAND");
    expect(complexExpandFixture.memoryContext.length).toBeGreaterThan(0);
  });
});
TS

# 8. Write CI workflow
echo "Writing .github/workflows/ci.yml..."
cat > .github/workflows/ci.yml <<'YML'
name: CI

on:
  push:
    branches: [ main, "feature/**" ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test
YML

# 9. Commit everything
echo "Committing changes..."
git add schema types __fixtures__ __tests__ .github/workflows
git commit -m "chore(aether): add JSON Schema, TypeScript types, fixtures, and validation tests

- Defines strict contract for AetherState with MoodTag union
- Provides TypeScript interfaces for type safety
- Includes 3 realistic fixtures for LOW_ENERGY, COMPLEX_EXPAND, FOLLOW_UP branches
- Adds Jest + AJV schema validation tests
- Introduces GitHub Actions CI workflow with caching"

# 10. Push branch
echo "Pushing branch $BRANCH to $REMOTE..."
git push -u "$REMOTE" "$BRANCH"

# 11. Create PR (if gh CLI is available)
if command -v gh >/dev/null 2>&1; then
  echo "Creating Pull Request via GitHub CLI..."
  gh pr create \
    --title "Add AetherState schema, types, fixtures and validation tests" \
    --body "This PR introduces a formal JSON Schema and TypeScript definitions for **AetherState**, along with realistic fixtures and automated validation.

Key benefits:
- Enforces consistent state shape across pipeline stages
- Enables reliable fixture-based testing (unit, snapshot, integration)
- Provides foundation for generating training/simulation data
- CI now validates all fixtures on every PR

Ready for review and merge. 🚀" \
    --base main \
    --head "$BRANCH" || echo "PR may already exist — continuing."
else
  echo "GitHub CLI (gh) not installed."
  echo "Please manually create a Pull Request on GitHub:"
  echo "   From branch: $BRANCH"
  echo "   To base:     main"
  echo "   Suggested title: Add AetherState schema, types, fixtures and tests"
fi

echo ""
echo "✅ All done!"
echo "   Branch '$BRANCH' has been pushed."
echo "   Pull Request created (or create manually if gh not available)."
echo "   You're ready to merge and start generating more fixtures confidently."
