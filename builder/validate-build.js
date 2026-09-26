const MONEY_PATTERNS=[
  /localStorage\.(setItem|getItem)\([^)]*(star|coin|wallet|balance)/i,
  /sessionStorage\.(setItem|getItem)\([^)]*(star|coin|wallet|balance)/i
];
const SECRET_PATTERNS=[
  /(?:api[_-]?key|client[_-]?secret|affiliate[_-]?secret|ledger[_-]?secret)\s*[:=]\s*['"][^'"]+['"]/i,
  /authorization\s*[:=]\s*['"]bearer\s+(?!\$\{|<|replace|example)[^'"]+/i
];

export function validateBuild({plan,files={},components=[]}={}){
  const errors=[],warnings=[];
  if(!plan) errors.push('Missing site plan.');
  for(const unresolved of plan?.generateOnly||[]) warnings.push(`Unresolved capability: ${unresolved}`);

  const owners=new Map();
  for(const module of plan?.reuse||[]){
    for(const cap of module.capabilities||[]){
      if(owners.has(cap)) errors.push(`Duplicate capability owner for ${cap}: ${owners.get(cap)} and ${module.id}`);
      else owners.set(cap,module.id);
    }
  }

  for(const [path,source] of Object.entries(files)){
    if(typeof source!=='string') continue;
    if(MONEY_PATTERNS.some(rx=>rx.test(source))) errors.push(`Frontend money persistence detected in ${path}`);
    if(SECRET_PATTERNS.some(rx=>rx.test(source))) errors.push(`Possible committed secret detected in ${path}`);
  }

  const monetized=owners.has('affiliate-attribution')||owners.has('merchant-adapters');
  if(monetized&&!components.some(c=>c.id==='affiliate-disclosure')) errors.push('Monetized site is missing affiliate disclosure component.');
  if(owners.has('wallet-ui')&&!owners.has('starcoin-balance')) errors.push('Wallet UI has no authoritative StarCoin balance capability.');

  return {ok:errors.length===0,errors,warnings};
}
