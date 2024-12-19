"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

export default function RotatingCircle() {
  const [rotate, setRotate] = useState(0);
  useInterval(
    () =>
      setRotate((r) => {
        r += 10;
        return r >= 360 ? 0 : r;
      }),
    50,
  );

  return <LoaderCircle transform={`rotate(${rotate})`} />;
}
