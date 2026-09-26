const TYPES=new Set(['product-impression','outbound-click','conversion-reported','commission-reported','wallet-action']);
const AUTHORITIES={
  'product-impression':'site-observation',
  'outbound-click':'site-observation',
  'conversion-reported':null,
  'commission-reported':null,
  'wallet-action':'wallet-ledger'
};

export function commerceEvent(input){
  if(!input?.eventId||!input?.siteId||!TYPES.has(input.eventType)) throw new Error('Invalid commerce event.');
  const required=AUTHORITIES[input.eventType];
  if(required&&input.authority!==required) throw new Error(`Event ${input.eventType} requires ${required} authority.`);
  if((input.eventType==='conversion-reported'||input.eventType==='commission-reported') &&
     !['merchant','affiliate-network'].includes(input.authority)){
    throw new Error('Conversion and commission events require merchant/network authority.');
  }
  return {
    ...input,
    occurredAt:input.occurredAt||new Date().toISOString()
  };
}

export function eventIdempotencyKey(event){
  return `${event.siteId}:${event.eventType}:${event.eventId}`;
}

export function summarizeCommerce(events=[]){
  const unique=new Map();
  for(const event of events) unique.set(eventIdempotencyKey(event),event);
  const rows=[...unique.values()];
  return {
    impressions:rows.filter(x=>x.eventType==='product-impression').length,
    outboundClicks:rows.filter(x=>x.eventType==='outbound-click').length,
    reportedConversions:rows.filter(x=>x.eventType==='conversion-reported').length,
    reportedCommission:rows.filter(x=>x.eventType==='commission-reported').reduce((n,x)=>n+(Number(x.amount)||0),0),
    walletActions:rows.filter(x=>x.eventType==='wallet-action').length
  };
}
