#!/usr/bin/env node
import {inspectRules} from './validate-rule-execution.mjs';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
const root=mkdtempSync(resolve(tmpdir(),'vibe-rule-gate-'));let count=0;
const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
try{
 mkdirSync(resolve(root,'rules'));writeFileSync(resolve(root,'rules/a.md'),'Rule A');writeFileSync(resolve(root,'rules/b.md'),'Rule B');writeFileSync(resolve(root,'evidence.md'),'Fixture inspection evidence, not a real delivery.');
 const registry={skill:'fixture',version:'1.0.0',scopes:['copy','audio'],rules:[{id:'a',file:'rules/a.md',scopes:['copy'],requires:['b']},{id:'b',file:'rules/b.md',scopes:['audio'],requires:[]}]};
 const reg=resolve(root,'rules/registry.json');writeFileSync(reg,JSON.stringify(registry));
 const data={schemaVersion:1,skill:'fixture',skillVersion:'1.0.0',registrySha256:hash(reg),scope:['copy'],rules:['a','b'].map(id=>({id,ruleSha256:hash(resolve(root,'rules/'+id+'.md')),readAt:'2026-10-20T00:00:00Z',applicableRequirements:'Fixture requirement',status:'passed',implementation:'Fixture consuming configuration',evidence:[{path:'evidence.md',sha256:hash(resolve(root,'evidence.md'))}]}))};
 const check=(name,mutate,expected,stage='delivery')=>{const v=structuredClone(data);mutate?.(v);const ledger=resolve(root,'ledger.json');writeFileSync(ledger,JSON.stringify(v));const result=inspectRules({root,ledger,stage});if(result.passed!==expected)throw Error(name+': '+JSON.stringify(result));count++};
 check('valid evidence chain',null,true);
 check('missing inherited rule',v=>v.rules.pop(),false);
 check('missing read record',v=>delete v.rules[0].readAt,false,'prepare');
 check('stale source',v=>v.rules[0].ruleSha256='0'.repeat(64),false,'prepare');
 check('stale registry',v=>v.registrySha256='0'.repeat(64),false);
 check('missing implementation',v=>delete v.rules[0].implementation,false);
 check('rejected cannot pass',v=>v.rules[0].status='rejected',false);
 check('missing output evidence',v=>v.rules[0].evidence=[],false);
 check('changed output evidence',v=>v.rules[0].evidence[0].sha256='0'.repeat(64),false);
 check('unknown scope',v=>v.scope=['invented'],false);
 check('unperformed delivery allowed only preparation',v=>{v.rules.forEach(r=>{r.status='pending';r.evidence=[];delete r.implementation})},true,'prepare');
 check('pending blocks delivery',v=>v.rules[0].status='pending',false);
 console.log(`Rule execution behavioral checks passed: ${count}`);
}finally{rmSync(root,{recursive:true,force:true})}
