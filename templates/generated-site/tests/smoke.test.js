import { validateBuild } from '../../builder/validate-build.js';

export function smokeTestGeneratedSite(input){
  const result=validateBuild(input);
  if(!result.ok) throw new Error('Generated site failed builder validation:\n'+result.errors.join('\n'));
  return result;
}
