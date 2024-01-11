const CenterContentCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-lg bg-white rounded-xl px-5 sm:px-10 py-7 flex flex-col gap-4 w-full shadow-lg">
      {children}
    </div>
  );
};

export default CenterContentCard;
