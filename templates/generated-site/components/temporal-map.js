export function temporalMap(record){
  if(!record?.variables)throw new Error('Temporal map requires variables.');
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  return `<section class="temporal-map"><h2>Temporal / coordinate map</h2><ol>${record.variables.map(v=>`<li><strong>${esc(v.symbol)}</strong> — ${esc(v.meaning)} <small>${esc(v.dimension)}</small></li>`).join('')}</ol><p><strong>Element 70:</strong> ${esc(record.elementReference?.element||'')} (${esc(record.elementReference?.symbol||'')}) — kept separate from symbolic interpretation.</p></section>`;
}