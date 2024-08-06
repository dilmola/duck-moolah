export function SkeletonLoaderCard() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="bg-black/20 animate-pulse rounded-lg shadow-md h-64"
          ></div>
        ))}
      </div>
    </div>
  );
}
