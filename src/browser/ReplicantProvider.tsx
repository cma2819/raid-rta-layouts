import clone from 'lodash.clone';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { RunArray, SurroundRunIndex } from '../nodecg/replicants';

interface Replicants {
  runArray: RunArray;
  surroundRunIndex: SurroundRunIndex;
}

const defaultValues: Replicants = {
  runArray: [],
  surroundRunIndex: {
    prev: null,
    current: null,
    next: null,
  }
};

export const ReplicantContext = createContext<Replicants>(defaultValues);

type Props = {
  children: ReactNode;
}

export const ReplicantProvider = ({ children }: Props) => {

  const [ runArray, setRunArray ] = useState<RunArray>(defaultValues.runArray);
  const [ surroundRunIndex, setSurroundRunIndex ] = useState<SurroundRunIndex>(defaultValues.surroundRunIndex);

  useEffect(() => {  
    const mutations: Array<[ keyof Replicants, React.Dispatch<any> ]> = [
      [ 'runArray', setRunArray ],
      [ 'surroundRunIndex', setSurroundRunIndex],
    ];

    mutations.forEach(([name, mutator]) => {
      const replicant = nodecg.Replicant(name);

      replicant.on('change', (newVal) => {
        mutator(clone(newVal));
      });
    });
  }, []);

  return (
    <ReplicantContext.Provider value={{
      runArray,
      surroundRunIndex
    }}>
      { children }
    </ReplicantContext.Provider>
  )
}