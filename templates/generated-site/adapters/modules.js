export function installResolvedModules(plan, installers={}) {
  const installed=[];
  for(const module of plan?.reuse||[]){
    const install=installers[module.install?.strategy];
    if(typeof install!=='function'){
      installed.push({id:module.id,status:'declared',reason:'installer-not-provided'});
      continue;
    }
    installed.push({id:module.id,status:'installed',result:install(module)});
  }
  return installed;
}

export function assertNoDuplicateCapability(plan, capability){
  const owners=(plan?.reuse||[]).filter(module=>(module.capabilities||[]).includes(capability));
  if(owners.length>1) throw new Error(`Capability ${capability} has multiple registered owners: ${owners.map(x=>x.id).join(', ')}`);
  return owners[0]||null;
}
