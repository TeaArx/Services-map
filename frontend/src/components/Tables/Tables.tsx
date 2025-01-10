'use client';

import React, { useState, useMemo, useEffect } from "react";
import { Box, Paper, TablePagination } from "@mui/material";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";
import { hom } from "@/utils/api";

interface UserForTable {
  id: string;
  name: string;
  address: string;
  description: string;
  troubleshoot: string;
  portainer: string;
  user_id: { username: string; first_name: string; last_name:  string; patronymic: string; email: string; speciality: string }[];
}

interface TablesProps {
  data: UserForTable[];
}

export default function Tables() {
  const [search, setSearch] = useState("");
  const [selectedResponsible, setSelectedResponsible] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof UserForTable>("name");
  const [orderTP, setOrderTP] = useState<TablesProps>({ data: [] });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await hom(); 
            if (!response || !Array.isArray(response)) {
                throw new Error('Неверная структура данных');
            }
            setOrderTP({ data: response });
        } catch (err) {
            console.error(err);
            setError('Нет данных');
        }
    };

    fetchServices();
}, []);

const uniqueResponsibles = useMemo(() => {
  if (!orderTP.data || orderTP.data.length === 0) {
      return []; 
  }
  
  return Array.from(new Set(orderTP.data.flatMap(row => 
      row.user_id.map(user => `${user.last_name} ${user.first_name.charAt(0)}.${user.patronymic.charAt(0)}`)
  )));}, [orderTP.data]);


  const filteredData = useMemo(() => {
    if (!orderTP.data || orderTP.data.length === 0) {
        return []; 
    }

    return orderTP.data.filter((row) => {
        const matchesSearch = [row.name, row.address, row.description].some(text => 
            text.toLowerCase().includes(search.toLowerCase())
        ) || row.user_id.some(user => {
            const fullName = `${user.last_name} ${user.first_name.charAt(0)}.${user.patronymic.charAt(0)}`; 
            return fullName.toLowerCase().includes(search.toLowerCase()); 
        });

        const matchesResponsible = selectedResponsible 
            ? row.user_id.some(user => {
                const fullName = `${user.last_name} ${user.first_name.charAt(0)}.${user.patronymic.charAt(0)}`; 
                return fullName === selectedResponsible; 
            }) 
            : true;

        return matchesSearch && matchesResponsible;
    });}, [search, selectedResponsible, orderTP.data]);

  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => {
      const valueA = a[orderBy], valueB = b[orderBy];
      const numA = isNaN(Number(valueA)) ? valueA : Number(valueA);
      const numB = isNaN(Number(valueB)) ? valueB : Number(valueB);
      return (numA < numB ? -1 : numA > numB ? 1 : 0) * (order === "asc" ? 1 : -1);
    });
  }, [filteredData, order, orderBy]);

  const displayedData = useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return (
    <Paper elevation={16} className="mt-4">
      <SearchBar 
        search={search} 
        setSearch={setSearch} 
        uniqueResponsibles={uniqueResponsibles} 
        selectedResponsible={selectedResponsible} 
        setSelectedResponsible={setSelectedResponsible} 
      />
      <Paper > 
        <DataTable 
          data={displayedData} 
          order={order} 
          orderBy={orderBy} 
          setOrder={setOrder} 
          setOrderBy={setOrderBy} 
        />
        <TablePagination
          rowsPerPageOptions={[10, 15, 30]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Строк на странице"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
        />
      </Paper>
    </Paper>
  );
}
