/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace Contract {
  export type IndexedTaskStruct = {
    id: PromiseOrValue<BigNumberish>;
    text: PromiseOrValue<string>;
    count: PromiseOrValue<BigNumberish>;
  };

  export type IndexedTaskStructOutput = [number, string, number] & {
    id: number;
    text: string;
    count: number;
  };
}

export interface ContractInterface extends utils.Interface {
  functions: {
    "addTask(string)": FunctionFragment;
    "getTasks(address)": FunctionFragment;
    "incrementTask(uint32)": FunctionFragment;
    "removeTask(uint32)": FunctionFragment;
    "tasks(address,uint32)": FunctionFragment;
    "userTotalTasks(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addTask"
      | "getTasks"
      | "incrementTask"
      | "removeTask"
      | "tasks"
      | "userTotalTasks"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addTask",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTasks",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "incrementTask",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeTask",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "tasks",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "userTotalTasks",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "addTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getTasks", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "incrementTask",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "removeTask", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tasks", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "userTotalTasks",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Contract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addTask(
      _text: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getTasks(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[Contract.IndexedTaskStructOutput[]]>;

    incrementTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tasks(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, number] & { text: string; count: number }>;

    userTotalTasks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;
  };

  addTask(
    _text: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getTasks(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<Contract.IndexedTaskStructOutput[]>;

  incrementTask(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeTask(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tasks(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string, number] & { text: string; count: number }>;

  userTotalTasks(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  callStatic: {
    addTask(
      _text: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getTasks(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<Contract.IndexedTaskStructOutput[]>;

    incrementTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    tasks(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, number] & { text: string; count: number }>;

    userTotalTasks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {};

  estimateGas: {
    addTask(
      _text: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getTasks(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    incrementTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tasks(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    userTotalTasks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addTask(
      _text: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getTasks(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    incrementTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeTask(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tasks(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    userTotalTasks(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
