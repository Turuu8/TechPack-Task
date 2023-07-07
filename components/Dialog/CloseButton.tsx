import Image from "next/image";

export const CloseButton = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <button className="absolute -top-4 -right-4 z-10 bg-white rounded-full" type="button" onClick={closeModal}>
      <Image alt="icon" src="/assets/icons/close.svg" width={40} height={40} className="object-contain h-[40px] w-[40px]" />
    </button>
  );
};
