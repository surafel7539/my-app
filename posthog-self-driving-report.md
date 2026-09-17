# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured with Session Replay, Error Tracking, and Support enabled. Health checks, Error Tracking, and Support responders are enabled for the inbox; its scout gate is on by default. New findings should begin appearing in the [Self-driving inbox](https://us.posthog.com/project/611120/inbox) within about 30 minutes.

## AI data processing

Approved by the wizard's organization-level gate before this setup ran.

## GitHub

GitHub was already connected before this setup. No GitHub Issues responder was enabled because no connected-tool selection was made.

## Products enabled

| Product | Result | Client check / note |
|---|---|---|
| Session Replay | Already enabled | The web app initializes `posthog-js` without disabling session recording. No client change was needed. |
| Error Tracking | Already enabled | The web app enables exception capture in its PostHog initialization. No client change was needed. |
| Support (Conversations) | Enabled | Connect an inbound email, inbox, or Slack channel in PostHog before support tickets can arrive. |

## Signal sources

| Signal source | Action | Notes |
|---|---|---|
| `signals_scout` / `cross_source_issue` | On by default | No configuration row is needed; scouts may send findings to the inbox. |
| `health_checks` / `health_issue` | Enabled | Created responder `01a0a66c-e145-7ec2-ae99-8b381c2da5a8`. |
| `error_tracking` / `issue_created` | Enabled | Created responder `01a0a66c-e1f2-7f34-a66f-46963c3e8120`. |
| `error_tracking` / `issue_reopened` | Enabled | Created responder `01a0a66c-e29b-78a2-8c94-89c6ae6354e1`. |
| `error_tracking` / `issue_spiking` | Enabled | Created responder `01a0a66c-e208-7f31-845d-75209f4e1e31`. |
| `conversations` / `ticket` | Enabled | Created responder `01a0a66c-e1b7-755a-a304-e15396f456a8`; it remains idle until an inbound Support channel is connected. |
| Session Replay responder | Deliberately skipped | Replay Vision scanners below are the single route for replay findings. |

## Connected tools

No external connected tool was selected in the integration prompt. No issue-tracker, support-desk, or external error-tracker responder was added.

## Scout troop

The troop is materialized and enrolled. Four scouts are enabled on their default daily cadence; 23 are disabled to keep the initial set focused. The project allows **100 runs per day**; **0** had been used at configuration time, with **100 remaining**.

> Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.

### Enabled

| Scout | Why it is enabled |
|---|---|
| `signals-scout-general` | Covers cross-product patterns and surfaces without a specialist. |
| `signals-scout-product-analytics` | Watches changes in core product-flow analysis. |
| `signals-scout-web-analytics` | Watches traffic acquisition and landing-page health for this web app. |
| `signals-scout-observability-gaps` | Finds important events without insight, dashboard, or alert coverage. |

### Disabled

| Scout | Reason |
|---|---|
| `signals-scout-ai-observability` | No AI/LLM usage was found in the light repo scan. |
| `signals-scout-anomaly-detection` | No established dashboard or insight baseline was available. |
| `signals-scout-apm` | No APM or distributed-tracing surface was identified. |
| `signals-scout-conversations` | Support has just been enabled and no inbound channel is connected yet. |
| `signals-scout-csp-violations` | No CSP reporting surface was found. |
| `signals-scout-customer-analytics` | No account/group analytics surface was found. |
| `signals-scout-data-pipelines` | No pipeline, batch-export, or Hog Flow surface was found. |
| `signals-scout-data-warehouse` | No warehouse source was selected or connected in this setup. |
| `signals-scout-error-tracking` | Covered by the native Error Tracking responders. |
| `signals-scout-experiments` | No active experiment evidence was available. |
| `signals-scout-feature-flags` | No active feature-flag usage was found in the repo scan. |
| `signals-scout-health-checks` | Health checks already have a native inbox responder. |
| `signals-scout-inbox-validation` | Deferred until there are resolved Self-driving reports to re-measure. |
| `signals-scout-insight-alerts` | No saved insight alerts were identified. |
| `signals-scout-logs` | No PostHog Logs usage was established. |
| `signals-scout-mcp-tool-calls` | No relevant application MCP-tool telemetry surface was identified. |
| `signals-scout-replay-vision` | Deferred until the newly created scanners accumulate observations. |
| `signals-scout-revenue-analytics` | No payment or revenue surface was found. |
| `signals-scout-session-replay` | Covered by the Replay Vision scanners below. |
| `signals-scout-skills-store` | No active skill-authoring surface was identified. |
| `signals-scout-surveys` | No surveys were found. |
| `signals-scout-tasks` | No application task surface was identified. |
| `signals-scout-web-vitals` | Core Web Vitals monitoring was not chosen for this focused initial troop. |

## Custom scouts

No custom scout was created. A focused event-discovery engagement check was proposed to detect sustained breakdowns between browsing the directory and opening an event while traffic remains steady; the proposal was declined.

The following surfaces were considered and ruled out:

- **Error bursts:** already covered by the native Error Tracking responders.
- **Replay friction and visible breakage:** covered by the two Replay Vision scanners below.
- **Generic traffic anomalies:** covered by the enabled web analytics scout.
- **Event-discovery conversion:** a useful domain-specific gap, but no custom check was approved.

If an enabled scout later becomes noisy, set `emit: false` on its configuration in PostHog to keep it running in dry-run mode without sending findings to the inbox.

## Replay Vision scanners

A scanner is an LLM that watches individual session recordings on a schedule and pushes confirmed findings to the inbox. These are the only components in this setup that spend Replay Vision quota. Each scanner finding carries half weight, so independent corroboration is required before a report is promoted into the inbox.

No recordings were found during setup. Both scanners are enabled and will begin scanning when recordings arrive. The organization had 2,500 Replay Vision credits remaining; both current estimates are zero observations and zero credits per month because there are no matching recordings yet.

| Brief | Status | Scanner | What it watches | Query scope | Sampling | Estimate |
|---|---|---|---|---|---:|---:|
| Breakage monitor | Created | [Event detail breakage](https://us.posthog.com/project/611120/replay-vision/01a0a671-90dd-719b-869a-935c1d30bf95) | Visible failures while visitors view event details, including failed event cards, broken navigation to details, missing details, or failed content. | Recordings containing an event URL under `/events/`, which is the app’s identified event-detail flow. | 50% | 0 observations / 0 credits monthly |
| Frustration monitor | Created | [Event discovery frustration](https://us.posthog.com/project/611120/replay-vision/01a0a671-90ad-73ec-b076-496fe195f20b) | Clear on-screen struggle while browsing or selecting developer events. | Recordings with a rage-click; this is intentionally not URL-scoped so it remains distinct from the breakage monitor. | 100% | 0 observations / 0 credits monthly |

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) so the enabled Support responder has tickets to surface.
- [ ] Generate real web sessions so Session Replay and the two Replay Vision scanners can begin observing the event-discovery flow.
- [ ] If the event-discovery engagement check becomes important, create the declined custom scout from the Self-driving inbox.
- [ ] Optionally enable a disabled specialist later if the corresponding product surface becomes active.

## What happens next

Fresh scout configurations are picked up by the coordinator within roughly 30 minutes and use the daily scout-run allowance. Replay Vision begins as new recordings complete. Self-driving clusters corroborated findings into reports in the inbox, where immediately actionable reports can begin coding tasks.

## Files modified or created

- Created `posthog-self-driving-report.md`.
- No application source files were modified; the existing browser initialization already preserves Session Replay and enables exception capture.
