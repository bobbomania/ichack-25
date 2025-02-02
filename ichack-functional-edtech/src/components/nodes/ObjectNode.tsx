"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { TypeEnum } from "./Type";
import DataObject from "./data/DataObject";

export abstract class ObjectNode {
  protected inputTypes: [TypeEnum, ObjectNode | null][];
  protected outputTypes: TypeEnum[];
  protected setComponentData!: (data: ReactNode) => void;
  protected currentComponentData!: ReactNode;

  constructor(componentData: ReactNode, inputTypes: TypeEnum[], outputTypes: TypeEnum[]) {
    this.currentComponentData = componentData;
    this.inputTypes = inputTypes.map((type) => [type, null]);
    this.outputTypes = outputTypes;
  }

  // Attach setState from functional component to the class
  attachSetState(setStateFn: (data: ReactNode) => void) {
    this.setComponentData = setStateFn;
  }

  updateComponentData(newData: ReactNode): void {
    this.currentComponentData = newData;
    if (this.setComponentData) {
      this.setComponentData(newData);
    }
  }

  render(): ReactNode {
    return this.currentComponentData;
  }

  canConnectToInput(type: TypeEnum, index: number): boolean {
    return index >= 0 && index < this.inputTypes.length && this.inputTypes[index][1] == null && (this.inputTypes[index][0] == TypeEnum.ANY || this.inputTypes[index][0] == type) ;
  }

  connectInput(obj: ObjectNode, index: number): void {
    this.inputTypes[index][1] = obj;
  }

  removeInputAtIndex(index: number): void {
    this.inputTypes[index][1] = null;
  }

  getInputTypes(): [TypeEnum, any][] {
    return this.inputTypes;
  }

  getOutputTypes(): TypeEnum[] {
    return this.outputTypes;
  }

  run(): DataObject[] {
    const evalInputs: DataObject[][] = [];

    for (let i = 0; i < this.inputTypes.length; i++) {
      
      const currObj = this.inputTypes[i][1];
      if (currObj != null) {
        evalInputs.push(currObj.run());
      }
    }

    const outputs = this.logic(evalInputs);

    return outputs;
  }

  abstract logic(inputs: DataObject[][]): DataObject[];
}

// Functional Wrapper Component
export const ObjectNodeWrapper = ({
  nodeInstance,
}: {
  nodeInstance: ObjectNode;
}) => {
  const [componentData, setComponentData] = useState<ReactNode>(
    nodeInstance.render()
  );

  // Attach setState handler to the class instance
  useEffect(() => {
    nodeInstance.attachSetState(setComponentData);
  }, [nodeInstance]);

  return <>{componentData}</>;
};

export default ObjectNode;
