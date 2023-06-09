import React, { useEffect, useState } from "react";
import { getSession } from "../helpers/supabase";
import SignIn from "../components/SignIn";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Todos from "../components/Todos";

const IndexPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await getSession();
      if (data) {
        setSession(data.session);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="bg-slate-900 h-screen">
      {loading ? (
        <div className="flex justify-center items-center px-24 py-20 h-full">
          <Loading />
        </div>
      ) : !session ? (
        <SignIn />
      ) : (
        <Layout>
          <Todos className="px-6 py-10 md:px-0 max-w-5xl mx-auto" />
        </Layout>
      )}
    </div>
  );
};

export default IndexPage;
