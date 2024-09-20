import React from "react";

interface OpenerProps {
  renderOpener: (props: { open: () => void }) => React.ReactNode;
  renderContent: (props: { close: () => void }) => React.ReactNode;
}

function Opener({ renderOpener, renderContent }: OpenerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {renderOpener({ open: () => setIsOpen(true) })}
      {isOpen && renderContent({ close: () => setIsOpen(false) })}
    </>
  );
}

export default Opener;
