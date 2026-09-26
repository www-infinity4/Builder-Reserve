export function provenanceForUserRecord(recordId,{originalDate=null,sourceRefs=[]}={}){
  if(!recordId)throw new Error('recordId is required');
  return {
    recordId,
    origin:'user-supplied',
    capturedAt:new Date().toISOString(),
    originalDate,
    originalWordingPreserved:true,
    verification:{status:'unverified',method:'none',notes:'User-supplied context is preserved without independently validating its factual or legal claims.'},
    sourceRefs,
    transformations:[{type:'structured',notes:'Converted into builder-readable fields while preserving the source meaning.'}]
  };
}

export function provenanceBadge(p){
  const labels={
    'user-supplied':'User supplied',
    'external-source':'External source',
    'builder-generated':'Builder generated',
    'verified-filing':'Verified filing',
    'system-record':'System record'
  };
  return {label:labels[p?.origin]||'Unknown origin',verification:p?.verification?.status||'unverified'};
}
