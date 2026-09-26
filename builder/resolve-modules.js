export function resolveModules(registry, requestedCapabilities = []) {
  const modules = Array.isArray(registry?.modules) ? registry.modules : [];
  const wanted = new Set(requestedCapabilities);
  const selected = new Map();

  const add = (module) => {
    if (!module || selected.has(module.id)) return;
    selected.set(module.id, module);
    for (const dependency of module.requires || []) {
      add(modules.find(candidate => candidate.id === dependency));
    }
  };

  for (const module of modules) {
    if ((module.capabilities || []).some(capability => wanted.has(capability))) add(module);
  }

  const unresolved = [...wanted].filter(capability =>
    ![...selected.values()].some(module => (module.capabilities || []).includes(capability))
  );

  return { modules: [...selected.values()], unresolved };
}

export function generationGuard(resolution) {
  return {
    reuse: resolution.modules,
    generateOnly: resolution.unresolved,
    instruction: "Never generate a replacement for a capability already resolved from the registry."
  };
}
