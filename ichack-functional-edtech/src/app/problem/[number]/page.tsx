"use client";
import { ListComponent } from '@/components/nodes/data/ListData';
import { CircleComponent, RectangleComponent, ShapeData, TriangleComponent } from '@/components/nodes/data/ShapeData';
import { ShapeEnum } from '@/components/nodes/Type';
import GraphCanvas from '@/components/pages/GraphCanvas';
import Banner from '@/components/pages/problems/Banner';
import BottomDragBar from '@/components/pages/problems/BottomDragBar';
import Flow from '@/components/pages/problems/Canvas';
import Layout from '@/components/pages/shared/Layout';
import React from 'react';
import { FC, JSX } from "react";

interface ProblemPageProps {
  params: { number: number }; // Define the shape of the params object
}

function getPageData(num: number): [string, string, JSX.Element] {
  num = Number(num);
  
  switch (num) {
    case 1:
      return [
        "I am just me...?",
        "We have a shape here, by connecting the output node to the visualiser you would not have changed a thing! Give it a go.",
        TriangleComponent({ size: 40, color: 'blue' }),
      ];
    
    case 2:
      return [
        "Add a Splash of Green!",
        "Try switching the color to green and see what happens. It’s a simple trick!",
        TriangleComponent({ size: 40, color: 'green' }),
      ];
    
    case 3:
      return [
        "Polygonize It!",
        "Take what you have and transform it into a polygon. A little hint: functions are your friends!",
        RectangleComponent({ size: 40, color: 'red' }),
      ];
    
    case 4:
      return [
        "Polygonize^2",
        "Got some shapes? Now create more polygons from a list of numbers. Think carefully!",
        ListComponent({
          objects: [
            new ShapeData(40, 'red', ShapeEnum.TRIANGLE),
            new ShapeData(40, 'red', ShapeEnum.RECTANGLE),
            new ShapeData(40, 'red', ShapeEnum.CIRCLE),
          ]
        }),
      ];
    
    case 5:
      return [
        "Pick a Shape, Any Shape!",
        "You’ve got a list of shapes. Pick one to display. Which will it be?",
        CircleComponent({ size: 40, color: 'green' }),
      ];
    
    case 6:
      return [
        "Sum and Divide for a Polygon",
        "Here’s a challenge: Sum the numbers, divide, and see what shape pops up. What do you think it’ll be?",
        TriangleComponent({ size: 40, color: 'blue' }),
      ];
    

    default:
      return [
        "Unknown Configuration",
        `No recognized start configuration for '${num}'.`,
        <div className="text-red-500">⚠️ Error: Invalid Input</div>,
      ];
  }
}

const ProblemPage: FC<ProblemPageProps> = ({ params }) => {
  const unwrappedParams = React.use(params); // Unwrap the Promise

  if (!unwrappedParams) return <div>Loading...</div>; // Loading state if `params` is not yet available

  const { number } = unwrappedParams; // Extract the dynamic 'number' from the URL
  var [title, description, comp] = getPageData(number);

  return (
    <Layout>
      <GraphCanvas />

      <div className="w-full bg-gray-50 flex flex-row justify-center py-12 px-6 h-screen overflow-hidden">
        {/* Main Content Section */}
        <main className="flex-1 max-w-6xl bg-white rounded-lg shadow-lg p-8 space-y-8 mx-6 h-full overflow-y-auto overflow-x-hidden">
          {/* Banner Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md opacity-100">
            <Banner title={title} description={description} smallBoxComponent={comp} />
          </div>

          {/* Canvas/Flow Section */}
          <div className="w-full">
            <Flow number={number} />
          </div>
        </main>

        {/* Sidebar Section */}
        <aside className="w-72 bg-gray-200 p-4 h-full sticky top-0 flex flex-col">
          <BottomDragBar />
        </aside>
      </div>
    </Layout>
  );
};



export default ProblemPage;
