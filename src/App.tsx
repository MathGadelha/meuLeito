import { router } from "@router/main.routes";
import { useEffect } from "react";
import "react-chat-elements/dist/main.css";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { ContextProviders } from "./shared/context/main.context";

function App() {

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) //only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) //Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); //Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <>
      <ContextProviders>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </ContextProviders>
    </>
  )
}

export default App
