#!/usr/bin/env node
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtempSync, readFileSync, writeFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {inspectBreath, PAUSE_TIERS} from './validate-dialogue-breath.mjs';

const root = mkdtempSync(join(tmpdir(), 'dialogue-breath-'));
const planFile = join(root, 'plan.json');
const reviewFile = join(root, 'review.json');
const master = join(root, 'master.wav');
const hash = p => createHash('sha256').update(readFileSync(p)).digest('hex');
const text = '我们用人工智能，找资料。';
const turn = {id:'T01', role:'speaker_a', voice:'voice_a', displayText:text, voiceoverText:text, emphasisPlan:{coreMessage:'用人工智能找资料',communicativeIntent:'说明方法',primaryStress:['找资料'],secondaryStress:['人工智能'],deemphasized:['我们用'],deliveryNotes:'方法轻提，结果落稳',auditionStatus:'planned'}, protectedTerms:['人工智能','找资料'], breathGroups:[{text:'我们用人工智能，',intent:'连接'},{text:'找资料。',intent:'完整收句'}], boundaries:[{afterChar:8,punctuation:'，',type:'connect',minMs:80,targetMs:120,maxMs:180,intent:'短连接',mouthBehavior:'短休息'},{afterChar:12,punctuation:'。',type:'sentence',minMs:370,targetMs:400,maxMs:430,intent:'收句',mouthBehavior:'休息'}], handoff:{nextRole:'end',reuseTerminalPause:true,intent:'收句'}};
let checks = 0;
const setPlan = value => writeFileSync(planFile, JSON.stringify(value));
const fixture = {schemaVersion:1,voiceBindings:{speaker_a:'voice_a'},turns:[turn]};
try {
  setPlan(fixture);
  assert.equal(inspectBreath({plan:planFile}).passed,true); checks++;
  for (const change of [t=>t.breathGroups[0].text='改词，', t=>t.boundaries.pop(), t=>t.boundaries[1].targetMs=800, t=>t.voice='voice_b', t=>t.handoff.reuseTerminalPause=false, t=>delete t.emphasisPlan, t=>t.emphasisPlan.primaryStress=['不存在的词'], t=>t.emphasisPlan.secondaryStress=['找资料']]) {
    const bad = structuredClone(fixture); change(bad.turns[0]); setPlan(bad);
    assert.equal(inspectBreath({plan:planFile}).passed,false); checks++;
  }
  setPlan(fixture);
  writeFileSync(master,Buffer.from('immutable test bytes'));
  const audit = {status:'frozen',planSha256:hash(planFile),masterSha256:hash(master),normalSpeedListeningPassed:true,reviewer:'test fixture only',voicedSamplesUnchanged:true,silenceOnlyEdits:true,unresolvedUnexpectedPauses:[],boundaries:[{turnId:'T01',afterChar:8,actualMs:120,outputStartSample:100,outputEndSample:2980,normalSpeedPass:true},{turnId:'T01',afterChar:12,actualMs:400,outputStartSample:4000,outputEndSample:13600,normalSpeedPass:true}]};
  audit.sampleRate=24000;
  writeFileSync(reviewFile,JSON.stringify(audit));
  assert.equal(inspectBreath({plan:planFile,review:reviewFile,master}).passed,true); checks++;
  for (const change of [a=>a.normalSpeedListeningPassed=false,a=>a.status='audition_pending_review',a=>a.boundaries[0].actualMs=450,a=>a.unresolvedUnexpectedPauses.push('unexplained stop'),a=>a.masterSha256='changed',a=>a.boundaries[0].normalSpeedPass=false,a=>a.boundaries[0].outputEndSample+=2400]) {
    const bad = structuredClone(audit); change(bad); writeFileSync(reviewFile,JSON.stringify(bad));
    assert.equal(inspectBreath({plan:planFile,review:reviewFile,master}).passed,false); checks++;
  }
  // New strict profile: tiers, punctuation distinctions and unpunctuated phrasing.
  const allTypes = ['enumeration','connect','explain','clause','sentence','sentence','sentence'];
  const pieces = ['甲、','乙，','丙：','丁；','戊。','己？','庚！'];
  let at = 0;
  const strict = {schemaVersion:1,timingProfile:'segmented-v2',turns:[{...structuredClone(turn),voiceoverText:pieces.join(''),displayText:pieces.join(''),emphasisPlan:{coreMessage:'测试全部停顿层级',communicativeIntent:'测试',primaryStress:['庚'],secondaryStress:['甲'],deemphasized:['乙'],deliveryNotes:'层级测试',auditionStatus:'planned'},protectedTerms:[],breathGroups:pieces.map(text=>({text,intent:'完整语义'})),boundaries:pieces.map((text,i)=>{at+=text.length;return {afterChar:at,punctuation:text.at(-1),type:allTypes[i],...PAUSE_TIERS[allTypes[i]],intent:'分层',mouthBehavior:'休止'};})}]};
  setPlan(strict);assert.equal(inspectBreath({plan:planFile,expectedProfile:'segmented-v2'}).passed,true);checks++;
  for (const change of [
    p=>delete p.timingProfile,
    p=>p.turns[0].boundaries[0].maxMs=140,
    p=>p.turns[0].boundaries[1].targetMs=80,
    p=>p.turns[0].boundaries[2].type='connect',
    p=>p.turns[0].boundaries[3].minMs=180,
    p=>p.turns[0].boundaries[2].cadenceApproval=true,
  ]) {
    const bad=structuredClone(strict);change(bad);
    if (bad.turns[0].boundaries[2].cadenceApproval===true) bad.turns[0].boundaries[2].targetMs=160;
    setPlan(bad);assert.equal(inspectBreath({plan:planFile,expectedProfile:'segmented-v2'}).passed,false);checks++;
  }
  const phrase=structuredClone(strict);Object.assign(phrase.turns[0],{voiceoverText:'人工智能走进真实课堂。',displayText:'人工智能走进真实课堂。',emphasisPlan:{coreMessage:'人工智能进入真实课堂',communicativeIntent:'说明变化',primaryStress:['真实课堂'],secondaryStress:['人工智能'],deemphasized:['走进'],deliveryNotes:'对象落稳',auditionStatus:'planned'},protectedTerms:['人工智能','走进','真实课堂'],breathGroups:[{text:'人工智能',intent:'主体'},{text:'走进',intent:'完整动词'},{text:'真实课堂。',intent:'对象及收句'}],boundaries:[{afterChar:4,punctuation:'',type:'semantic',...PAUSE_TIERS.semantic,intent:'轻顿',mouthBehavior:'短休止'},{afterChar:6,punctuation:'',type:'semantic',...PAUSE_TIERS.semantic,intent:'轻顿',mouthBehavior:'短休止'},{afterChar:11,punctuation:'。',type:'sentence',...PAUSE_TIERS.sentence,intent:'收句',mouthBehavior:'休止'}]});
  setPlan(phrase);assert.equal(inspectBreath({plan:planFile,expectedProfile:'segmented-v2'}).passed,true);checks++;
  const broken=structuredClone(phrase);broken.turns[0].breathGroups=[{text:'人工智能走',intent:'错误'},{text:'进真实课堂。',intent:'错误'}];broken.turns[0].boundaries=[{...broken.turns[0].boundaries[0],afterChar:5},broken.turns[0].boundaries[2]];
  setPlan(broken);assert.equal(inspectBreath({plan:planFile,expectedProfile:'segmented-v2'}).passed,false);checks++;
  const missing=structuredClone(phrase);missing.turns[0].boundaries.splice(0,1);setPlan(missing);assert.equal(inspectBreath({plan:planFile}).passed,false);checks++;
  const tiers=Object.values(PAUSE_TIERS);for(let i=1;i<tiers.length;i++){assert.ok(tiers[i-1].maxMs<tiers[i].minMs);checks++;}
  // A technically well-formed review still fails when a measured comma uses a different tier.
  setPlan(strict);const reviewed={...structuredClone(audit),planSha256:hash(planFile),boundaries:strict.turns[0].boundaries.map(b=>({turnId:'T01',afterChar:b.afterChar,actualMs:b.targetMs,outputStartSample:0,outputEndSample:b.targetMs*24,normalSpeedPass:true}))};
  writeFileSync(reviewFile,JSON.stringify(reviewed));assert.equal(inspectBreath({plan:planFile,review:reviewFile,master,expectedProfile:'segmented-v2'}).passed,true);checks++;
  reviewed.boundaries[1].actualMs=80;reviewed.boundaries[1].outputEndSample=80*24;writeFileSync(reviewFile,JSON.stringify(reviewed));assert.equal(inspectBreath({plan:planFile,review:reviewFile,master,expectedProfile:'segmented-v2'}).passed,false);checks++;
  console.log(`Dialogue breath behavioral checks passed: ${checks}`);
} finally {rmSync(root,{recursive:true,force:true});}
