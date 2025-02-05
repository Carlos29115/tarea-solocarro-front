import { useQuery } from "@tanstack/react-query";
import "./table.css";
import { Icon } from "../Icon/Icon";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Table = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  const handleMenuClick = (postId: number) => {
    setActiveMenu(activeMenu === postId ? null : postId);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post: Post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td className="actions-cell">
                <button
                  className="table-container-button"
                  onClick={() => handleMenuClick(post.id)}
                >
                  <Icon icon={faEllipsis} size="1x" />
                </button>
                {activeMenu === post.id && (
                  <div className="actions-menu">
                    <button onClick={() => console.log("Editar", post.id)}>
                      Editar
                    </button>
                    <button onClick={() => console.log("Eliminar", post.id)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
