import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { resolveModules } from '../builder/resolve-modules.js';
import { generateSitePlan, assertGeneratable } from '../builder/generate-site.js';
import { commerceEvent, summarizeCommerce } from '../modules/commerce-phi/analytics.js';

const json=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));

test('registered capabilities resolve instead of being regenerated',()=>{
  const registry=json('registry/modules.json');
  const result=resolveModules(registry,['wallet-ui','product-card']);
  assert.equal(result.unresolved.length,0);
  assert.ok(result.modules.some(x=>x.id==='unified-wallet'));
  assert.ok(result.modules.some(x=>x.id==='commerce-phi'));
});

test('conversion requires merchant or affiliate-network authority',()=>{
  assert.throws(()=>commerceEvent({eventId:'1',eventType:'conversion-reported',siteId:'test',authority:'site-observation'}));
  const event=commerceEvent({eventId:'2',eventType:'conversion-reported',siteId:'test',authority:'merchant'});
  assert.equal(event.authority,'merchant');
});

test('analytics deduplicates repeated event ids',()=>{
  const event={eventId:'click-1',eventType:'outbound-click',siteId:'test',authority:'site-observation',occurredAt:'2026-01-01T00:00:00Z'};
  assert.equal(summarizeCommerce([event,event]).outboundClicks,1);
});

test('Santa blueprint produces a deterministic plan',()=>{
  const registry=json('registry/modules.json');
  const blueprint=json('blueprints/santas-helper.json');
  const components=json('registry/components.json');
  const pages=json('templates/affiliate-shopping-guide/pages.json');
  const output=generateSitePlan({registry,blueprint,componentCatalog:components,pageAssembly:pages});
  assert.equal(output.site.id,'santas-helper');
  assert.ok(output.modules.some(x=>x.id==='commerce-phi'));
  assert.ok(output.modules.some(x=>x.id==='unified-wallet'));
  const status=assertGeneratable(output);
  assert.equal(Array.isArray(status.notReady),true);
});
