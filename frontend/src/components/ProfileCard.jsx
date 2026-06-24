function ProfileCard({ response }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 shadow-xl">

      <h2 className="text-2xl font-bold text-white mb-6">
        Candidate Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-black border border-zinc-800 rounded-2xl p-5 hover:border-blue-500 transition-all">
          <p className="text-sm text-zinc-400 mb-2">
            User ID
          </p>

          <p className="text-white font-semibold break-words">
            {response.user_id}
          </p>
        </div>

        <div className="bg-black border border-zinc-800 rounded-2xl p-5 hover:border-blue-500 transition-all">
          <p className="text-sm text-zinc-400 mb-2">
            College Email
          </p>

          <p className="text-white font-semibold break-words">
            {response.email_id}
          </p>
        </div>

        <div className="bg-black border border-zinc-800 rounded-2xl p-5 hover:border-blue-500 transition-all">
          <p className="text-sm text-zinc-400 mb-2">
            College Roll Number
          </p>

          <p className="text-white font-semibold break-words">
            {response.college_roll_number}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ProfileCard;