import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRoom } from "@/contexts/RoomContext";
import { SlideContainer } from "@/components/SlideContainer";

const Index = () => {
  const { room, createRoom } = useRoom();
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!room && !creating) {
      setCreating(true);
      createRoom().catch((e) => console.error(e));
    }
  }, [room, creating, createRoom]);

  if (!room) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-laranja" />
          <p className="eyebrow">criando sala…</p>
        </div>
      </div>
    );
  }

  return <SlideContainer />;
};

export default Index;
