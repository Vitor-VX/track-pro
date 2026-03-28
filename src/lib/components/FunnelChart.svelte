<script lang="ts">
  import type { FunnelStep } from "$lib/types";
  import { formatNumber } from "$lib/data";

  interface Props {
    data: FunnelStep[];
  }

  let { data }: Props = $props();

  const maxValue = $derived(data[0]?.value || 0);
</script>

<div class="funnel-chart">
  {#each data as step, i}
    {@const width = maxValue > 0 ? (step.value / maxValue) * 100 : 0}
    {@const prevStep = i > 0 ? data[i - 1] : null}
    {@const dropRate = prevStep
      ? Math.round(((prevStep.value - step.value) / prevStep.value) * 100)
      : 0}

    <div class="funnel-step">
      <div class="step-info">
        <span class="step-name">{step.name}</span>
        <div class="step-values">
          <span class="step-value">{formatNumber(step.value)}</span>
          <span class="step-percentage">({step.percentage.toFixed(1)}%)</span>
        </div>
      </div>

      <div class="step-bar-container">
        <div class="bar-wrapper">
          <div class="step-bar" style="width: {width}%">
            <div class="bar-fill"></div>
          </div>
        </div>
        {#if i > 0 && dropRate > 0}
          <div
            class="drop-indicator"
            class:high={dropRate > 40}
            class:medium={dropRate > 20 && dropRate <= 40}
          >
            -{dropRate}%
          </div>
        {/if}
      </div>
    </div>

    {#if i < data.length - 1}
      <div class="funnel-connector">
        <svg viewBox="0 0 24 16" class="connector-arrow">
          <path
            d="M12 0 L12 12 M8 8 L12 12 L16 8"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    {/if}
  {/each}
</div>

<style>
  .funnel-chart {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .funnel-step {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .step-info {
    width: 140px;
    flex-shrink: 0;
  }

  .step-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text);
    display: block;
    margin-bottom: 4px;
  }

  .step-values {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .step-value {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-strong);
  }

  .step-percentage {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .step-bar-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .bar-wrapper {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  .step-bar {
    height: 36px;
    min-width: 4px;
    border-radius: var(--radius-xs);
    overflow: hidden;
    transition: width 0.5s ease;
    max-width: 100%;
  }

  .bar-fill {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--primary) 0%,
      var(--primary-2) 100%
    );
  }

  .drop-indicator {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 12px;
    background: var(--success-soft);
    color: var(--success);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .drop-indicator.medium {
    background: var(--warning-soft);
    color: var(--warning);
  }

  .drop-indicator.high {
    background: var(--danger-soft);
    color: var(--danger);
  }

  .funnel-connector {
    padding-left: 160px;
    height: 16px;
    display: flex;
    align-items: center;
  }

  .connector-arrow {
    width: 24px;
    height: 16px;
    color: var(--border);
  }

  @media (max-width: 640px) {
    .step-info {
      width: 100px;
    }

    .funnel-connector {
      padding-left: 120px;
    }
  }
</style>
