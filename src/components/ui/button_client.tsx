"use client";

import { Button } from "./button";

interface ButtonClientProps {
  translation: string;
  onClick: () => void;
}

const ButtonClient = ({translation, onClick}: ButtonClientProps) => {
  return (
    <Button
      className="w-full text-sm sm:text-base hover:bg-destructive/70 cursor-pointer"
      variant={"destructive"}
      onClick={onClick}
    >
      {translation}
    </Button>
  );
};

export default ButtonClient;
