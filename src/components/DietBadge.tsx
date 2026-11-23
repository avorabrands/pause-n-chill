export function DietBadge({ veg, showLabel = false }: { veg: boolean; showLabel?: boolean }) {
  const label = veg ? 'Vegetarian' : 'Non-vegetarian';
  return (
    <span className={`diet ${veg ? 'diet--veg' : 'diet--nonveg'}`} title={label}>
      <span className="diet__box" aria-hidden="true">
        <span className="diet__dot" />
      </span>
      {showLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
    </span>
  );
}
