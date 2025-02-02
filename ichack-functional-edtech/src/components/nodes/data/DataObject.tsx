import React, { ReactNode } from 'react';
import ObjectNode from '../ObjectNode';
import { TypeEnum } from '../Type';


abstract class DataObject extends ObjectNode {
  constructor(
    public component: ReactNode,
    public outputTypes: TypeEnum[],
  ) {
    // Call the parent class constructor (ObjectNode)
    super(component, [], outputTypes);
  }

}

export default DataObject;
