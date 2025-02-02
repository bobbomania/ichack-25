import React from 'react';
import ObjectNode from '../ObjectNode';
import { TypeEnum } from '../Type';

const makeReactComponent = ( name: string ) => {return ( <div><p> {name}  </p></div>
)};


abstract class FunctionNode extends ObjectNode {
  constructor(
    functionName: string,
    inputTypes: TypeEnum[],
    outputTypes: TypeEnum[]
  ) {
    // Call the parent class constructor (ObjectNode)
    super(makeReactComponent(functionName), inputTypes, outputTypes);
  }

}

export default FunctionNode;
