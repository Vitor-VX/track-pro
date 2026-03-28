<script lang="ts">
  import type { HeatmapData } from '$lib/types';
  
  interface Props {
    data: HeatmapData[];
  }
  
  let { data }: Props = $props();
  
  function getColor(percentage: number): string {
    if (percentage >= 70) return '#22c55e';
    if (percentage >= 50) return '#84cc16';
    if (percentage >= 30) return '#f59e0b';
    if (percentage >= 15) return '#f97316';
    return '#ef4444';
  }
</script>

<div class="heatmap-container">
  <div class="heatmap-visual">
    <div class="page-representation">
      {#each data as point, i}
        {@const height = i === 0 ? point.depth : point.depth - data[i - 1].depth}
        <div 
          class="scroll-zone"
          style="
            height: {height}%;
            background: linear-gradient(180deg, {getColor(point.percentage)} 0%, {getColor(point.percentage)}80 100%);
          "
        >
          <div class="zone-label">
            <span class="zone-depth">{point.depth}%</span>
            <span class="zone-percentage">{point.percentage}% dos usuários</span>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="depth-markers">
      <div class="marker" style="top: 0%">
        <span>Topo</span>
      </div>
      <div class="marker" style="top: 25%">
        <span>25%</span>
      </div>
      <div class="marker" style="top: 50%">
        <span>50%</span>
      </div>
      <div class="marker" style="top: 75%">
        <span>75%</span>
      </div>
      <div class="marker" style="top: 100%">
        <span>100%</span>
      </div>
    </div>
  </div>
  
  <div class="heatmap-legend">
    <h4>Legenda</h4>
    <div class="legend-items">
      <div class="legend-item">
        <span class="legend-color" style="background: #22c55e"></span>
        <span>70%+ usuários</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #84cc16"></span>
        <span>50-70% usuários</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #f59e0b"></span>
        <span>30-50% usuários</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #f97316"></span>
        <span>15-30% usuários</span>
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background: #ef4444"></span>
        <span>0-15% usuários</span>
      </div>
    </div>
  </div>
</div>

<style>
  .heatmap-container {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }
  
  .heatmap-visual {
    flex: 1;
    display: flex;
    gap: 20px;
    max-width: 500px;
  }
  
  .page-representation {
    flex: 1;
    height: 500px;
    background: var(--card-2);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .scroll-zone {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .scroll-zone:hover {
    filter: brightness(1.1);
  }
  
  .scroll-zone:last-child {
    border-bottom: none;
    flex: 1;
  }
  
  .zone-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    text-align: center;
  }
  
  .zone-depth {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .zone-percentage {
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    opacity: 0.9;
  }
  
  .depth-markers {
    width: 60px;
    height: 500px;
    position: relative;
  }
  
  .marker {
    position: absolute;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .marker::before {
    content: '';
    width: 12px;
    height: 2px;
    background: var(--border);
  }
  
  .marker span {
    font-size: 0.75rem;
    color: var(--muted);
    font-family: var(--font-mono);
  }
  
  .heatmap-legend {
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    min-width: 200px;
  }
  
  .heatmap-legend h4 {
    font-size: 0.875rem;
    margin-bottom: 16px;
    color: var(--text-strong);
  }
  
  .legend-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .legend-color {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  
  .legend-item span:last-child {
    font-size: 0.8125rem;
    color: var(--muted);
  }
  
  @media (max-width: 768px) {
    .heatmap-container {
      flex-direction: column;
    }
    
    .heatmap-visual {
      max-width: 100%;
    }
    
    .heatmap-legend {
      width: 100%;
    }
  }
</style>
