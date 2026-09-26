export function assemblePages(componentCatalog, assembly, resolvedCapabilities=[]){
  const components=new Map((componentCatalog?.components||[]).map(c=>[c.id,c]));
  const caps=new Set(resolvedCapabilities);
  const pages={};
  for(const [pageId,ids] of Object.entries(assembly?.pages||{})){
    pages[pageId]=ids.map(id=>{
      const component=components.get(id);
      if(!component) throw new Error(`Unknown component: ${id}`);
      const missing=(component.requires||[]).filter(cap=>!caps.has(cap));
      return {...component,ready:missing.length===0,missing};
    });
  }
  return pages;
}
