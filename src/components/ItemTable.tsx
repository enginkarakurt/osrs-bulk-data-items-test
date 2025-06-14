import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export interface Item {
  id: number;
  name: string;
  icon: string;
}

function ItemTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  let itemsArray: Item[];

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem("bulkData") || "{}");
    itemsArray = Object.values(json as Record<number, Item>);
    setItems(itemsArray);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedItems = items.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Item name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map((item, index) => {
            const regEx = new RegExp(" ", "g");
            const regEx2 = new RegExp("&amp;", "g");

            const iconUrl = item.icon
              ? `https://oldschool.runescape.wiki/images/${item.icon
                  .replace(regEx, "_")
                  .replace(regEx2, "&")}`
              : undefined;
            return (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="size-6"
                    loading="lazy"
                    src={iconUrl}
                    alt={item.name}
                  />
                </TableCell>
                <TableCell className="text-start">{item.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <p>
        Page {page} / {totalPages}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer select-none"
              onClick={(e) => {
                e.preventDefault();
                goToPreviousPage();
              }}
              isActive={page !== 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer select-none"
              onClick={(e) => {
                e.preventDefault();
                goToNextPage();
              }}
              isActive={page !== totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default ItemTable;
