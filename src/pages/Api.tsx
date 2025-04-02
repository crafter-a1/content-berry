
import { MainLayout } from '@/components/layout/MainLayout';

export default function Api() {
  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6">API</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-gray-500">API management interface will be implemented here.</p>
        </div>
      </div>
    </MainLayout>
  );
}
