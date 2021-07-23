import { RunData } from '../nodecg/generated/lib';
import { NodeCG } from './nodecg';
import clone from 'lodash.clone';

let nodecg: NodeCG;

export const initRunDataRepository = (ncg: NodeCG) => {
  nodecg = ncg;

  // Initialize Replicants
  nodecg.Replicant('runArray', {defaultValue: []});
}

export const runDataRepository = {
  find: (id: string): RunData|null => {
    const replicant = nodecg.Replicant('runArray');
  
    if (!Array.isArray(replicant.value)) {
      return null;
    }

    return replicant.value.find(runData => runData.uuid === id) || null;
  },

  all: () => {
    const replicant = nodecg.Replicant('runArray');
  
    if (!Array.isArray(replicant.value)) {
      return [];
    }

    return clone(replicant.value);
  },

  addRunData: (...runs: Array<RunData>) => {
    const replicant = nodecg.Replicant('runArray');
  
    if (!Array.isArray(replicant.value)) {
      return;
    }
  
    const old = clone(replicant.value);
    replicant.value = old.map((oldRun) => {
      const newRun = runs.find((run) => run.uuid === oldRun.uuid);
      
      return newRun || oldRun;
    });
  },
  
  setRunData: (runs: Array<RunData>) => {
    const replicant = nodecg.Replicant('runArray');
  
    if (!Array.isArray(replicant.value)) {
      return;
    }

    replicant.value = runs;

  },
};