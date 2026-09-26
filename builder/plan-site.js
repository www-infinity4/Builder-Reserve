import { resolveModules, generationGuard } from './resolve-modules.js';

export function planSite(registry, blueprint) {
  const resolution = resolveModules(registry, blueprint.capabilities || []);
  const guard = generationGuard(resolution);
  const pages = (blueprint.pages || []).map(page => ({
    ...page,
    resolution: resolveModules(registry, page.capabilities || [])
  }));
  return {
    site: { id: blueprint.id, name: blueprint.name, siteType: blueprint.siteType },
    reuse: guard.reuse,
    generateOnly: guard.generateOnly,
    pages,
    policies: blueprint.policies || [],
    deployment: blueprint.deployment || {},
    instruction: guard.instruction
  };
}
