import { useState } from "react";

function InputSection({ onSubmit, loading }) {

  const sampleData = `A->B
A->C
B->D
C->E
E->F
X->Y
Y->Z
Z->X
P->Q
Q->R
G->H
G->H
G->I
hello
1->2
A->`;

  const [text, setText] = useState("");

  const handleSubmit = () => {

    const arr = text
      .split("\n")
      .map(item => item.trim());

    onSubmit(arr);
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">
          Graph Input
        </h2>

        <span className="text-zinc-400 text-sm">
          One edge per line
        </span>
      </div>

      <textarea
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="
          w-full
          bg-black
          border border-zinc-700
          rounded-2xl
          p-5
          text-white
          resize-none
          focus:border-blue-500
          outline-none
        "
        placeholder={`Enter graph edges...

Example:
A->B
A->C
B->D`}
      />

      <div className="flex gap-4 mt-6 flex-wrap">

        <button
          onClick={() => setText(sampleData)}
          className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700"
        >
          Load Sample Data
        </button>

        <button
          onClick={() => setText("")}
          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500"
        >
          Clear
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit"}
        </button>

      </div>

    </div>
  );
}

export default InputSection;