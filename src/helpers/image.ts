export const placeholderImage = "data:image/svg+xml;base64," + btoa(`
    <svg width="100" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="120" fill="none" stroke="#ccc" stroke-width="2" stroke-dasharray="5,5"/>
      <polygon points="80,0 100,0 100,20" fill="#ccc"/>
      <text x="50" y="60" font-size="12" fill="#999" text-anchor="middle" alignment-baseline="middle">No Image</text>
    </svg>
  `);