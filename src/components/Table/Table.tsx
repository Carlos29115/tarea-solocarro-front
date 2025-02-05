import { useQuery } from "@tanstack/react-query";
import "./table.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Table = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post: Post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>options</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
