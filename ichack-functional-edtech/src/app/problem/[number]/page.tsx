import Banner from '@/components/pages/problems/Banner';
import Flow from '@/components/pages/problems/Canvas';
import Layout from '@/components/pages/shared/Layout';
import { FC } from "react";

interface ProblemPageProps {
  params: { number: number }; // Define the shape of the params object
}

const ProblemPage: FC<ProblemPageProps> = ({ params }) => {
  const { number } = params; // Extract the dynamic 'number' from the URL

  return (
    <Layout>
      <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-12 px-6">
        {/* Main content with vertical spacing below the navbar */}
        <main className="w-full bg-white rounded-lg shadow-lg p-8 space-y-8 mt-16"> {/* Added mt-16 for vertical space */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Problem {number}</h2>
            <p className="text-xl text-gray-600">
              This is a coding problem designed to test your skills and logic.
            </p>
          </div>

          {/* Banner Section */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <Banner description="Solve this problem please!." />
          </div>

          <div>
            <Flow />
          </div>
        
        </main>
      </div>
    </Layout>
  );
};

export default ProblemPage;
