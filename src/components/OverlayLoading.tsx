import { Spinner } from "@/components/ui/spinner";

interface OverlayLoadingProps {
  isLoading: boolean;
}

export default function OverlayLoading({ isLoading }: OverlayLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <Spinner className="w-12 h-12 mb-4" />
        <span className="text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
}
