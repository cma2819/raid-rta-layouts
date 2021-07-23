import { RunData } from '../nodecg/generated/lib';
import { NodeCG } from './nodecg';

let nodecg: NodeCG;

export const initSurroundRunIndex = (ncg: NodeCG) => {
  nodecg = ncg;

  nodecg.Replicant('surroundRunIndex', {defaultValue: {
    prev: null,
    current: null,
    next: null,
  }});

  const runArrayReplicant = nodecg.Replicant('runArray');
  if (runArrayReplicant.value) {
    surroundRunIndex.initializeRunData(runArrayReplicant.value);
  }
}

export const surroundRunIndex = {

  initializeRunData: (runDataArray: Array<RunData>) => {
    const replicant = nodecg.Replicant('surroundRunIndex');
    if (!replicant.value) {
      return;
    }

    const current = replicant.value.current;
    if (!current) {
      replicant.value = {
        prev: null,
        current: runDataArray[0]?.uuid || null,
        next: runDataArray[1]?.uuid || null,
      };
    } else {
      const currentIndex = runDataArray.findIndex(runData => runData.uuid === current);

      replicant.value = {
        prev: runDataArray[currentIndex - 1]?.uuid || null,
        current: current,
        next: runDataArray[currentIndex + 1]?.uuid || null,
      };
    }
  },

  updateCurrentTo: (runId: string, runDataArray: Array<RunData>) => {
    const replicant = nodecg.Replicant('surroundRunIndex');
    if (!replicant.value) {
      return;
    }

    const currentIndex = runDataArray.findIndex(runData => runData.uuid === runId);
    if (currentIndex < 0) {
      throw new Error('Received run uuid is not found.');
    }

    replicant.value = {
      prev: runDataArray[currentIndex - 1]?.uuid || null,
      current: runId,
      next: runDataArray[currentIndex + 1]?.uuid || null,
    };
  }
}