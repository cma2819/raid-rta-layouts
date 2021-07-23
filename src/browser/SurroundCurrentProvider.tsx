import clone from 'lodash.clone';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useContext } from 'react';
import { RunData } from '../nodecg/generated/lib';
import { RunArray, SurroundRunIndex } from '../nodecg/replicants';
import { ReplicantContext } from './ReplicantProvider';

interface SurroundCurrent {
  prev: RunData|null;
  current: RunData|null;
  next: RunData|null;
}

const defaultValues: SurroundCurrent = {
  prev: null,
  current: null,
  next: null,
};

type Props = {
  children: ReactNode;
}

export const SurroundCurrentContext = createContext<SurroundCurrent>(defaultValues);

export const SurroundCurrentProvider = ({ children }: Props) => {

  const replicant = useContext(ReplicantContext);
  const currentSurround = replicant.surroundRunIndex;
  const runDataArray = replicant.runArray;

  const [ prev, setPrev ] = useState<RunData|null>(defaultValues.prev);
  const [ current, setCurrent ] = useState<RunData|null>(defaultValues.current);
  const [ next, setNext ] = useState<RunData|null>(defaultValues.next);

  useEffect(() => {
    setPrev(runDataArray.find(run => run.uuid === currentSurround.prev) || null);
    setCurrent(runDataArray.find(run => run.uuid === currentSurround.current) || null);
    setNext(runDataArray.find(run => run.uuid === currentSurround.next) || null);
  }, [currentSurround, runDataArray]);

  return (
    <SurroundCurrentContext.Provider value={{
      prev,
      current,
      next,
    }}>
      { children }
    </SurroundCurrentContext.Provider>
  )
}