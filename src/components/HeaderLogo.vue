<template>
  <div class="logo-container">
    <div class="logo-icon">
      <svg width="46" height="46" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="basketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f5a623;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e8720c;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#67c23a" />
            <stop offset="100%" style="stop-color:#2a9d8f" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.18)"/>
          </filter>
        </defs>

        <!-- Handle arc -->
        <path d="M28 42 Q50 10 72 42"
          fill="none" stroke="url(#handleGrad)"
          stroke-width="5.5" stroke-linecap="round" filter="url(#shadow)" />

        <!-- Basket body -->
        <rect x="18" y="42" width="64" height="46" rx="8"
          fill="url(#basketGrad)" filter="url(#shadow)" />

        <!-- Basket weave lines vertical -->
        <line x1="34" y1="44" x2="34" y2="86" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>
        <line x1="50" y1="44" x2="50" y2="86" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>
        <line x1="66" y1="44" x2="66" y2="86" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>
        <!-- Basket weave lines horizontal -->
        <line x1="20" y1="58" x2="80" y2="58" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>
        <line x1="20" y1="72" x2="80" y2="72" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>

        <!-- Apple peeking out -->
        <circle cx="34" cy="36" r="8" fill="#e63946"/>
        <path d="M34 28 Q37 23 42 26" fill="none" stroke="#2a9d8f" stroke-width="2.5" stroke-linecap="round"/>

        <!-- Leafy green peeking -->
        <ellipse cx="62" cy="33" rx="9" ry="12" fill="#67c23a"/>
        <line x1="62" y1="21" x2="62" y2="44" stroke="#2a9d8f" stroke-width="2.5"/>

        <!-- Yellow item (corn/banana hint) -->
        <ellipse cx="50" cy="35" rx="5" ry="9" fill="#ffd700" transform="rotate(-15 50 35)"/>
      </svg>
    </div>
    <div class="logo-text-group">
      <span class="logo-line-1">MY</span>
      <span class="logo-line-2">GROCERY</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  user-select: none;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.12));
  transition: transform 0.2s ease;
}

.logo-container:hover .logo-icon {
  transform: scale(1.06) rotate(-3deg);
}

.logo-text-group {
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 1px;
}

.logo-line-1 {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  background: linear-gradient(135deg, #67c23a, #2a9d8f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-line-2 {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.06em;
  background: linear-gradient(135deg, #e8720c, #e63946);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
