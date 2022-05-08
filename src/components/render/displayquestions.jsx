import { ScrollArea } from "@mantine/core";

import ForumCard from "../ForumCard/card";
import LoadingPost from "../ForumCard/loading";

export default function DisplayQuestions({ questions, loading, notfound }) {
  return (
    <>
      <ScrollArea style={{ height: 750 }}>
        {loading ? (
          <>
            {[...Array(10)].map(() => (
              <LoadingPost />
            ))}
          </>
        ) : (
          <>
            {questions.length > 0 ? (
              <>
                {questions.map((q) => {
                  return <ForumCard props={q} />;
                })}
              </>
            ) : (
              <p>{notfound}</p>
            )}
          </>
        )}
      </ScrollArea>
    </>
  );
}
