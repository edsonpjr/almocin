import {
  AppBar, Divider, Drawer,
  IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Toolbar
} from "@mui/material";
import { BaseLayoutProps } from "../../types/components-props";
import { useCallback, useState } from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";

import styles from "./index.module.css";

const BaseLayout = ({ children, titlePage }: BaseLayoutProps) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <>
      <AppBar
        position="absolute"
        sx={{flexDirection: 'row', padding: '.5rem 1rem', alignItems: 'center'}}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <h1>{titlePage}</h1>
      </AppBar>
      <Drawer open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <h1>Menu</h1>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Boas vindas" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Cardápio" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Histórico" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuário" />
          </ListItemButton>
        </List>
      </Drawer>
      <main className={styles.container}>
        {children}
      </main>
    </>
  );
};

export default BaseLayout;