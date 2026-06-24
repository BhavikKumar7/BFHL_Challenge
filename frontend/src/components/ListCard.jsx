function ListCard({ title, data }) {

  return (
    <div className="bg-zinc-900 p-6 rounded-3xl">

      <h2 className="text-xl mb-4">
        {title}
      </h2>

      {
        data.length===0 ?
          <p className="text-zinc-500">
            None
          </p>
        :
          data.map((item,index)=>(
            <div
              key={index}
              className="bg-black p-3 rounded-xl mb-2"
            >
              {item}
            </div>
          ))
      }

    </div>
  );
}

export default ListCard;