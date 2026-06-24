import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import InputSection from "../components/InputSection";
import SummaryCards from "../components/SummaryCards";
import HierarchyCard from "../components/HierarchyCard";
import ListCard from "../components/ListCard";
import ProfileCard from "../components/ProfileCard";

function Home() {

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (arr) => {
    try {
      setLoading(true);
      const response = await api.post("/bfhl", {
        data: arr
      });
      setResponse(response.data);
    } catch (error) {
      alert("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <InputSection
          onSubmit={handleSubmit}
          loading={loading}
        />

        {
          response &&
          <>
            <ProfileCard response={response} />
            <SummaryCards summary={response.summary} />

            <div className="grid lg:grid-cols-2 gap-6">

              {
                response.hierarchies.map((item, index) => (
                  <HierarchyCard
                    key={index}
                    hierarchy={item}
                  />
                ))
              }
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ListCard
                title="Invalid Entries"
                data={response.invalid_entries}
              />

              <ListCard
                title="Duplicate Edges"
                data={response.duplicate_edges}
              />
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default Home;