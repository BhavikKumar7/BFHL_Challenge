import { useState } from "react";
import TreeGraph from "./TreeGraph";

function HierarchyCard({ hierarchy }) {
    const [view, setView] = useState("json");

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 shadow-xl">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-5">

                <div>
                    <h2 className="text-3xl font-bold text-white">
                        Root : {hierarchy.root}
                    </h2>

                    {hierarchy.depth && (
                        <p className="text-zinc-400 mt-3 text-lg">
                            Depth : {hierarchy.depth}
                        </p>
                    )}

                    {hierarchy.has_cycle && (
                        <div className="mt-4 inline-flex items-center px-4 py-2 rounded-xl bg-red-900/40 border border-red-700 text-red-400">
                            Cycle Detected
                        </div>
                    )}
                </div>

                {/* Toggle Buttons */}
                {!hierarchy.has_cycle && (
                    <div className="flex gap-3">

                        <button
                            onClick={() => setView("json")}
                            className={`px-5 py-2 rounded-xl transition-all duration-200
                ${view === "json"
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                }`}
                        >
                            JSON
                        </button>

                        <button
                            onClick={() => setView("graph")}
                            className={`px-5 py-2 rounded-xl transition-all duration-200
                ${view === "graph"
                                    ? "bg-blue-600 text-white"
                                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                }`}
                        >
                            Graph
                        </button>

                    </div>
                )}
            </div>

            {/* Body */}
            {/* Body */}
            <div className="mt-7">
                {hierarchy.has_cycle ? (
                    <>
                        <div className="mb-5 p-4 rounded-2xl bg-red-900/20 border border-red-700 text-red-400">
                            Cycle detected. Graph view is unavailable, but the hierarchy JSON is shown below.
                        </div>

                        <pre
                            className="
          bg-black
          text-green-400
          rounded-2xl
          p-6
          overflow-auto
          border
          border-zinc-800
          text-sm
        "
                        >
                            {JSON.stringify(hierarchy.tree, null, 2)}
                        </pre>
                    </>
                ) : (
                    <>
                        {view === "json" ? (
                            <pre
                                className="
            bg-black
            text-green-400
            rounded-2xl
            p-6
            overflow-auto
            border
            border-zinc-800
            text-sm
          "
                            >
                                {JSON.stringify(hierarchy.tree, null, 2)}
                            </pre>
                        ) : (
                            <div
                                className="
            h-[500px]
            bg-black
            rounded-2xl
            border border-zinc-800
            overflow-hidden
          "
                            >
                                <TreeGraph tree={hierarchy.tree} />
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
}

export default HierarchyCard;