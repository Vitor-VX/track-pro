<script lang="ts">
  import type { ChartDataPoint } from "$lib/types";

  interface Props {
    data: ChartDataPoint[];
    height?: number;
  }

  let { data, height = 280 }: Props = $props();

  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = 800;
  const chartHeight = height;

  const innerWidth = $derived(chartWidth - padding.left - padding.right);
  const innerHeight = $derived(chartHeight - padding.top - padding.bottom);

  const safeData = $derived(
    data.length ? data : [{ date: "", visits: 0, sales: 0 }],
  );

  const maxVisits = $derived(
    Math.max(1, ...safeData.map((d) => d.visits)) * 1.1,
  );
  const maxSales = $derived(Math.max(1, ...safeData.map((d) => d.sales)) * 1.1);

  function getVisitsY(value: number): number {
    return padding.top + innerHeight - (value / maxVisits) * innerHeight;
  }

  function getSalesY(value: number): number {
    return padding.top + innerHeight - (value / maxSales) * innerHeight;
  }

  function getX(index: number): number {
    if (safeData.length === 1) return padding.left + innerWidth / 2;
    return padding.left + (index / (safeData.length - 1)) * innerWidth;
  }

  const visitsPath = $derived(
    safeData
      .map(
        (d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getVisitsY(d.visits)}`,
      )
      .join(" "),
  );

  const salesPath = $derived(
    safeData
      .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getSalesY(d.sales)}`)
      .join(" "),
  );

  const visitsArea = $derived(
    `M ${padding.left} ${padding.top + innerHeight} ` +
      safeData.map((d, i) => `L ${getX(i)} ${getVisitsY(d.visits)}`).join(" ") +
      ` L ${getX(safeData.length - 1)} ${padding.top + innerHeight} Z`,
  );
</script>

<div class="chart-container">
  <svg
    viewBox="0 0 {chartWidth} {chartHeight}"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient id="visitsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop
          offset="0%"
          style="stop-color: var(--primary); stop-opacity: 0.3"
        />
        <stop
          offset="100%"
          style="stop-color: var(--primary); stop-opacity: 0"
        />
      </linearGradient>
    </defs>

    {#each [0, 0.25, 0.5, 0.75, 1] as ratio}
      <line
        x1={padding.left}
        y1={padding.top + innerHeight * (1 - ratio)}
        x2={padding.left + innerWidth}
        y2={padding.top + innerHeight * (1 - ratio)}
        stroke="var(--border)"
        stroke-dasharray="4"
      />
      <text
        x={padding.left - 12}
        y={padding.top + innerHeight * (1 - ratio)}
        text-anchor="end"
        alignment-baseline="middle"
        fill="var(--muted)"
        font-size="11"
        font-family="var(--font-mono)"
      >
        {Math.round(maxVisits * ratio)}
      </text>
    {/each}

    {#each safeData as point, i}
      {#if i % Math.ceil(data.length / 7) === 0 || i === data.length - 1}
        <text
          x={getX(i)}
          y={chartHeight - 10}
          text-anchor="middle"
          fill="var(--muted)"
          font-size="11"
          font-family="var(--font-mono)"
        >
          {point.date}
        </text>
      {/if}
    {/each}

    <!-- Area fill -->
    <path d={visitsArea} fill="url(#visitsGradient)" />

    <!-- Lines -->
    <path
      d={visitsPath}
      fill="none"
      stroke="var(--primary)"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d={salesPath}
      fill="none"
      stroke="var(--success)"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    {#each safeData as point, i}
      <circle
        cx={getX(i)}
        cy={getVisitsY(point.visits)}
        r="4"
        fill="var(--primary)"
      />
      <circle
        cx={getX(i)}
        cy={getSalesY(point.sales)}
        r="4"
        fill="var(--success)"
      />
    {/each}
  </svg>

  <div class="chart-legend">
    <div class="legend-item">
      <span class="legend-dot" style="background: var(--primary)"></span>
      <span>Visitas</span>
    </div>
    <div class="legend-item">
      <span class="legend-dot" style="background: var(--success)"></span>
      <span>Vendas</span>
    </div>
  </div>
</div>

<style>
  .chart-container {
    width: 100%;
  }

  svg {
    width: 100%;
    height: auto;
  }

  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 16px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8125rem;
    color: var(--muted);
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
</style>
