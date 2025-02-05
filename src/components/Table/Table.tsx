import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { Icon } from "../Icon/Icon";
import { SearchBar } from "./components/SearchBar/SearchBar";
import "./table.css";
import { ModalHandlerProps } from "../../Pages/Dashboard/Dashboard";

interface TableProps {
  handleModal: ModalHandlerProps["handleModal"];
}
interface Post {
  id: number;
  title: string;
  body: string;
}

const Table: React.FC<TableProps> = ({ handleModal }) => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
  });

  const filteredPosts = data?.filter((post: Post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenu !== null) {
        const activeMenuRef = menuRefs.current[activeMenu];
        if (activeMenuRef && !activeMenuRef.contains(event.target as Node)) {
          setActiveMenu(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  const handleMenuClick = (postId: number) => {
    setActiveMenu(activeMenu === postId ? null : postId);
  };

  return (
    <>
      <SearchBar
        placeholder="Buscar post"
        value={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Cuerpo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts?.map((post: Post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td className="actions-cell">
                  <div ref={(el) => (menuRefs.current[post.id] = el)}>
                    <button
                      className="table-container-button"
                      onClick={() => handleMenuClick(post.id)}
                    >
                      <Icon icon={faEllipsis} size="1x" />
                    </button>
                    {activeMenu === post.id && (
                      <div className="actions-menu">
                        <button
                          onClick={() => {
                            handleModal("edit", post);
                            setActiveMenu(null);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="actions-menu--delete"
                          onClick={() => {
                            handleModal("delete", post);
                            setActiveMenu(null);
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
