import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import useTagContext from "../../hooks/useTagContext";
import useCounterContext from "../../hooks/useCounterContext";
import Counter from "../../components/Counter/Counter";
import SCHome from "./Home.styled";
import reimagine from "../../utilities/reimagine";

export default function Home() {
  const [pages, setPages] = useState(0);
  const [currentCounters, setCurrentCounters] = useState([]);
  const { user } = useAuthContext();
  const { tags, dispatch: dispatch_tag_action } = useTagContext();
  const {
    itemsPerPage,
    dispatch: dispatch_counter_action,
    counters,
  } = useCounterContext();
  const { page } = useParams() || 1;
  const pageLinks = new Array(Math.ceil(pages / itemsPerPage)).fill(1);

  useEffect(() => {
    async function get_tags() {
      console.log("fetching tags");
      const response = await fetch("http://localhost:9999/api/counters/tags", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) dispatch_tag_action({ type: "SET_TAGS", payload: json });
    }

    if (user && !tags.length) get_tags();
  }, [user]);

  useEffect(() => {
    async function get_count() {
      const count = await fetch("http://localhost:9999/api/counters/count", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await count.json();

      setPages(json.count);
    }

    if (user) get_count();
  }, [user]);

  useEffect(() => {
    async function get_counters() {
      const lastIndex = page * itemsPerPage;
      const indices = [];

      for (let i = 0; i < itemsPerPage; i++) indices.unshift(lastIndex - i);

      const present = counters.filter((counter) =>
        indices.includes(counter.index)
      );

      if (present.length) {
        if (
          present.length === itemsPerPage ||
          Number(page) === Math.ceil(pages / itemsPerPage)
        ) {
          const reimagined = reimagine(present, "thumbnail");

          setCurrentCounters(reimagined);
        } else {
          let padLeft, padRight;

          console.log("mixed");

          if (present[present.length - 1].index === lastIndex) {
            padLeft = 0;
            padRight = present.length;
          } else {
            padLeft = present.length;
            padRight = present.length;
          }

          const response = await fetch(
            "http://localhost:9999/api/counters/get-page",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: itemsPerPage,
                page,
                padLeft,
                padRight,
              }),
              method: "POST",
            }
          );
          const json = await response.json();
          const { counters: countersRes } = json;
          const newCounters = countersRes.map((c, i) => ({
            ...c,
            index: indices[i + padLeft],
          }));
          const reimagined = reimagine(newCounters, "thumbnail");

          dispatch_counter_action({
            type: "ADD_COUNTERS",
            payload: newCounters,
          });

          if (padLeft) setCurrentCounters(present.concat(reimagined));
          else setCurrentCounters(reimagined.concat(present));
        }
      } else {
        const response = await fetch(
          "http://localhost:9999/api/counters/get-page",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: itemsPerPage,
              page,
              padLeft: 0,
              padRight: 0,
            }),
            method: "POST",
          }
        );
        const json = await response.json();
        const indexed = json.counters.map((c, i) => ({
          ...c,
          index: indices[i],
        }));
        const reimagined = reimagine(indexed, "thumbnail");

        dispatch_counter_action({
          type: "ADD_COUNTERS",
          payload: reimagined,
        });
        setCurrentCounters(reimagined);
      }
    }

    if (user) get_counters();

    return () =>
      currentCounters.forEach((counter) => URL.revokeObjectURL(counter.url));
  }, [user, page]);

  return (
    <SCHome>
      <div className="counters">
        {currentCounters.map((counter) => (
          <Counter
            key={counter._id}
            counter={(({ url, ...rest }) => rest)(counter)}
          />
        ))}
      </div>
      <div className="pages">
        {pageLinks.map((_, i) =>
          Number(page) === i + 1 ? (
            <p key={i}>{i + 1}</p>
          ) : (
            <Link key={i} to={`/home/${i + 1}`}>
              {i + 1}
            </Link>
          )
        )}
      </div>
    </SCHome>
  );
}
