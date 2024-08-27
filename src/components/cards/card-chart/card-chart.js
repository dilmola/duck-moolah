export default function CardChart({ title, percentage }) {
  return (
    <div className="rounded-lg p-6 border border-white/10 w-full">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-white font-bold text-4xl">{percentage} %</p>
    </div>
  );
}
