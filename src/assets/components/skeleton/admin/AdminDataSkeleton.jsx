export const AdminDataSkeleton = ({ tdCount }) => {
  const tdElements = [];

  for (let i = 0; i < tdCount; i++) {
    tdElements.push(
      <td key={i} className="py-3 pr-4">
        <div className="h-5 w-full rounded bg-slate-100"></div>
      </td>,
    );
  }

  return <>{tdElements}</>;
};
