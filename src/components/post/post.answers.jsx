import { Text, Anchor, ScrollArea } from "@mantine/core";
import { CommentCard } from "../Comment/comment";
import { Link } from "react-router-dom";

export default function PostAnswers({ question }) {
  <ScrollArea style={{ height: 500 }} mt="lg" scrollbarSize={6}>
    {question.answers ? (
      <>
        {question.answer_count > 0 ? (
          <>
            {question.answers.map((item) => {
              return <CommentCard props={item} />;
            })}
          </>
        ) : (
          <Text>
            {" "}
            Browse other{" "}
            <Anchor component={Link} to="/questions/all">
              {" "}
              questions{" "}
            </Anchor>{" "}
            , or Ask your own{" "}
            <Anchor component={Link} to="/create">
              question{" "}
            </Anchor>
          </Text>
        )}
      </>
    ) : (
      <Text>
        {" "}
        Browse other{" "}
        <Anchor component={Link} to="/questions/all">
          {" "}
          questions{" "}
        </Anchor>{" "}
        , or Ask your own{" "}
        <Anchor component={Link} to="/create">
          question{" "}
        </Anchor>
      </Text>
    )}
  </ScrollArea>;
}
