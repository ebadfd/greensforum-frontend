import { useState } from "react";
import { Pagination } from "@mantine/core";

export default function ViewAllQuestions() {
  const [activePage, setPage] = useState(1);
  console.log(activePage);
  return <Pagination page={activePage} onChange={setPage} total={10} />;
}
