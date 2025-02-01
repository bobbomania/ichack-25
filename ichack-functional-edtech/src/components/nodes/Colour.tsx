class Colour extends Function {
    newColor: string;
  
    constructor(props: { inputData?: any[]; newColor: string }) {
      super(props);
      this.newColor = props.newColor;
    }
  
    // Logic method that changes the color of shape objects
    logic(inputs: any[]): any[] {
      return inputs.map((shape) => ({
        ...shape,
        color: this.newColor, // Update the color property
      }));
    }
  }
  