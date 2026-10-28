#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

const hash = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

export const PAUSE_TIERS = Object.freeze({
  semantic: {targetMs:40, minMs:30, maxMs:50},
  enumeration: {targetMs:80, minMs:70, maxMs:90},
  connect: {targetMs:160, minMs:140, maxMs:180},
  explain: {targetMs:240, minMs:220, maxMs:260},
  clause: {targetMs:320, minMs:300, maxMs:340},
  sentence: {targetMs:400, minMs:370, maxMs:430},
});
const typeFor = p => p === '' ? 'semantic' : /[、]/.test(p) ? 'enumeration' : /[，,]/.test(p) ? 'connect' : /[：:]/.test(p) ? 'explain' : /[；;]/.test(p) ? 'clause' : /[。？！.!?]/.test(p) ? 'sentence' : undefined;
const approvalEvidence = a => typeof a === 'string' ? a.trim().length > 0 : Boolean(a && typeof a.evidence === 'string' && a.evidence.trim());

export function inspectBreath({plan, review, master, expectedProfile}) {
  const errors = [];
  const check = (condition, error) => { if (!condition) errors.push(error); };
  try {
    const data = JSON.parse(readFileSync(plan, 'utf8'));
    check(data.schemaVersion === 1, 'plan schemaVersion must be 1');
    const strict = data.timingProfile === 'segmented-v2';
    check(!data.timingProfile || strict, 'unknown timing profile');
    if (expectedProfile) check(data.timingProfile === expectedProfile, 'required timing profile missing/mismatched');
    check(Array.isArray(data.turns) && data.turns.length > 0, 'plan needs turns');
    const ids = new Set();
    const planned = [];
    for (const turn of data.turns ?? []) {
      check(Boolean(turn.id) && !ids.has(turn.id), `duplicate/missing turn ${turn.id}`);
      ids.add(turn.id);
      check(Boolean(turn.role && turn.voice), `${turn.id}: missing speaker or voice`);
      if (data.voiceBindings?.[turn.role]) check(data.voiceBindings[turn.role] === turn.voice || Boolean(turn.voiceChangeApproval), `${turn.id}: unapproved voice`);
      check(Boolean(turn.displayText && turn.voiceoverText), `${turn.id}: missing dialogue`);
      const emphasis = turn.emphasisPlan;
      check(Boolean(emphasis && emphasis.coreMessage && emphasis.communicativeIntent && emphasis.deliveryNotes), `${turn.id}: missing emphasis analysis`);
      check(Array.isArray(emphasis?.primaryStress) && emphasis.primaryStress.length > 0, `${turn.id}: primary stress missing`);
      check(Array.isArray(emphasis?.secondaryStress) && Array.isArray(emphasis?.deemphasized), `${turn.id}: secondary/de-emphasized plan missing`);
      check(['planned','auditioned','approved','rejected'].includes(emphasis?.auditionStatus), `${turn.id}: invalid emphasis audition status`);
      const primary = emphasis?.primaryStress ?? [];
      const secondary = emphasis?.secondaryStress ?? [];
      const deemphasized = emphasis?.deemphasized ?? [];
      check([...primary, ...secondary, ...deemphasized].every(x => typeof x === 'string' && x.length > 0 && turn.voiceoverText.includes(x)), `${turn.id}: emphasis phrase not found in voiceover text`);
      check(primary.every(x => !secondary.includes(x)), `${turn.id}: phrase cannot be both primary and secondary stress`);
      check((turn.breathGroups ?? []).map(x => x.text).join('') === turn.voiceoverText, `${turn.id}: groups change dialogue`);
      check((turn.breathGroups ?? []).every(x => x.intent && x.text), `${turn.id}: missing group intent`);
      check(Array.isArray(turn.protectedTerms), `${turn.id}: missing protected terms`);
      const expected = [...turn.voiceoverText.matchAll(/[，、：；。？！,.:;!?]/g)].map(m => m.index + 1);
      const positions = new Set();
      const groupEnds = [];
      let groupEnd = 0;
      for (const group of turn.breathGroups ?? []) {groupEnd += group.text?.length ?? 0; groupEnds.push(groupEnd);}
      const semanticEnds = groupEnds.slice(0, -1).filter(at => !expected.includes(at));
      for (const b of turn.boundaries ?? []) {
        const key = `${turn.id}:${b.afterChar}`;
        planned.push(key);
        check(Number.isInteger(b.afterChar) && (expected.includes(b.afterChar) || strict && semanticEnds.includes(b.afterChar) && b.punctuation === '') && !positions.has(b.afterChar), `${key}: invalid/duplicate position`);
        positions.add(b.afterChar);
        check(b.punctuation === '' ? strict && semanticEnds.includes(b.afterChar) : turn.voiceoverText[b.afterChar - 1] === b.punctuation, `${key}: punctuation mismatch`);
        check((strict ? [...Object.keys(PAUSE_TIERS),'rhetorical'] : ['connect','enumeration','sentence','rhetorical']).includes(b.type), `${key}: invalid type`);
        check(b.intent && b.mouthBehavior, `${key}: missing performance intent`);
        check(Number.isFinite(b.minMs) && Number.isFinite(b.maxMs) && Number.isFinite(b.targetMs) && b.minMs >= 0 && b.minMs <= b.targetMs && b.targetMs <= b.maxMs, `${key}: invalid pause range`);
        if (strict) {
          const natural = typeFor(b.punctuation);
          const override = approvalEvidence(b.cadenceApproval);
          check(Boolean(natural), `${key}: unsupported punctuation`);
          if (override) {
            check(b.type === natural || b.type === 'rhetorical', `${key}: approved exception has wrong type`);
          } else {
            check(b.type === natural, `${key}: punctuation requires ${natural} tier`);
            const tier = PAUSE_TIERS[natural];
            check(tier && b.targetMs === tier.targetMs && b.minMs >= tier.minMs && b.maxMs <= tier.maxMs, `${key}: pause outside non-overlapping tier`);
          }
        } else if (/[。？！.!?]/.test(b.punctuation)) {
          check(b.type === 'sentence', `${key}: terminal needs sentence type`);
          check(b.targetMs === 400 && b.minMs >= 370 && b.maxMs <= 430 || Boolean(b.cadenceApproval), `${key}: unapproved sentence cadence`);
        }
        for (const term of turn.protectedTerms ?? []) {
          for (let at = turn.voiceoverText.indexOf(term); at >= 0; at = turn.voiceoverText.indexOf(term, at + 1)) {
            check(!(b.afterChar > at && b.afterChar < at + term.length), `${key}: splits protected term ${term}`);
          }
        }
      }
      if (strict) check(semanticEnds.every(at => positions.has(at)), `${turn.id}: semantic-group boundary missing`);
      check(expected.every(at => positions.has(at)), `${turn.id}: punctuation boundary missing`);
      check(turn.handoff && typeof turn.handoff.nextRole === 'string' && turn.handoff.intent && turn.handoff.reuseTerminalPause === true, `${turn.id}: missing/non-shared handoff`);
    }
    if (review || master) {
      check(Boolean(review && master), 'review and master must be provided together');
      if (review && master) {
        const audit = JSON.parse(readFileSync(review, 'utf8'));
        check(audit.planSha256 === hash(plan), 'breath plan checksum drift');
        check(audit.masterSha256 === hash(master), 'breath master checksum drift');
        check(audit.status === 'frozen', 'audio is not a frozen master');
        check(audit.normalSpeedListeningPassed === true && Boolean(audit.reviewer), 'normal-speed listening approval missing');
        check(audit.voicedSamplesUnchanged === true && audit.silenceOnlyEdits === true, 'voiced audio changed');
        check(Number.isInteger(audit.sampleRate) && audit.sampleRate > 0, 'measured sample rate missing');
        check(Array.isArray(audit.unresolvedUnexpectedPauses) && audit.unresolvedUnexpectedPauses.length === 0, 'unexpected pauses unresolved');
        const measured = new Map((audit.boundaries ?? []).map(b => [`${b.turnId}:${b.afterChar}`, b]));
        check(measured.size === planned.length, 'measured boundary count mismatch');
        for (const t of data.turns ?? []) for (const b of t.boundaries ?? []) {
          const key = `${t.id}:${b.afterChar}`;
          const m = measured.get(key);
          check(m && Number.isFinite(m.actualMs) && m.actualMs >= b.minMs && m.actualMs <= b.maxMs && m.normalSpeedPass === true, `${key}: measured/listened pause failed`);
          check(m && Number.isInteger(m.outputStartSample) && Number.isInteger(m.outputEndSample) && m.outputEndSample >= m.outputStartSample, `${key}: missing sample interval`);
          check(m && Math.abs((m.outputEndSample - m.outputStartSample) / audit.sampleRate * 1000 - m.actualMs) < 1, `${key}: reported pause disagrees with sample interval`);
        }
      }
    }
  } catch (error) { errors.push(error.message); }
  return {passed: errors.length === 0, errors};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const value = (flag) => args[args.indexOf(flag) + 1];
  if (!args.includes('--plan')) { console.error('Usage: validate-dialogue-breath.mjs --plan file [--profile segmented-v2] [--review file --master wav]'); process.exit(2); }
  const result = inspectBreath({plan: value('--plan'), review: args.includes('--review') ? value('--review') : undefined, master: args.includes('--master') ? value('--master') : undefined, expectedProfile: args.includes('--profile') ? value('--profile') : undefined});
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.passed ? 0 : 1;
}
