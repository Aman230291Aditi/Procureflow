import { Suspense } from "react";
import CreatePRContent from "./CreatePRContent"
export default function CreatePRPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePRContent />
    </Suspense>
  );
}
