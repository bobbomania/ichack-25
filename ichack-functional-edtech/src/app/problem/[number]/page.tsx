import { ShapeData } from '@/components/nodes/data/ShapeData';
import { ShapeEnum } from '@/components/nodes/Type';
import Banner from '@/components/pages/problems/Banner';
import Flow from '@/components/pages/problems/Canvas';
import Layout from '@/components/pages/shared/Layout';
import { FC } from "react";

interface ProblemPageProps {
  params: { number: number }; // Define the shape of the params object
}

function getPageData(num: number): [string, string, JSX.Element] {
  num = Number(num);
  
  switch (num) {
    case 1:
      return [
        "Natural Numbers List",
        "A sequence of natural numbers starting from 1.",
        <div className="p-4 border rounded bg-gray-50">
          {JSON.stringify([1, 2, 3])}
        </div>,
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
  var [title, description, comp] = getPageData(number)
  return (
    <Layout>
      <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center py-12 px-6">
        {/* Main content with vertical spacing below the navbar */}
        <main className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8 space-y-8 mt-16"> {/* Added mt-16 for vertical space */}
          {/* Banner Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <Banner title={title} description={description} smallBoxComponent={comp}/>
          </div>

          {/* Canvas/Flow Section */}
          <div className="w-full">
            <Flow number={number}/>
          </div>
        
        </main>
      </div>
    </Layout>
  );
};

export default ProblemPage;
