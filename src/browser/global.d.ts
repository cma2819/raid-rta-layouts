import { CreateNodecgInstance, CreateNodecgConstructor } from 'ts-nodecg/browser';
import { Configschema } from '../nodecg/generated/configschema';
import { MessageMap } from '../nodecg/messages';
import { ReplicantMap } from '../nodecg/replicants';

declare global {
  const nodecg: CreateNodecgInstance<
    'raid-rta-layouts',
    Configschema,
    ReplicantMap,
    MessageMap
  >;

  const NodeCG: CreateNodecgConstructor<
    'raid-rta-layouts',
    Configschema,
    ReplicantMap,
    MessageMap
  >;
}