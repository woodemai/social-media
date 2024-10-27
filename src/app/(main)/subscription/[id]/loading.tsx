import { Loader2 } from "lucide-react";

const Loading = () => (
  <div className="relative bg-black/30">
    <Loader2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white" />
  </div>
);

export default Loading;
