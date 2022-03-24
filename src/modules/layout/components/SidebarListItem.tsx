import { List, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  label: string;
  to: string;
  handleSelect(select: boolean, tag: string): void;
  tag: string;
}

const SidebarListItem = (props: Props) => {
  const { label, to, handleSelect, tag } = props;
  const location = useLocation();
  const isSelected = location.pathname === to;

  React.useEffect(() => {
    if (!isSelected) return;
    handleSelect(isSelected, tag);
  }, [handleSelect, isSelected, tag]);

  return (
    <List component="div" disablePadding>
      <Link to={to} style={{ textDecoration: 'none', color: isSelected ? '#b18aff' : 'white' }}>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemText primary={label} />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default SidebarListItem;
