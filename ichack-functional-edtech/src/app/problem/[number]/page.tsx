import { ShapeData, TriangleComponent } from '@/components/nodes/data/ShapeData';
import { ShapeEnum } from '@/components/nodes/Type';
import GraphCanvas from '@/components/pages/GraphCanvas';
import Banner from '@/components/pages/problems/Banner';
import BottomDragBar from '@/components/pages/problems/BottomDragBar';
import Flow from '@/components/pages/problems/Canvas';
import Layout from '@/components/pages/shared/Layout';
import { FC, JSX } from "react";

interface ProblemPageProps {
  params: { number: number }; // Define the shape of the params object
}

function getPageData(num: number): [string, string, JSX.Element] {
  num = Number(num);
  
  switch (num) {
    case 1:
      return [
        "Hello... Wait.. Colour?",
        "Hi there! Change the triangle from blue to red to get through to the next level!",
        TriangleComponent({ size: 40, color: 'red' }),
      ];

    case 2:
      return [
        "Red Circles",
        "Three red circles of size 10.",
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-red-500 rounded-full"></div>
          ))}
        </div>,
      ];

    case 3:
      return [
        "Mixed Shapes",
        "A small triangle and a number.",
        <div className="flex gap-2">
          <div className="w-5 h-5 bg-blue-500 clip-triangle"></div>
          <span className="text-lg font-bold">3</span>
        </div>,
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
  const { number } = params; // Extract the dynamic 'number' from the URL
  var [title, description, comp] = getPageData(number);
  return (
    <Layout>
      <GraphCanvas />

      <div className="min-h-screen w-full bg-gray-50 flex flex-row justify-center py-12 px-6">
        {/* Main Content Section */}
        <main className="flex-1 max-w-6xl bg-white rounded-lg shadow-lg p-8 space-y-8 mx-6 h-full">
          {/* Banner Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md opacity-100"> {/* Set opacity to 100 */}
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
