// Template note: after this file is copied into a generated site's tests/ folder,
// its builder validator is supplied by the generated site's adapter layer.
// Keeping this template dependency-free prevents Builder Reserve's own test runner
// from treating an ungenerated template as a live site test.

export function smokeTestGeneratedSite(input, validateBuild){
  if(typeof validateBuild!=='function') throw new Error('Generated site must supply validateBuild().');
  const result=validateBuild(input);
  if(!result.ok) throw new Error('Generated site failed builder validation:\n'+result.errors.join('\n'));
  return result;
}
