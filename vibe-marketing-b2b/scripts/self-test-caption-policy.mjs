import assert from 'node:assert/strict';
import {inspectCaptionPolicy} from './caption-policy.mjs';
const valid={textRules:{captionPolicy:'single-line-semantic-v1',maxCaptionLines:1},captions:[{id:'C01',text:'人工智能走进真实课堂。'}],layoutChecks:[{source:'captions',maxLines:1}]};
assert.equal(inspectCaptionPolicy(valid).passed,true);
for(const mutate of [x=>x.textRules.maxCaptionLines=2,x=>x.captions[0].text='人工智能走进\n真实课堂。',x=>x.layoutChecks=[],x=>x.layoutChecks[0].maxLines=2]){const bad=structuredClone(valid);mutate(bad);assert.equal(inspectCaptionPolicy(bad).passed,false);}
console.log('Caption policy behavioral checks passed: 5');
