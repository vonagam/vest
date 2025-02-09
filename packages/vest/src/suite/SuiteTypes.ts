import { CB } from 'vest-utils';

import {
  SuiteResult,
  SuiteRunResult,
  TFieldName,
  TGroupName,
} from 'SuiteResultTypes';
import { TTypedMethods } from 'getTypedMethods';
import { SuiteSelectors } from 'suiteSelectors';

export type Suite<
  F extends TFieldName,
  G extends TGroupName,
  T extends CB = CB
> = ((...args: Parameters<T>) => SuiteRunResult<F, G>) & SuiteMethods<F, G>;

export type SuiteMethods<F extends TFieldName, G extends TGroupName> = {
  get: CB<SuiteResult<F, G>>;
  reset: CB<void>;
  remove: CB<void, [fieldName: F]>;
  resetField: CB<void, [fieldName: F]>;
} & TTypedMethods<F, G> &
  SuiteSelectors<F, G>;
