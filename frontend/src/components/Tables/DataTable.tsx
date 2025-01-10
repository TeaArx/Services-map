import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import RowDetails from "./RowDetails";

interface UserForTable {
  id: string;
  name: string;
  address: string;
  description: string;
  troubleshoot: string;
  portainer: string;
  user_id: { username: string; first_name: string; last_name: string; patronymic: string; email: string; speciality: string }[];
}

interface DataTableProps {
  data: UserForTable[];
  order: "asc" | "desc";
  orderBy: keyof UserForTable;
  setOrder: (order: "asc" | "desc") => void;
  setOrderBy: (orderBy: keyof UserForTable) => void;
}

const styles = {
    cell: { 
    borderRight: "1px solid #E0E0E0",
      wordWrap: "break-word",   
      whiteSpace: "normal",     
    },
    tableContainer: { 
      maxHeight: 700, 
      overflowY: "auto" ,
    },
  };
  
  export default function DataTable({ data, order, orderBy, setOrder, setOrderBy }: DataTableProps) {
    const handleSort = (property: keyof UserForTable) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
  
    return (
      
      <TableContainer sx={styles.tableContainer} >
        <Table >
          <TableHead> 
            <TableRow>
              <TableCell sx={{ width: "5%", ...styles.cell, }} />
              <TableCell sx={{ ...styles.cell, width: "10%" }} align="center">
                Названия
              </TableCell>
              <TableCell sx={{ ...styles.cell, width: "15%"}} align="center">
                Адрес
              </TableCell>
              <TableCell sx={{ ...styles.cell, width: "25%" }} align="center">
                Описания
              </TableCell>
              <TableCell sx={{ ...styles.cell, width: "30%" }}  align="center">
                Частые проблемы
              </TableCell>
              <TableCell sx={{  width: "15%" }} align="center">
                Контейнеры сервисов
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => <RowDetails key={row.id} row={row} />)
            ) : (
                <TableRow >
                <TableCell colSpan={5} align="center">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  