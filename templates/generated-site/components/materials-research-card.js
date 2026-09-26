export function materialsResearchCard(record){
  if(!record?.id) throw new Error('Materials research record requires id.');
  const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const materials=(record.materials||[]).map(m=>`<li><strong>${esc(m.formula)}</strong> — ${esc(m.role)}<small>${esc((m.propertiesOfInterest||[]).join(' · '))}</small></li>`).join('');
  const mechanisms=(record.mechanisms||[]).map(m=>`<li><strong>${esc(m.name)}</strong><span class="evidence evidence-${esc(m.status)}">${esc(m.status)}</span><p>${esc(m.notes||'')}</p></li>`).join('');
  const variables=(record.fabrication?.variables||[]).map(v=>`<li>${esc(v)}</li>`).join('');
  const sources=(record.sources||[]).map(url=>`<li><a href="${esc(url)}" rel="noopener">Source</a></li>`).join('');
  return `<article class="materials-research-card" data-research-id="${esc(record.id)}"><header><p class="eyebrow">Materials computing research</p><h2>${esc(record.title||record.id)}</h2><p><strong>Evidence:</strong> ${esc(record.evidenceStatus||'unverified')}</p></header><section><h3>Candidate materials</h3><ul>${materials}</ul></section><section><h3>Mechanisms</h3><ul>${mechanisms}</ul></section><section><h3>Fabrication variables</h3><p>Method: ${esc(record.fabrication?.method||'unspecified')}</p><ul>${variables}</ul></section><section><h3>Sources</h3>${sources?`<ul>${sources}</ul>`:'<p>No sources attached yet. Treat this record as conceptual until evidence is added.</p>'}</section></article>`;
}
