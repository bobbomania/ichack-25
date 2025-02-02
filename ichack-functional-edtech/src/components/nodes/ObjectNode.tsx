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

  canConnectToInput(types: TypeEnum[]): TypeEnum | null {
    for (let i = 0; i < this.inputTypes.length; i++) {
      const currInput = this.inputTypes[i];
      for (let j = 0; j < types.length; j++) {
        if (currInput[1] == null && (currInput[0] === types[j] || currInput[0] === TypeEnum.ANY)) {
          return types[j];
        }
      }
    }
    return null;
  }

  connectInput(type: TypeEnum, obj: ObjectNode): void {
    for (let i = 0; i < this.inputTypes.length; i++) {
      if (this.inputTypes[i][0] === type || this.inputTypes[i][0] === TypeEnum.ANY) {
        this.inputTypes[i][1] = obj;
        return;
      }
    }
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
