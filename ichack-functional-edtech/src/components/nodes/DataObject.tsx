import React, { ReactNode } from 'react';
import ObjectNode from './ObjectNode';
import { Type } from './Type';

// Define the types for inputs and outputs
type InputOutputType = typeof Type;

abstract class DataObject extends ObjectNode {
  constructor(
    protected component: ReactNode,
    outputTypes: InputOutputType[]
  ) {
    // Call the parent class constructor (ObjectNode)
    super(component, [], outputTypes);
  }

}

export default DataObject;
