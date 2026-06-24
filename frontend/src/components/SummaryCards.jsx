function SummaryCards({ summary }) {

  return (
    <div className="grid md:grid-cols-3 gap-5">

      <div className="bg-zinc-900 rounded-3xl p-6">
        <h3>Total Trees</h3>
        <p className="text-3xl mt-3">
          {summary.total_trees}
        </p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6">
        <h3>Total Cycles</h3>
        <p className="text-3xl mt-3">
          {summary.total_cycles}
        </p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-6">
        <h3>Largest Root</h3>
        <p className="text-3xl mt-3">
          {summary.largest_tree_root}
        </p>
      </div>

    </div>
  );
}

export default SummaryCards;