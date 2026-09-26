export function resolveClaimEvidence(record){
  if(!record?.claimId||!record?.claim)throw new Error('Evidence record requires claimId and claim.');
  const evidence=Array.isArray(record.evidence)?record.evidence:[];
  const supports=evidence.filter(x=>x.relationship==='supports').length;
  const contradicts=evidence.filter(x=>x.relationship==='contradicts').length;
  let derived='unverified';
  if(supports&&contradicts)derived='mixed';
  else if(contradicts)derived='contradicted';
  else if(supports)derived='supported';
  return {...record,derivedStatus:derived,sourceCount:evidence.length};
}

export function canPromoteClaim(record){
  const resolved=resolveClaimEvidence(record);
  return resolved.derivedStatus==='supported' && resolved.evidence.some(x=>['peer-reviewed-experiment','standard','government-data'].includes(x.evidenceType));
}
