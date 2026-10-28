#!/usr/bin/env node
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
const ownRoot=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
export function inspectRules({root=ownRoot,ledger,stage='delivery'}) {
 const errors=[];const check=(v,m)=>{if(!v)errors.push(m)};
 try {
  check(['prepare','delivery'].includes(stage),'unknown stage');
  const catalogPath=resolve(root,'rules/registry.json');const catalog=JSON.parse(readFileSync(catalogPath,'utf8'));
  const data=JSON.parse(readFileSync(ledger,'utf8'));const base=dirname(resolve(ledger));
  check(data.schemaVersion===1,'ledger schemaVersion must be 1');
  check(data.skill===catalog.skill&&data.skillVersion===catalog.version,'skill/version mismatch');
  check(data.registrySha256===sha(catalogPath),'registry stale');
  check(Array.isArray(data.scope)&&data.scope.length>0,'scope missing');
  check((data.scope??[]).every(x=>catalog.scopes.includes(x)),'unknown scope');
  const rows=data.rules??[];check(Array.isArray(rows),'rules must be an array');
  const ids=rows.map(x=>x.id);check(new Set(ids).size===ids.length,'duplicate rule row');
  const needed=new Set(catalog.rules.filter(r=>r.scopes.includes('all')||r.scopes.some(s=>(data.scope??[]).includes(s))).map(r=>r.id));
  for(let changed=true;changed;){changed=false;for(const id of [...needed])for(const dep of catalog.rules.find(r=>r.id===id)?.requires??[])if(!needed.has(dep)){needed.add(dep);changed=true}}
  for(const id of needed){
   const rule=catalog.rules.find(r=>r.id===id);const row=rows.find(r=>r.id===id);
   if(!rule||!row){errors.push(`missing rule: ${id}`);continue}
   const source=resolve(root,rule.file);check(existsSync(source),`${id}: source missing`);
   if(existsSync(source))check(row.ruleSha256===sha(source),`${id}: rule changed/not read`);
   check(typeof row.readAt==='string'&&Number.isFinite(Date.parse(row.readAt)),`${id}: read evidence missing`);
   check(typeof row.applicableRequirements==='string'&&row.applicableRequirements.trim(),`${id}: applicable clauses missing`);
   if(stage==='delivery'){
    check(row.status==='passed',`${id}: execution is ${row.status??'missing'}`);
    check(typeof row.implementation==='string'&&row.implementation.trim(),`${id}: actual implementation missing`);
    check(Array.isArray(row.evidence)&&row.evidence.length>0,`${id}: evidence missing`);
    for(const e of row.evidence??[]){const p=resolve(base,e.path??'');check(typeof e.path==='string'&&existsSync(p),`${id}: evidence file missing`);if(e.path&&existsSync(p))check(e.sha256===sha(p),`${id}: evidence drift`)}
   }
  }
  check(rows.every(r=>catalog.rules.some(x=>x.id===r.id)),'unknown rule row');
  return {passed:errors.length===0,stage,requiredRules:[...needed],errors,limits:'Checks declared scope, source/ledger/evidence integrity. Does not read minds, judge visual quality, listen to audio, or replace domain gates.'};
 }catch(e){return {passed:false,stage,errors:[...errors,e.message]}}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const args=process.argv.slice(2);const val=f=>args[args.indexOf(f)+1];
 if(!args.includes('--ledger')){console.error('Usage: validate-rule-execution.mjs --ledger <file> [--stage prepare|delivery] [--report file]');process.exit(2)}
 const result=inspectRules({ledger:resolve(val('--ledger')),stage:args.includes('--stage')?val('--stage'):'delivery'});
 if(args.includes('--report')){const p=resolve(val('--report'));mkdirSync(dirname(p),{recursive:true});writeFileSync(p,JSON.stringify(result,null,2)+'\n')}
 console.log(JSON.stringify(result,null,2));process.exitCode=result.passed?0:1;
}
