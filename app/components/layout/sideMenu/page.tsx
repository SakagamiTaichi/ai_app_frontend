"use client";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
} from "@mui/material";
import List from "@mui/material/List";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import BarChartIcon from "@mui/icons-material/BarChart";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import { useState } from "react";

const menuItems = [
  { label: "レシピ作成", href: "/", icon: <AccessAlarmIcon /> },
  { label: "自動補完", href: "/graph", icon: <PendingActionsIcon /> },
  { label: "グラフ", href: "/graph", icon: <BarChartIcon /> },
];

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ margin: 2 }}
      >
        {" "}
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        {" "}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={MuiLink}
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideMenu;
