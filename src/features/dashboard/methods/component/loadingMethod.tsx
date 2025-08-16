export const LoadingMethods = () => {
  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
      <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
        <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
          4
        </div>
        <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
          Pilih Pembayaran
        </h2>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-muted-foreground">
            Loading payment methods...
          </div>
        </div>
      </div>
    </section>
  );
};

export const ErrorMethods = () => {
  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
      <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
        <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
          4
        </div>
        <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
          Pilih Pembayaran
        </h2>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-destructive">
            Error loading payment methods
          </div>
        </div>
      </div>
    </section>
  );
};
