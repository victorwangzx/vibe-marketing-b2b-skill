#!/usr/bin/env node
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export function createRuleLedger(scope){
 const file=resolve(root,'rules/registry.json'),registry=JSON.parse(readFileSync(file,'utf8'));
 if(!scope.length||scope.some(s=>!registry.scopes.includes(s)))throw new Error('Explicit valid task scope required');
 return {schemaVersion:1,skill:registry.skill,skillVersion:registry.version,registrySha256:createHash('sha256').update(readFileSync(file)).digest('hex'),scope,rules:[]};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const args=process.argv.slice(2),v=f=>args[args.indexOf(f)+1];
 if(!args.includes('--root')||!args.includes('--scope')){console.error('Usage: init-rule-execution.mjs --root <project> --scope design,copy,...');process.exit(2)}
 const p=resolve(v('--root'),'notes/rule-execution.json');
 if(existsSync(p)){console.log('Preserved existing ledger: '+p)}else{const data=createRuleLedger(v('--scope').split(','));mkdirSync(dirname(p),{recursive:true});writeFileSync(p,JSON.stringify(data,null,2)+'\n',{flag:'wx'});console.log(p)}
}
