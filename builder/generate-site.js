import { planSite } from './plan-site.js';
import { assemblePages } from './assemble-pages.js';
import { validateBuild } from './validate-build.js';

export function generateSitePlan({registry,blueprint,componentCatalog,pageAssembly}){
  const plan=planSite(registry,blueprint);
  const resolvedCapabilities=[...new Set((plan.reuse||[]).flatMap(module=>module.capabilities||[]))];
  const pages=assemblePages(componentCatalog,pageAssembly,resolvedCapabilities);
  const components=[...new Map(Object.values(pages).flat().map(c=>[c.id,c])).values()];
  const validation=validateBuild({plan,components,files:{}});

  return {
    schemaVersion:1,
    site:{
      id:blueprint.id,
      name:blueprint.name,
      siteType:blueprint.siteType,
      blueprint:`blueprints/${blueprint.id}.json`
    },
    modules:(plan.reuse||[]).map(module=>({
      id:module.id,
      mode:module.install?.strategy||'adapter',
      source:module.source?.repository||null,
      entrypoint:module.source?.entrypoint||null
    })),
    unresolved:plan.generateOnly||[],
    pages,
    policies:plan.policies,
    deployment:plan.deployment,
    validation,
    instruction:'Reuse resolved modules. Generate only unresolved site-specific adapters/components.'
  };
}

export function assertGeneratable(output){
  const notReady=[];
  for(const [pageId,components] of Object.entries(output.pages||{})){
    for(const component of components) if(!component.ready) notReady.push(`${pageId}:${component.id} missing ${component.missing.join(', ')}`);
  }
  return {ready:output.validation?.ok===true&&notReady.length===0,notReady,unresolved:output.unresolved||[]};
}
