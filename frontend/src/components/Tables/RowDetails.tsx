import React, { useState } from "react";
import { TableCell, TableRow, IconButton, Collapse, Box, Typography, Table, TableBody, TableHead } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface RowDetailsProps {
  row: {
    name: string;
    address: string;
    description: string;
    troubleshoot: string;
    portainer: string;
    user_id: { username: string; first_name: string; last_name: string; patronymic: string; email: string; speciality: string }[];
  };
}

const styles = {
    cell: { borderRight: "1px solid #E0E0E0"},
    tableContainer: { maxHeight: 700, overflowY: "auto" },
  };
  

export default function RowDetails({ row }: RowDetailsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
        <TableRow >
        <TableCell sx={styles.cell}>
          <IconButton size="small" onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={styles.cell} align="center">{row.name}</TableCell>
        <TableCell sx={styles.cell} align="center">{row.address}</TableCell>
        <TableCell sx={styles.cell} align="center">{row.description}</TableCell>
        <TableCell sx={styles.cell} align="center" className="preformatted">{row.troubleshoot}</TableCell>
        <TableCell align="left" className="preformatted">{row.portainer}</TableCell>
      </TableRow>
      <TableRow >
        <TableCell colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6">Ответственные</Typography>
              <Table size="small">
                <TableHead >
                    <TableRow >
                    <TableCell sx={styles.cell} align="center">Фамилия</TableCell>
                    <TableCell sx={styles.cell} align="center">Имя</TableCell>
                    <TableCell sx={styles.cell} align="center">Отчество</TableCell>
                    <TableCell sx={styles.cell} align="center">Email</TableCell>
                    <TableCell align="center" >Специализация</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.user_id.map((user, index) => (
                    <TableRow key={index} >
                      <TableCell sx={styles.cell} align="center">{user.last_name}</TableCell>
                      <TableCell sx={styles.cell} align="center">{user.first_name}</TableCell>
                      <TableCell sx={styles.cell} align="center">{user.patronymic}</TableCell>
                      <TableCell sx={styles.cell} align="center">{user.email}</TableCell>
                      <TableCell align="center" >{user.speciality}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
